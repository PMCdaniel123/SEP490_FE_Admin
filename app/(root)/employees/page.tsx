"use client";

import Loader from "@/components/loader/Loader";
import EmployeeTable from "@/components/table/employee-table";
import { BASE_URL } from "@/constants/environments";
import { EmployeeTableColumns } from "@/constants/table-columns";
import { EmployeeProps } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EmployeeManagement() {
  const [employeeList, setEmployeeList] = useState<EmployeeProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployeeList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`);

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải danh sách nhân viên.");
      }
      const data = await response.json();
      const formatted =
        data.users === null || data.users === undefined ? [] : data.users;
      setEmployeeList(formatted);
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
      setEmployeeList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
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
      <EmployeeTable
        columns={EmployeeTableColumns(fetchEmployeeList)}
        data={employeeList}
      />
    </div>
  );
}

export default EmployeeManagement;
