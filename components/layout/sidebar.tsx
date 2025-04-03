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

function Sidebar() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  return (
    <motion.aside
      initial={{ width: "288px" }}
      animate={{ width: isCollapsed ? "84px" : "288px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white p-4 rounded-xl min-h-screen flex flex-col"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-2 flex justify-center items-center w-full p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        <LayoutList className="w-5 h-5" />
      </motion.button>
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className={`text-2xl font-extrabold mt-4 mb-8 text-primary dark:text-white text-center ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          WorkHive
        </motion.h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
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
          <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
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
      <nav className="flex flex-col gap-2 mt-10 ">
        <SidebarItem
          icon={Home}
          label="Trang chủ"
          href="/dashboard"
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={UsersRound}
          label="Khách hàng"
          href="/customers"
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={BriefcaseBusiness}
          label="Doanh nghiệp"
          href="/owners"
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={Sofa}
          label="Không gian"
          href="/workspaces"
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={CircleUserRound}
          label="Nhân viên"
          href="/employees"
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={KeyRound}
          label="Xác thực doanh nghiệp"
          href="/verify-owner"
          collapsed={isCollapsed}
        />
        <SidebarItem
          icon={Banknote}
          label="Yêu cầu rút tiền"
          href="/withdrawal-request"
          collapsed={isCollapsed}
        />
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
