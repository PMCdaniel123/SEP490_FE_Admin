import { EmployeeProps } from "@/types";
import dayjs from "dayjs";
import { Ban } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

function EmployeeModal({ employee }: { employee: EmployeeProps }) {
  useEffect(() => {
    if (!employee) {
      return;
    }
  }, [employee]);

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
          {dayjs(employee?.dateOfBirth).format("DD/MM/YYYY")}
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
        <button className="border flex items-center gap-2 rounded-md font-semibold border-red-500 text-red-500 px-6 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300">
          <Ban size={16} /> Chặn
        </button>
      </div>
    </div>
  );
}

export default EmployeeModal;
