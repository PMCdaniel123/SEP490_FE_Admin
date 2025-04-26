"use client";

import Loader from "@/components/loader/Loader";
import OwnerTable from "@/components/table/owner-table";
import { BASE_URL } from "@/constants/environments";
import { OwnerTableColumns } from "@/constants/table-columns";
import { OwnerProps } from "@/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function OwnerManagement() {
  const [ownerList, setOwnerList] = useState<OwnerProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOwnerList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/workspace-owners`);

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải danh sách doanh nghiệp.");
      }
      const data = await response.json();
      const formatted = Array.isArray(data.owners)
        ? data.owners
            // .filter(
            //   (owner: OwnerProps) =>
            //     owner.status === "Success" ||
            //     owner.status === "InActive" ||
            //     owner.status === "Active"
            // )
            .sort(
              (a: OwnerProps, b: OwnerProps) =>
                dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
            )
        : [];
      setOwnerList(formatted);
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
      setOwnerList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerList();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-card rounded-md">
      <OwnerTable
        columns={OwnerTableColumns(fetchOwnerList)}
        data={ownerList}
      />
    </div>
  );
}

export default OwnerManagement;
