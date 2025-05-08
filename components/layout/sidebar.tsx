"use client";

import { useState, useEffect } from "react";
import {
  Banknote,
  BriefcaseBusiness,
  CircleUserRound,
  Home,
  KeyRound,
  Sofa,
  UsersRound,
  Moon,
  Sun,
  LayoutList,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { login } from "@/stores/slices/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const token =
    typeof window !== "undefined" ? Cookies.get("admin_token") : null;
  const [role, setRole] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (!token) return;
    const fetchAdmin = async () => {
      setIsLoading(true);
      try {
        const decodeResponse = await fetch(`${BASE_URL}/users/decodejwttoken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: token,
          }),
        });

        if (!decodeResponse.ok) {
          throw new Error("Đăng nhập thất bại! Vui lòng kiểm tra lại.");
        }

        const decoded = await decodeResponse.json();

        if (
          decoded.claims.RoleId !== "1" &&
          decoded.claims.RoleId !== "2" &&
          decoded.claims.RoleId !== "3"
        ) {
          throw new Error("Không có quyền truy cập!");
        }

        const adminData = {
          id: decoded.claims.sub,
          email: decoded.claims.email,
          phone: decoded.claims.Phone,
          name: decoded.claims.name,
          avatar: decoded.avatarUrl,
          role: decoded.claims.RoleId,
        };

        setRole(Number(decoded.claims.RoleId));

        dispatch(login(adminData));
        Cookies.set("admin_token", token);
        setIsLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setIsLoading(false);
        return;
      }
    };

    fetchAdmin();
  }, [dispatch, token]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) return null;

  if (isLoading) return null;

  return (
    <motion.aside
      initial={{ width: "276px" }}
      animate={{ width: isCollapsed ? "84px" : "276px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card dark:bg-black p-4 rounded-md h-fit flex flex-col"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-2 flex justify-center items-center w-full p-4 rounded-md bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-300 dark:hover:text-white transition"
      >
        <LayoutList className="w-5 h-5" />
      </motion.button>
      <div
        className={`flex justify-between items-center ${
          isCollapsed ? "mb-2" : "mt-4 mb-8"
        }`}
      >
        <motion.h1
          initial={{ opacity: 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className={`text-2xl font-extrabold text-primary dark:text-primary text-center ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          WorkHive
        </motion.h1>
        <button
          onClick={toggleTheme}
          className="p-4 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
          aria-label={
            theme === "light"
              ? "Chuyển sang chế độ tối"
              : "Chuyển sang chế độ sáng"
          }
          title={
            theme === "light"
              ? "Chuyển sang chế độ tối"
              : "Chuyển sang chế độ sáng"
          }
          aria-live="polite"
        >
          <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
            <Sun
              className={`absolute text-amber-500 transition-all duration-300 ${
                theme === "light"
                  ? "opacity-100 transform-none"
                  : "opacity-0 rotate-90 scale-0"
              }`}
            />
            <Moon
              className={`absolute text-indigo-400 transition-all duration-300 ${
                theme === "dark"
                  ? "opacity-100 transform-none"
                  : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </div>
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        {role === 1 && (
          <SidebarItem
            icon={Home}
            label="Trang chủ"
            href="/dashboard"
            collapsed={isCollapsed}
          />
        )}
        {(role === 1 || role === 2 || role === 3) && (
          <SidebarItem
            icon={UsersRound}
            label="Khách hàng"
            href="/customers"
            collapsed={isCollapsed}
          />
        )}
        {(role === 1 || role === 2 || role === 3) && (
          <SidebarItem
            icon={BriefcaseBusiness}
            label="Doanh nghiệp"
            href="/owners"
            collapsed={isCollapsed}
          />
        )}
        {(role === 1 || role === 2 || role === 3) && (
          <SidebarItem
            icon={Sofa}
            label="Không gian"
            href="/workspaces"
            collapsed={isCollapsed}
          />
        )}
        {role === 1 && (
          <SidebarItem
            icon={CircleUserRound}
            label="Nhân viên"
            href="/employees"
            collapsed={isCollapsed}
          />
        )}
        {(role === 1 || role === 3) && (
          <SidebarItem
            icon={KeyRound}
            label="Xác thực doanh nghiệp"
            href="/verify-owner"
            collapsed={isCollapsed}
          />
        )}
        {(role === 1 || role === 2) && (
          <SidebarItem
            icon={Banknote}
            label="Yêu cầu rút tiền"
            href="/withdrawal-request"
            collapsed={isCollapsed}
          >
            <Link
              href="/withdrawal-request/customers"
              className={`text-sm px-4 py-2 rounded-md ${
                pathname?.includes("/withdrawal-request/customers")
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Khách hàng
            </Link>
            <Link
              href="/withdrawal-request/owners"
              className={`text-sm px-4 py-2 rounded-md ${
                pathname?.includes("/withdrawal-request/owners")
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Doanh nghiệp
            </Link>
          </SidebarItem>
        )}
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
