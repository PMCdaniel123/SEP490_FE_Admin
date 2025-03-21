"use client";

import Loader from "@/components/loader/Loader";
import OwnerTable from "@/components/table/owner-table";
import { OwnerTableColumns } from "@/constants/table-columns";
import { OwnerProps } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function OwnerManagement() {
  const [ownerList, setOwnerList] = useState<OwnerProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerList = async () => {
      try {
        const response = await fetch("https://localhost:5050/workspace-owners");

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách doanh nghiệp.");
        }
        const data = await response.json();
        const formatted = data.owners;
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
    <div className="p-4 bg-card rounded-xl">
      <OwnerTable columns={OwnerTableColumns} data={ownerList} />
    </div>
  );
}

export default OwnerManagement;
