"use client";

import { EmployeeProps, WithdrawalRequestProps } from "@/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { BASE_URL } from "@/constants/environments";

function WithdrawalModal({ request }: { request: WithdrawalRequestProps }) {
  const [employee, setEmployee] = useState<EmployeeProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!request) {
      return;
    }

    if (!request.userId) {
      return;
    }

    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${request.userId}`);

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải thông tin nhân viên.");
        }

        const data = await response.json();
        setEmployee(data.user);
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
        setEmployee(null);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [request]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col mt-4 gap-3 border border-primary bg-white text-black p-4 rounded-md">
        <p>
          <span className="font-semibold">Tiêu đề: </span>
          {request?.title}
        </p>
        <p>
          <span className="font-semibold">Mô tả: </span>
          {request?.description}
        </p>
        <p>
          <span className="font-semibold">Ngày tạo: </span>
          {dayjs(request?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
        </p>
        <p>
          <span className="font-semibold">Tên ngân hàng: </span>
          {request?.bankName}
        </p>
        <p>
          <span className="font-semibold">Tên chủ tài khoản ngân hàng: </span>
          {request?.bankAccountName}
        </p>
        <p>
          <span className="font-semibold">Số tài khoản ngân hàng: </span>
          {request?.bankNumber}
        </p>
        <p>
          <span className="font-semibold">Số tiền: </span>
          {request?.balance}
        </p>
        {request?.userId && (
          <p>
            <span className="font-semibold">ID nhân viên xử lý: </span>
            {request?.userId}
          </p>
        )}
        {request?.userId && (
          <p>
            <span className="font-semibold">Nhân viên xử lý: </span>
            {employee?.name}
          </p>
        )}
        <p>
          <span className="font-semibold">Trạng thái: </span>
          {request?.status === "Handling" ? (
            <span className="text-yellow-500">Chờ xử lý</span>
          ) : request?.status === "Success" ? (
            <span className="text-green-500">Thành công</span>
          ) : (
            <span className="text-red-500">Thất bại</span>
          )}
        </p>
        {request?.status !== "Handling" && (
          <p>
            <span className="font-semibold">Tin nhắn: </span>
            {request?.managerResponse}
          </p>
        )}
      </div>
    </div>
  );
}

export default WithdrawalModal;
