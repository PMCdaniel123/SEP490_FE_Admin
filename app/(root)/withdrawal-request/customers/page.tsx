"use client";

import Loader from "@/components/loader/Loader";
import CustomerWithdrawalTable from "@/components/table/customer-withdrawal-table";
import { BASE_URL } from "@/constants/environments";
import { CustomerWithdrawalTableColumns } from "@/constants/table-columns";
import { CustomerWithdrawalProps } from "@/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function WithdrawalRequestManagement() {
  const [withdrawal, setWithdrawal] = useState<CustomerWithdrawalProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawal = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/getallcustomerwithdrawalrequests`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách yêu cầu rút tiền.");
        }

        const data = await response.json();
        const formatted =
          data.customerRequests === null || data.customerRequests === undefined
            ? []
            : data.customerRequests.sort(
                (a: CustomerWithdrawalProps, b: CustomerWithdrawalProps) =>
                  dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
              );
        setWithdrawal(formatted);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setWithdrawal([]);
        setLoading(false);
      }
    };

    fetchWithdrawal();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-card rounded-xl">
      <CustomerWithdrawalTable
        columns={CustomerWithdrawalTableColumns}
        data={withdrawal}
      />
    </div>
  );
}

export default WithdrawalRequestManagement;
