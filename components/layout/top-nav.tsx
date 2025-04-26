"use client";

import { ChevronsUpDown, LockKeyhole, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constants/environments";
import { login, logout } from "@/stores/slices/authSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import { Modal } from "antd";
import ChangePasswordModal from "../modal/change-password-modal";
import Cookies from "js-cookie";

function TopNav() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { admin } = useSelector((state: RootState) => state.auth);
  const token =
    typeof window !== "undefined" ? Cookies.get("admin_token") : null;
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (token !== null && token !== undefined && token !== "") {
      const getCustomerData = async () => {
        try {
          const decodeResponse = await fetch(
            `${BASE_URL}/users/decodejwttoken`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                token: token,
              }),
            }
          );

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
          dispatch(login(adminData));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Đã xảy ra lỗi!";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            theme: "light",
          });
          Cookies.remove("admin_token");
          router.push("/");
          return;
        }
      };
      getCustomerData();
    }
  }, [dispatch, token, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogOut = () => {
    setOpen(false);
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-end w-full mb-4 gap-4">
          <div ref={dropdownRef} className="relative">
            <div
              className="group flex items-center justify-center bg-card rounded-md py-2 px-4 gap-4 hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white cursor-pointer transition-colors duration-200"
              onClick={() => setOpen(!open)}
            >
              <Image
                src={admin?.avatar || "/logo.png"}
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full border dark:border-gray-700 group-hover:bg-white dark:group-hover:bg-gray-900"
              />
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm font-semibold">{admin?.name}</p>
                <p className="text-sm">{admin?.email}</p>
              </div>
              <ChevronsUpDown
                size={20}
                className="text-black dark:text-white group-hover:text-white"
              />
            </div>
            {open && (
              <ul className="absolute top-full right-0 z-10 mt-2 w-auto gap-3 rounded-md bg-card dark:bg-gray-900 shadow-xl pb-2 border dark:border-gray-700">
                <div className="flex items-center justify-start py-2 px-4 gap-4 bg-primary rounded-t-md min-w-[250px]">
                  <Image
                    src={admin?.avatar || "/logo.png"}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full border bg-white"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <p className="text-sm font-semibold text-white">
                      {admin?.name}
                    </p>
                    <p className="text-sm font-medium text-white">
                      {admin?.email}
                    </p>
                  </div>
                </div>
                <Separator className="mb-2 dark:border-gray-700" />
                <Link
                  href="/profile"
                  className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white py-2 transition-colors duration-200 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <Settings size={16} /> <span>Sửa thông tin</span>
                </Link>
                <li
                  className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white py-2 transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    setChangePassword(true);
                  }}
                >
                  <LockKeyhole size={16} /> <span>Đổi mật khẩu</span>
                </li>
                <Separator className="my-2" />
                <li
                  className="px-4 flex items-center gap-2 text-red-500 hover:bg-red-500 hover:text-white py-2 transition-colors duration-200 cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut size={16} /> <span>Đăng xuất</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={
          <p className="text-xl font-bold text-primary">Thay đổi mật khẩu</p>
        }
        open={changePassword}
        onCancel={() => setChangePassword(!changePassword)}
        footer={null}
      >
        <ChangePasswordModal
          setChangePassword={setChangePassword}
          changePassword={changePassword}
        />
      </Modal>
    </>
  );
}

export default TopNav;
