"use client";

import Loader from "@/components/loader/Loader";
import VerifyTable from "@/components/table/verify-table";
import { BASE_URL } from "@/constants/environments";
import { VerifyTableColumns } from "@/constants/table-columns";
import { OwnerProps } from "@/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function VerifyOwnerManagement() {
  const [verifyList, setVerifyList] = useState<OwnerProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerifyList = async () => {
      try {
        const response = await fetch(`${BASE_URL}/workspace-owners`);

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách yêu cầu.");
        }
        const data = await response.json();
        const formatted = Array.isArray(data.owners)
          ? data.owners
              .filter(
                (owner: OwnerProps) =>
                  owner.status === "Handling" || owner.status === "Fail"
              )
              .sort(
                (a: OwnerProps, b: OwnerProps) =>
                  dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
              )
          : [];
        setVerifyList(formatted);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setVerifyList([]);
        setLoading(false);
      }
    };

    fetchVerifyList();
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
      <VerifyTable columns={VerifyTableColumns} data={verifyList} />
    </div>
  );
}

export default VerifyOwnerManagement;
