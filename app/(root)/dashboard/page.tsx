"use client";

import {
  BriefcaseBusiness,
  CircleUserRound,
  Sofa,
  UsersRound,
} from "lucide-react";
import CustomerAnalysisChart from "@/components/charts/customer-analysis-chart";
import OwnerRevenueChart from "@/components/charts/owner-revenue-chart";
import {
  CustomerProps,
  EmployeeProps,
  HighRatingWorkspace,
  OwnerProps,
  OwnerRevenue,
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
  fetchWorkspaceList,
} from "@/features";
import OwnerAnalysisChart from "@/components/charts/owner-analysis-chart";
import HighRateWorkspaceTable from "@/components/table/high-rate-workspace-table";
import { HighRateWorkspaceTableColumns } from "@/constants/table-columns";

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
  const { admin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!admin) return;
    fetchCustomerList(setCustomerList, setLoading);
    fetchWorkspaceList(setWorkspaceList, setLoading);
    fetchEmployeeList(setEmployeeList, setLoading);
    fetchOwnerList(setOwnerList, setLoading);
    fetchOwnerRevenueList(setOwnerRevenueList, setLoading);
    fetchHighRatingWorkspaceList(setHighRatingWorkspaceList, setLoading);
    setLoading(false);
  }, [admin]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-1 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-24">
          <div className="col-span-1 flex items-center justify-center bg-[#67CADF] rounded-xl text-white">
            <UsersRound size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">Khách hàng</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {customerList.length ?? "0"}
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-24">
          <div className="col-span-1 flex items-center justify-center bg-[#27D095] rounded-xl text-white">
            <Sofa size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">Không gian</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {workspaceList.length ?? "0"}
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-24">
          <div className="col-span-1 flex items-center justify-center bg-[#FCBA03] rounded-xl text-white">
            <BriefcaseBusiness size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <p className="font-bold dark:text-white">Doanh nghiệp</p>
            <p className="text-[#6F757E] dark:text-gray-300 text-xl">
              {ownerList.length ?? "0"}
            </p>
          </div>
        </div>
        <div className="col-span-1 rounded-xl bg-card dark:bg-gray-800 grid gap-4 md:grid-cols-3 p-4 md:min-h-24">
          <div className="col-span-1 flex items-center justify-center bg-[#F54F5F] rounded-xl text-white">
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
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 bg-card dark:bg-gray-800 rounded-xl h-full p-4">
          <OwnerRevenueChart data={ownerRevenueList} />
        </div>
        <div className="col-span-1 bg-card dark:bg-gray-800 rounded-xl">
          <CustomerAnalysisChart customerList={customerList} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 bg-card dark:bg-gray-800 rounded-xl h-full p-4">
          <HighRateWorkspaceTable
            columns={HighRateWorkspaceTableColumns}
            data={highRatingWorkspaceList}
          />
        </div>
        <div className="col-span-1 bg-card dark:bg-gray-800 rounded-xl h-fit">
          <OwnerAnalysisChart ownerList={ownerList} />
        </div>
      </div>
    </div>
  );
}
