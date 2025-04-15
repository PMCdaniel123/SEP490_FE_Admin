"use client";

import Loader from "@/components/loader/Loader";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/constants/environments";
import { EmployeeProps, OwnerProps } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  LockKeyholeOpen,
  FileText,
  Globe,
  User,
  LockKeyhole,
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
    setLoading(true);
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
      setLoading(false);
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
      setLoading(false);
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
    <div className="p-4 bg-card rounded-xl">
      <div className="flex flex-col gap-6 mt-10">
        <h1 className="text-xl font-bold text-center text-primary">
          Thông tin chi tiết doanh nghiệp
        </h1>
        <div className="mt-4 flex justify-end">
          {ownerDetail?.status !== "InActive" ? (
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
          )}
        </div>
        <Separator className="mb-4 dark:border-gray-700" />
        <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-card px-4">
            <User className="h-5 w-5 text-primary dark:text-primary-dark" />
            Thông tin cá nhân
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
            <p>
              <strong>Email:</strong> {ownerDetail?.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {ownerDetail?.phone}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {(ownerDetail?.status === "Success" ||
                ownerDetail?.status === "Active") && (
                <span className="text-green-500">Hoạt động</span>
              )}
              {ownerDetail?.status === "InActive" && (
                <span className="text-red-500">Bị chặn</span>
              )}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {dayjs(ownerDetail?.updatedAt).format("HH:mm DD/MM/YYYY")}
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
                <span className="font-semibold">Nhân viên xử lý yêu cầu: </span>
                {employee?.name}
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
              <strong>Facebook:</strong>{" "}
              <span className="text-primary hover:text-secondary underline">
                {ownerDetail?.facebook}
              </span>
            </Link>
            <Link href={ownerDetail?.instagram || ""}>
              <strong>Instagram:</strong>{" "}
              <span className="text-primary hover:text-secondary underline">
                {ownerDetail?.instagram}
              </span>
            </Link>
            <Link href={ownerDetail?.tiktok || ""}>
              <strong>Tiktok:</strong>{" "}
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
              <strong>Họ và tên:</strong> {ownerDetail?.ownerName}
            </p>
            <p>
              <strong>Giới tính:</strong> {ownerDetail?.sex}
            </p>
            <p>
              <strong>Ngày đăng kí doanh nghiệp:</strong>{" "}
              {dayjs(ownerDetail?.registrationDate).format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Tên công ty:</strong> {ownerDetail?.licenseName}
            </p>
            <p>
              <strong>Số giấy phép:</strong> {ownerDetail?.licenseNumber}
            </p>
            <p className="md:col-span-2">
              <strong>Địa chỉ:</strong> {ownerDetail?.licenseAddress}
            </p>
            <p>
              <strong>Vốn điều lệ:</strong> {ownerDetail?.charterCapital}
            </p>
            <p>
              <strong>Tệp đính kèm:</strong>{" "}
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
  );
}

export default OwnerDetail;
