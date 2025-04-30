"use client";

import {
  BriefcaseBusiness,
  CircleUserRound,
  PiggyBank,
  Sofa,
  UsersRound,
} from "lucide-react";
import CustomerAnalysisChart from "@/components/charts/customer-analysis-chart";
import OwnerRevenueChart from "@/components/charts/owner-revenue-chart";
import {
  CustomerProps,
  EmployeeProps,
  formatCurrency,
  HighRatingWorkspace,
  OwnerProps,
  OwnerRevenue,
  SystemRevenueProps,
  Workspace,
} from "@/types";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import {
  fetchCustomerList,
  fetchEmployeeList,
  fetchHighRatingWorkspaceList,
  fetchOwnerList,
  fetchOwnerRevenueList,
  fetchSystemRevenueList,
  fetchWorkspaceList,
} from "@/features";
import OwnerAnalysisChart from "@/components/charts/owner-analysis-chart";
import HighRateWorkspaceTable from "@/components/table/high-rate-workspace-table";
import {
  HighRateWorkspaceTableColumns,
  SystemRevenueTableColumns,
} from "@/constants/table-columns";
import SystemRevenueTable from "@/components/table/system-revenue-table";
import dayjs from "dayjs";
import DailyRevenueChart from "@/components/charts/daily-revenue-chart";
import MonthlyRevenueChart from "@/components/charts/monthly-revenue-chart";

export default function OwnerPage() {
  const [loading, setLoading] = useState(true);
  const [customerList, setCustomerList] = useState<CustomerProps[]>([]);
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>([]);
  const [employeeList, setEmployeeList] = useState<EmployeeProps[]>([]);
  const [ownerList, setOwnerList] = useState<OwnerProps[]>([]);
  const [ownerRevenueList, setOwnerRevenueList] = useState<OwnerRevenue[]>([]);
  const [highRatingWorkspaceList, setHighRatingWorkspaceList] = useState<
    HighRatingWorkspace[]
  >([]);
  const [systemRevenueList, setSystemRevenueList] = useState<
    SystemRevenueProps[]
  >([]);
  const { admin } = useSelector((state: RootState) => state.auth);
  const now = new Date();
  const monthString = `Tháng ${now.getMonth() + 1}/${now.getFullYear()}`;
  const today = dayjs(now).format("YYYY-MM-DD");
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // useEffect(() => {
  //   if (!admin) return;
  //   fetchCustomerList(setCustomerList, setLoading);
  //   fetchWorkspaceList(setWorkspaceList, setLoading);
  //   fetchEmployeeList(setEmployeeList, setLoading);
  //   fetchOwnerList(setOwnerList, setLoading);
  //   fetchOwnerRevenueList(setOwnerRevenueList, setLoading);
  //   fetchHighRatingWorkspaceList(setHighRatingWorkspaceList, setLoading);
  //   fetchSystemRevenueList(setSystemRevenueList, setLoading, admin?.id);
  //   setLoading(false);
  // }, [admin]);

  useEffect(() => {
    if (!admin) return;

    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCustomerList(setCustomerList),
        fetchWorkspaceList(setWorkspaceList),
        fetchEmployeeList(setEmployeeList),
        fetchOwnerList(setOwnerList),
        fetchOwnerRevenueList(setOwnerRevenueList),
        fetchHighRatingWorkspaceList(setHighRatingWorkspaceList),
        fetchSystemRevenueList(setSystemRevenueList, admin?.id),
      ]);
      setLoading(false);
    };

    loadData();
  }, [admin]);

  let todayRevenue = 0;
  let thisMonthRevenue = 0;
  let totalRevenue = 0;

  systemRevenueList.forEach((booking) => {
    if (booking.status !== "Success") return;

    const bookingDate = new Date(booking.dateOfBooking);
    const bookingDay = bookingDate.toISOString().split("T")[0];

    // Total revenue
    totalRevenue += booking.price;

    // Today's revenue
    if (bookingDay === today) {
      todayRevenue += booking.price;
    }

    // This month's revenue
    if (
      bookingDate.getMonth() === thisMonth &&
      bookingDate.getFullYear() === thisYear
    ) {
      thisMonthRevenue += booking.price;
    }
  });

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-1 rounded-md bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-32">
          <div className="col-span-1 flex items-center justify-center flex-col bg-yellow-300 rounded-md text-white">
            <PiggyBank size={42} />
            <p className="text-sm font-medium">Doanh thu</p>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">
              Ngày {dayjs(today).format("DD/MM/YYYY")}
            </p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {todayRevenue ? formatCurrency((todayRevenue * 10) / 100) : "0"}
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-md bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-32">
          <div className="col-span-1 flex items-center justify-center flex-col bg-purple-300 rounded-md text-white">
            <PiggyBank size={42} />
            <p className="text-sm font-medium">Doanh thu</p>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">{monthString}</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {thisMonthRevenue
                ? formatCurrency((thisMonthRevenue * 10) / 100)
                : "0"}
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-md bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-32">
          <div className="col-span-1 flex items-center justify-center flex-col bg-pink-300 rounded-md text-white">
            <PiggyBank size={42} />
            <p className="text-sm font-medium">Doanh thu</p>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">Tổng cộng</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {totalRevenue ? formatCurrency((totalRevenue * 10) / 100) : "0"}
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-1 rounded-md bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-24">
          <div className="col-span-1 flex items-center justify-center bg-[#67CADF] rounded-md text-white">
            <UsersRound size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">Khách hàng</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {customerList.length ?? "0"}
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-md bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-24">
          <div className="col-span-1 flex items-center justify-center bg-[#27D095] rounded-md text-white">
            <Sofa size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">Không gian</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {workspaceList.length ?? "0"}
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-md bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-24">
          <div className="col-span-1 flex items-center justify-center bg-[#FCBA03] rounded-md text-white">
            <BriefcaseBusiness size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">Doanh nghiệp</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {ownerList.length ?? "0"}
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-md bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-24">
          <div className="col-span-1 flex items-center justify-center bg-[#F54F5F] rounded-md text-white">
            <CircleUserRound size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">Nhân viên</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {employeeList.length ?? "0"}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-3 bg-card dark:bg-gray-800 rounded-md p-4">
        <SystemRevenueTable
          columns={SystemRevenueTableColumns}
          data={systemRevenueList}
        />
      </div>
      <div className="col-span-3 bg-card dark:bg-gray-800 rounded-md p-4">
        <DailyRevenueChart bookings={systemRevenueList} />
      </div>
      <div className="col-span-3 bg-card dark:bg-gray-800 rounded-md p-4">
        <MonthlyRevenueChart bookings={systemRevenueList} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 bg-card dark:bg-gray-800 rounded-md h-full p-4">
          <OwnerRevenueChart data={ownerRevenueList} />
        </div>
        <div className="col-span-1 bg-card dark:bg-gray-800 rounded-md">
          <CustomerAnalysisChart customerList={customerList} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 bg-card dark:bg-gray-800 rounded-md h-full p-4">
          <HighRateWorkspaceTable
            columns={HighRateWorkspaceTableColumns}
            data={highRatingWorkspaceList}
          />
        </div>
        <div className="col-span-1 bg-card dark:bg-gray-800 rounded-md h-fit">
          <OwnerAnalysisChart ownerList={ownerList} />
        </div>
      </div>
    </div>
  );
}
