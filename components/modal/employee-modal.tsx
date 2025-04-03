"use client";

import { BASE_URL } from "@/constants/environments";
import { EmployeeProps } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Ban } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EmployeeModal({ employee }: { employee: EmployeeProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!employee) {
      return;
    }
  }, [employee]);

  const handleBan = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/users/banstaff/${employee.id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi chặn nhân viên.");
      }

      const data = await response.json();
      console.log(data);
      setLoading(false);
      router.push("/employees");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <Image
          src={employee?.avatar || "/logo.png"}
          height={60}
          width={60}
          alt={employee?.name || ""}
          className="rounded-full object-cover border"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-primary">
            {employee?.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-4 gap-3 border border-primary bg-white text-black p-4 rounded-md">
        <p>
          <span className="font-semibold">Email: </span>
          {employee?.email}
        </p>
        <p>
          <span className="font-semibold">Số điện thoại: </span>
          {employee?.phone}
        </p>
        <p>
          <span className="font-semibold">Ngày sinh: </span>
          {employee.dateOfBirth !== null
            ? dayjs(employee.dateOfBirth).format("DD/MM/YYYY")
            : "Chưa cập nhật"}
        </p>
        <p>
          <span className="font-semibold">Giới tính: </span>
          {employee?.sex}
        </p>
        <p>
          <span className="font-semibold">Địa chỉ: </span>
          {employee?.location || "Chưa cập nhật"}
        </p>
        <p>
          <span className="font-semibold">Chức vụ: </span>
          {employee?.roleName === "Manager" ? (
            <span className="text-blue-500">Quản lý</span>
          ) : (
            <span className="text-yellow-500">Nhân viên</span>
          )}
        </p>
        <p>
          <span className="font-semibold">Trạng thái: </span>
          {employee?.status === "Active" ? (
            <span className="text-green-500">Hoạt động</span>
          ) : (
            <span className="text-red-500">Không hoạt động</span>
          )}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="border rounded-md font-semibold border-red-500 text-red-500 px-6 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300"
          onClick={handleBan}
        >
          {loading ? (
            <LoadingOutlined style={{ color: "red" }} />
          ) : (
            <span className="flex items-center gap-2">
              <Ban size={16} /> Chặn
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default EmployeeModal;
