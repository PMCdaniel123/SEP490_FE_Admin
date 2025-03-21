"use client";

import { ChevronsUpDown, LockKeyhole, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import AdminNotification from "../notification/notification";

function TopNav() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-end w-full mb-4 gap-4">
        <AdminNotification />
        <div ref={dropdownRef} className="relative">
          <div
            className="group flex items-center justify-center bg-card rounded-xl py-2 px-4 gap-4 hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white cursor-pointer transition-colors duration-200"
            onClick={() => setOpen(!open)}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full border dark:border-gray-700 group-hover:bg-white dark:group-hover:bg-gray-900"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm font-semibold text-black dark:text-white">
                WorkHive Administator
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                administrator@gmail.com
              </p>
            </div>
            <ChevronsUpDown size={20} className="text-black dark:text-white" />
          </div>
          {open && (
            <ul className="absolute top-full right-0 z-10 mt-2 w-auto gap-3 rounded-xl bg-card dark:bg-gray-900 shadow-xl pb-4 border dark:border-gray-700">
              <div className="flex items-center justify-center py-2 px-4 gap-4">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full border dark:border-gray-700"
                />
                <div className="flex flex-col justify-center items-start">
                  <p className="text-sm font-semibold text-black dark:text-white">
                    WorkHive Administator
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    administrator@gmail.com
                  </p>
                </div>
              </div>
              <Separator className="my-2 dark:border-gray-700" />
              <li className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white py-1 transition-colors duration-200 cursor-pointer">
                <Settings size={16} /> <span>Sửa thông tin</span>
              </li>
              <li className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white py-1 transition-colors duration-200 cursor-pointer">
                <LockKeyhole size={16} /> <span>Đổi mật khẩu</span>
              </li>
              <li className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white py-1 transition-colors duration-200 cursor-pointer">
                <LogOut size={16} /> <span>Đăng xuất</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNav;