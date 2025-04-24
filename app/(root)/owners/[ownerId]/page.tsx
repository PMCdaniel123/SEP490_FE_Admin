/* eslint-disable @next/next/no-img-element */
"use client";

import Loader from "@/components/loader/Loader";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/constants/environments";
import { EmployeeProps, OwnerProps } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import dayjs from "dayjs";
import {
  LockKeyholeOpen,
  FileText,
  Globe,
  User,
  LockKeyhole,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function OwnerDetail() {
  const { ownerId } = useParams() as { ownerId: string };
  const [ownerDetail, setOwnerDetail] = useState<OwnerProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<EmployeeProps | null>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!ownerId) return;
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/workspace-owners/${ownerId}`);

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải thông tin doanh nghiệp.");
        }

        const data = await response.json();
        setOwnerDetail(data.owner);
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
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, [ownerId]);

  useEffect(() => {
    if (!ownerDetail) {
      return;
    }

    if (!ownerDetail.userId) {
      return;
    }

    setLoading(true);
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${ownerDetail.userId}`);

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
  }, [ownerDetail]);

  const handleBan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/owners/banowner/${ownerDetail?.id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi chặn doanh nghiệp.");
      }

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      toast.success("Chặn thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      router.push("/owners");
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
        `${BASE_URL}/owners/unbanowner/${ownerDetail?.id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi mở chặn doanh nghiệp.");
      }

      const data = await response.json();
      console.log(data);
      setLoading(false);
      toast.success("Mở chặn thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      router.push("/owners");
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

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-card rounded-xl">
        <div className="flex flex-col gap-6 mt-10">
          <h1 className="text-xl font-bold text-center text-primary">
            Thông tin chi tiết doanh nghiệp
          </h1>
          <div className="mt-4 flex justify-end">
            {ownerDetail?.status === "Success" ? (
              <button
                className="border rounded-md font-semibold border-red-500 text-red-500 px-6 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                {loading ? (
                  <LoadingOutlined style={{ color: "red" }} />
                ) : (
                  <span className="flex items-center gap-2">
                    <LockKeyhole size={16} /> Chặn
                  </span>
                )}
              </button>
            ) : ownerDetail?.status === "Fail" ? (
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
            ) : (
              <></>
            )}
          </div>
          <Separator className="mb-4 dark:border-gray-700" />
          <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-card px-4">
              <User className="h-5 w-5 text-primary dark:text-primary-dark" />
              Thông tin chung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
              <div className="col-span-1 md:col-span-2 flex gap-4 items-end">
                <span className="font-semibold">Ảnh đại diện: </span>
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden border">
                  {ownerDetail?.avatar ? (
                    <img
                      src={
                        typeof ownerDetail?.avatar === "string"
                          ? ownerDetail?.avatar
                          : URL.createObjectURL(ownerDetail?.avatar)
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="/owner_icon.png"
                      alt="Default Avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {ownerDetail?.email}
              </p>
              <p>
                <span className="font-semibold">Số điện thoại:</span>{" "}
                {ownerDetail?.phone}
              </p>
              <p>
                <span className="font-semibold">Trạng thái:</span>{" "}
                {(ownerDetail?.status === "Success" ||
                  ownerDetail?.status === "Active") && (
                  <span className="text-green-500">Hoạt động</span>
                )}
                {ownerDetail?.status === "InActive" && (
                  <span className="text-red-500">Bị chặn</span>
                )}
              </p>
              <p>
                <span className="font-semibold">Ngày tạo tài khoản:</span>{" "}
                {ownerDetail?.createdAt
                  ? dayjs(ownerDetail?.createdAt).format("HH:mm DD/MM/YYYY")
                  : "Chưa cập nhật"}
              </p>
              {ownerDetail?.userId && (
                <p>
                  <span className="font-semibold">
                    Mã nhân viên xử lý yêu cầu:{" "}
                  </span>
                  NV{Number(ownerDetail?.userId).toString().padStart(4, "0")}
                </p>
              )}
              {ownerDetail?.userId && (
                <p>
                  <span className="font-semibold">
                    Nhân viên xử lý yêu cầu:{" "}
                  </span>
                  {employee?.name}
                </p>
              )}
              {ownerDetail?.userId && (
                <p>
                  <span className="font-semibold">Ngày xử lý: </span>
                  {dayjs(ownerDetail?.updatedAt).format("HH:mm DD/MM/YYYY")}
                </p>
              )}
            </div>
          </div>
          <Separator className="my-4 dark:border-gray-700" />
          <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-card px-4">
              <Globe className="h-5 w-5 text-primary dark:text-primary-dark" />
              Tài khoản mạng xã hội
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
              <Link href={ownerDetail?.facebook || ""}>
                <span className="font-semibold">Facebook:</span>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {ownerDetail?.facebook}
                </span>
              </Link>
              <Link href={ownerDetail?.instagram || ""}>
                <span className="font-semibold">Instagram:</span>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {ownerDetail?.instagram}
                </span>
              </Link>
              <Link href={ownerDetail?.tiktok || ""}>
                <span className="font-semibold">Tiktok:</span>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {ownerDetail?.tiktok}
                </span>
              </Link>
            </div>
          </div>
          <Separator className="my-4 dark:border-gray-700" />
          <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-card px-4">
              <FileText className="h-5 w-5 text-primary dark:text-primary-dark" />
              Giấy phép kinh doanh
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
              <p>
                <span className="font-semibold">Họ và tên:</span>{" "}
                {ownerDetail?.ownerName}
              </p>
              <p>
                <span className="font-semibold">Giới tính:</span>{" "}
                {ownerDetail?.sex}
              </p>
              <p>
                <span className="font-semibold">
                  Ngày đăng kí doanh nghiệp:
                </span>{" "}
                {dayjs(ownerDetail?.registrationDate).format("DD/MM/YYYY")}
              </p>
              <p>
                <span className="font-semibold">Tên công ty:</span>{" "}
                {ownerDetail?.licenseName}
              </p>
              <p>
                <span className="font-semibold">Số giấy phép:</span>{" "}
                {ownerDetail?.licenseNumber}
              </p>
              <p className="md:col-span-2">
                <span className="font-semibold">Địa chỉ:</span>{" "}
                {ownerDetail?.licenseAddress}
              </p>
              <p>
                <span className="font-semibold">Vốn điều lệ:</span>{" "}
                {ownerDetail?.charterCapital}
              </p>
              <p>
                <span className="font-semibold">Tệp đính kèm:</span>{" "}
                <a
                  href={ownerDetail?.licenseFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary underline"
                >
                  Xem tệp
                </a>
              </p>
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
          Bạn có muốn chặn tài khoản doanh nghiệp này không?
        </p>
      </Modal>
    </>
  );
}

export default OwnerDetail;
