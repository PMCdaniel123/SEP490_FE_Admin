"use client";

import DashboardLineChart from "@/components/charts/line-chart";
import HotItemsPieChart from "@/components/charts/hot-items-pie-chart";
import NewCustomers from "@/components/new-customers-table/new-customers";
import TopWorkspaceTable from "@/components/table/top-workspace-table";
import { topWorkspace } from "@/constants/constant";
import { topWorkspaceTableColumns } from "@/constants/table-columns";
import {
  Boxes,
  PiggyBank,
  Sofa,
  TrendingUp,
  UsersRound,
  UtensilsCrossed,
  Moon,
  Sun,
} from "lucide-react";
import CustomerAnalysisChart from "@/components/charts/customer-analysis-chart";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function OwnerPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const date = new Date();
  const dateString = `T${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex justify-end mb-2">
        {mounted && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-2 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-4 p-4">
          <div className="col-span-1 flex items-center justify-center bg-[#27D095] rounded-xl text-white">
            <PiggyBank size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-start justify-start gap-2">
            <p className="font-bold dark:text-white">Doanh thu</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">$214,00</p>
            <div className="flex gap-1 items-center justify-start text-[#FF8E29] text-sm">
              <TrendingUp /> <span>+55% tháng trước</span>
            </div>
          </div>
          <div className="col-span-1 text-sm flex items-center justify-center text-[#6F757E] dark:text-gray-300 font-bold">
            <p>{dateString}</p>
          </div>
        </div>

        <div className="col-span-2 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-4 p-4">
          <div className="col-span-1 flex items-center justify-center bg-[#67CADF] rounded-xl text-white">
            <UsersRound size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-start justify-start gap-2">
            <p className="font-bold dark:text-white">Khách hàng</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">3.200</p>
            <div className="flex gap-1 items-center justify-start text-[#FF8E29] text-sm">
              <TrendingUp /> <span>+12% tháng trước</span>
            </div>
          </div>
          <div className="col-span-1 text-sm flex items-center justify-center text-[#6F757E] dark:text-gray-300 font-bold">
            <p>{dateString}</p>
          </div>
        </div>

        <div className="col-span-4 grid gap-4 md:grid-cols-3">
          <div className="col-span-1 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#F54F5F] rounded-xl text-white">
              <Sofa size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold dark:text-white">Số lượng không gian</p>
              <p className="text-[#6F757E] dark:text-gray-300 text-xl">3</p>
            </div>
          </div>
          <div className="col-span-1 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#fcba03] rounded-xl text-white">
              <Boxes size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold dark:text-white">Số lượng tiện ích</p>
              <p className="text-[#6F757E] dark:text-gray-300 text-xl">4</p>
            </div>
          </div>
          <div className="col-span-1 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#FF8E29] rounded-xl text-white">
              <UtensilsCrossed size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold dark:text-white">Số lượng món</p>
              <p className="text-[#6F757E] dark:text-gray-300 text-xl">5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 bg-card dark:bg-gray-800 rounded-xl">
          <DashboardLineChart />
        </div>
        <div className="col-span-1 bg-card dark:bg-gray-800 rounded-xl">
          <CustomerAnalysisChart />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 bg-card  dark:text-gray-300 p-4 rounded-xl">
          <TopWorkspaceTable
            columns={topWorkspaceTableColumns}
            data={topWorkspace}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <NewCustomers />
          <HotItemsPieChart />
        </div>
      </div>
    </div>
  );
}
