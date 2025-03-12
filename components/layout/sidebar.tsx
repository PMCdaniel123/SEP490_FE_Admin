"use client";

import { Banknote, BriefcaseBusiness, CircleUserRound, Home, KeyRound, Sofa, UsersRound } from "lucide-react";
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
          label="Khách hàng"
          href="/customers"
        />
        <SidebarItem
          icon={BriefcaseBusiness}
          label="Doanh nghiệp"
          href="/owners"
        />
        <SidebarItem
          icon={Sofa}
          label="Không gian"
          href="/workspaces"
        />
        <SidebarItem
          icon={CircleUserRound}
          label="Nhân viên"
          href="/employees"
        />
        <SidebarItem
          icon={KeyRound}
          label="Xác thực doanh nghiệp"
          href="/verify-owner"
        />
        <SidebarItem
          icon={Banknote}
          label="Yêu cầu rút tiền"
          href="/withdrawal-request"
        />
      </nav>
    </aside>
  );
}

export default Sidebar;
