"use client";

import { useState, useEffect } from "react";
import { Banknote, BriefcaseBusiness, CircleUserRound, Home, KeyRound, Sofa, UsersRound, Moon, Sun } from "lucide-react";
import SidebarItem from "./sidebar-item";

function Sidebar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <aside className="w-72 bg-card p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold my-4 text-primary dark:text-white text-center">
          WorkHive
        </h1>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          {theme === "light" ? <Moon className="text-gray-800" /> : <Sun className="text-white" />}
        </button>
      </div>
      <nav className="flex flex-col gap-2 mt-10 ">
        <SidebarItem icon={Home} label="Trang chủ" href="/" />
        <SidebarItem icon={UsersRound} label="Khách hàng" href="/customers" />
        <SidebarItem icon={BriefcaseBusiness} label="Doanh nghiệp" href="/owners" />
        <SidebarItem icon={Sofa} label="Không gian" href="/workspaces" />
        <SidebarItem icon={CircleUserRound} label="Nhân viên" href="/employees" />
        <SidebarItem icon={KeyRound} label="Xác thực doanh nghiệp" href="/verify-owner" />
        <SidebarItem icon={Banknote} label="Yêu cầu rút tiền" href="/withdrawal-request" />
      </nav>
    </aside>
  );
}

export default Sidebar;
