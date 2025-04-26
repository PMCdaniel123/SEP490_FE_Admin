"use client";

import Loader from "@/components/loader/Loader";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/constants/environments";
import { RootState } from "@/stores";
import {
  EmployeeProps,
  formatCurrency,
  OwnerWallet,
  OwnerWithdrawalProps,
} from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import dayjs from "dayjs";
import { CalendarClock, TriangleAlert, Wallet2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function WithdrawalDetail() {
  const { withdrawalId } = useParams() as { withdrawalId: string };
  const [withdrawal, setWithdrawal] = useState<OwnerWithdrawalProps | null>(
    null
  );
  const [employee, setEmployee] = useState<EmployeeProps | null>(null);
  const [ownerWallet, setOwnerWallet] = useState<OwnerWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { admin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!withdrawalId) {
      return;
    }
    setLoading(true);
    const fetchWithdrawal = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/owner-withdrawal-requests/${withdrawalId}`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải thông tin yêu cầu rút tiền.");
        }

        const data = await response.json();
        setWithdrawal(data.request);
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
        setWithdrawal(null);
        setLoading(false);
      }
    };

    fetchWithdrawal();
  }, [withdrawalId]);

  useEffect(() => {
    if (!withdrawal) {
      return;
    }

    if (!withdrawal.userId) {
      return;
    }

    setLoading(true);
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${withdrawal.userId}`);

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
  }, [withdrawal]);

  useEffect(() => {
    if (!withdrawal) {
      return;
    }

    if (!withdrawal.workspaceOwnerId) {
      return;
    }

    setLoading(true);
    const fetchOwnerWallet = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/owner-wallets/${withdrawal.workspaceOwnerId}`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải ví doanh nghiệp.");
        }

        const data = await response.json();
        setOwnerWallet(data);
        if (Number(data?.balance) < Number(withdrawal?.balance)) {
          setMessage("Số tiền hiện tại nhỏ hơn số tiền của yêu cầu rút.");
        }
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
        setOwnerWallet(null);
        setLoading(false);
      }
    };

    fetchOwnerWallet();
  }, [withdrawal]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  const handleChangeStatus = async (status: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/owner-withdrawal-requests/${withdrawalId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            managerResponse: status === "Success" ? "Ok" : message,
            userId: admin?.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải thông tin yêu cầu rút tiền.");
      }

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      if (status === "Success") {
        setIsAccepted(false);
      } else {
        setIsRejected(false);
      }
      router.push("/withdrawal-request/owners");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setIsLoading(false);
      if (status === "Success") {
        setIsAccepted(false);
      } else {
        setIsRejected(false);
      }
      router.push("/withdrawal-request");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-card rounded-md pt-10 gap-6 flex flex-col">
          <div className="mt-4 flex items-center justify-center bg-primary dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 p-4 rounded-md">
            <h1 className="font-bold text-white text-xl">
              Thông tin yêu cầu rút tiền
            </h1>
          </div>
          {withdrawal && withdrawal?.status === "Handling" && (
            <div className="flex items-center justify-end gap-4">
              {Number(withdrawal?.balance) > 0 &&
                Number(ownerWallet?.balance) >= Number(withdrawal?.balance) && (
                  <button
                    onClick={() => setIsAccepted(true)}
                    className="px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300"
                  >
                    Chấp nhận
                  </button>
                )}
              <button
                onClick={() => setIsRejected(true)}
                className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                Từ chối
              </button>
            </div>
          )}
          <Separator className="mb-4 dark:border-gray-700" />
          <div className="border border-primary dark:bg-gray-800 p-6 rounded-md relative">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-card px-4">
              <CalendarClock className="h-5 w-5 text-primary dark:text-primary-dark" />
              <span>Trạng thái yêu cầu</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-2">
              {withdrawal?.userId && (
                <p>
                  <span className="font-semibold">ID nhân viên xử lý: </span>
                  NV{Number(withdrawal?.userId).toString().padStart(4, "0")}
                </p>
              )}
              {withdrawal?.userId && (
                <p>
                  <span className="font-semibold">Nhân viên xử lý: </span>
                  {employee?.name}
                </p>
              )}
              <p>
                <span className="font-semibold">Trạng thái: </span>
                {withdrawal?.status === "Handling" ? (
                  <span className="text-yellow-500">Chờ xử lý</span>
                ) : withdrawal?.status === "Success" ? (
                  <span className="text-green-500">Thành công</span>
                ) : (
                  <span className="text-red-500">Thất bại</span>
                )}
              </p>
              {withdrawal?.userId && (
                <p>
                  <span className="font-semibold">Tin nhắn: </span>
                  {withdrawal?.managerResponse}
                </p>
              )}
              {withdrawal?.userId && (
                <p>
                  <span className="font-semibold">Ngày xử lý: </span>
                  {dayjs(withdrawal?.updatedAt).format("HH:mm:ss DD/MM/YYYY")}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 bg-card rounded-md py-10">
          <div className="border border-primary dark:bg-gray-800 p-6 rounded-md relative">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-card px-4">
              <Wallet2 className="h-5 w-5 text-primary dark:text-primary-dark" />
              <span>Tài khoản ngân hàng</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-2">
              <p>
                <span className="font-semibold">Tiêu đề: </span>
                {withdrawal?.title}
              </p>
              <p>
                <span className="font-semibold">Mô tả: </span>
                {withdrawal?.description}
              </p>
              <p>
                <span className="font-semibold">Ngày tạo: </span>
                {dayjs(withdrawal?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
              </p>
              <p>
                <span className="font-semibold">Tên ngân hàng: </span>
                {withdrawal?.bankName}
              </p>
              <p>
                <span className="font-semibold">
                  Tên chủ tài khoản ngân hàng:{" "}
                </span>
                {withdrawal?.bankAccountName}
              </p>
              <p>
                <span className="font-semibold">Số tài khoản ngân hàng: </span>
                {withdrawal?.bankNumber}
              </p>
              <p>
                <span className="font-semibold">Số tiền cần chuyển: </span>
                {formatCurrency(Number(withdrawal?.balance))}
              </p>
              {withdrawal && withdrawal?.status === "Handling" && (
                <p>
                  <span className="font-semibold">Số tiền hiện tại: </span>
                  {formatCurrency(Number(ownerWallet?.balance))}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={
          <p className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="text-yellow-400">
              <TriangleAlert />
            </span>{" "}
            <span>Lưu ý</span>
          </p>
        }
        open={isAccepted}
        onCancel={() => setIsAccepted(!isAccepted)}
        footer={[
          <button
            key="accept"
            disabled={isLoading}
            onClick={() => handleChangeStatus("Success")}
            className="px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300"
          >
            {isLoading ? (
              <LoadingOutlined style={{ color: "green" }} />
            ) : (
              <span>Xác nhận</span>
            )}
          </button>,
        ]}
      >
        <p className="text-gray-700 dark:text-black py-4">
          Bạn có đồng ý xác nhận yêu cầu rút tiền này không?
        </p>
      </Modal>

      <Modal
        title={
          <p className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="text-yellow-400">
              <TriangleAlert />
            </span>{" "}
            <span>Lưu ý</span>
          </p>
        }
        open={isRejected}
        onCancel={() => setIsRejected(!isRejected)}
        footer={[
          <button
            key="reject"
            disabled={isLoading || message === ""}
            onClick={() => handleChangeStatus("Fail")}
            className={`px-4 py-2 rounded-md border border-red-500 text-red-500 ${
              message === ""
                ? "cursor-not-allowed"
                : "hover:bg-red-500 hover:text-white transition-colors duration-300"
            } `}
          >
            {isLoading ? (
              <LoadingOutlined style={{ color: "red" }} />
            ) : (
              <span>Xác nhận</span>
            )}
          </button>,
        ]}
      >
        <p className="text-gray-700 dark:text-gray-300 py-4">
          Bạn có muốn từ chối yêu cầu rút tiền này không?
        </p>
        <Input
          placeholder="Lý do"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Modal>
    </>
  );
}

export default WithdrawalDetail;
