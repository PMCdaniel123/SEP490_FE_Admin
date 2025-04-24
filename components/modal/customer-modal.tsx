"use client";

import { BASE_URL } from "@/constants/environments";
import { RootState } from "@/stores";
import { CustomerProps } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import dayjs from "dayjs";
import { LockKeyhole, LockKeyholeOpen, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CustomerModal({
  customer,
  onStatusChange,
}: {
  customer: CustomerProps;
  onStatusChange: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { admin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!customer) {
      return;
    }
  }, [customer]);

  const handleBan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/users/bancustomer/${customer.id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi chặn khách hàng.");
      }

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      onStatusChange();
      toast.success("Chặn thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      router.push("/customers");
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
    }
  };

  const handleUnban = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/users/unbancustomer/${customer.id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi mở chặn khách hàng.");
      }

      const data = await response.json();
      console.log(data);
      setLoading(false);
      onStatusChange();
      toast.success("Mở chặn thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      router.push("/customers");
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
    <>
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <Image
            src={customer?.avatar || "/logo.png"}
            height={60}
            width={60}
            alt={customer?.name || ""}
            className="rounded-full object-cover border"
          />
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold text-primary">
              {customer?.name}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-4 gap-3 border border-primary bg-white text-black p-4 rounded-md">
          <p>
            <span className="font-semibold">Email: </span>
            {customer?.email}
          </p>
          <p>
            <span className="font-semibold">Số điện thoại: </span>
            {customer?.phone || "Chưa cập nhật"}
          </p>
          <p>
            <span className="font-semibold">Ngày sinh: </span>
            {customer.dateOfBirth !== null
              ? dayjs(customer.dateOfBirth).format("DD/MM/YYYY")
              : "Chưa cập nhật"}
          </p>
          <p>
            <span className="font-semibold">Giới tính: </span>
            {customer?.sex || "Chưa cập nhật"}
          </p>
          <p>
            <span className="font-semibold">Địa chỉ: </span>
            {customer?.location || "Chưa cập nhật"}
          </p>
          <p>
            <span className="font-semibold">Trạng thái: </span>
            {customer?.isBan === 1 ? (
              <span className="text-red-500">Bị chặn</span>
            ) : customer?.status === "Active" ? (
              <span className="text-green-500">Hoạt động</span>
            ) : (
              <span className="text-red-500">Không hoạt động</span>
            )}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          {Number(admin?.id || "0") === 1 &&
            (customer.isBan === 0 ? (
              <button
                className="border rounded-md font-semibold border-red-500 text-red-500 px-6 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300"
                onClick={handleBan}
              >
                {loading ? (
                  <LoadingOutlined style={{ color: "red" }} />
                ) : (
                  <span className="flex items-center gap-2">
                    <LockKeyhole size={16} /> Chặn
                  </span>
                )}
              </button>
            ) : (
              <button
                className="border rounded-md font-semibold border-yellow-500 text-yellow-500 px-6 py-2 hover:bg-yellow-500 hover:text-white transition-colors duration-300"
                onClick={handleUnban}
              >
                {loading ? (
                  <LoadingOutlined style={{ color: "yellow" }} />
                ) : (
                  <span className="flex items-center gap-2">
                    <LockKeyholeOpen size={16} /> Mở chặn
                  </span>
                )}
              </button>
            ))}
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
        open={isModalOpen}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        footer={[
          <button
            key="reject"
            disabled={isLoading}
            onClick={handleBan}
            className={`px-4 py-2 rounded-lg border border-red-500 text-red-500`}
          >
            {isLoading ? (
              <LoadingOutlined style={{ color: "white" }} />
            ) : (
              <span>Xác nhận</span>
            )}
          </button>,
        ]}
      >
        <p className="text-gray-700 dark:text-gray-300 py-4">
          Bạn có muốn chặn tài khoản khách hàng này không?
        </p>
      </Modal>
    </>
  );
}

export default CustomerModal;
