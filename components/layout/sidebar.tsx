"use client";

import { useState, useEffect } from "react";
import { Banknote, BriefcaseBusiness, CircleUserRound, Home, KeyRound, Sofa, UsersRound, Moon, Sun } from "lucide-react";
import SidebarItem from "./sidebar-item";

function Sidebar() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

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
    <aside className="w-72 bg-card p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold my-4 text-primary dark:text-white text-center">
          WorkHive
        </h1>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          aria-label={theme === "light" ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
          title={theme === "light" ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
          aria-live="polite"
        >
          <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
            <Sun className={`absolute text-amber-500 transition-all duration-300 ${theme === 'light' ? 'opacity-100 transform-none' : 'opacity-0 rotate-90 scale-0'}`} />
            <Moon className={`absolute text-indigo-400 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 transform-none' : 'opacity-0 -rotate-90 scale-0'}`} />
          </div>
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
