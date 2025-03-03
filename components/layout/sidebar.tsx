"use client";

import { BriefcaseBusiness, Home, UsersRound } from "lucide-react";
import SidebarItem from "./sidebar-item";

function Sidebar() {
  return (
    <aside className="w-72 bg-white p-4 rounded-xl">
      <h1 className="text-2xl font-extrabold my-4 text-primary text-center">
        WorkHive
      </h1>
      <nav className="flex flex-col gap-2 mt-10">
        <SidebarItem icon={Home} label="Trang chủ" href="/" />
        <SidebarItem
          icon={UsersRound}
          label="Quản lý khách hàng"
          href="/customers"
        />
        <SidebarItem
          icon={BriefcaseBusiness}
          label="Quản lý doanh nghiệp"
          href="/owners"
        />
      </nav>
    </aside>
  );
}

export default Sidebar;
