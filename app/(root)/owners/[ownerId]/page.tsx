"use client";

import Loader from "@/components/loader/Loader";
import { Separator } from "@/components/ui/separator";
import { OwnerProps } from "@/types";
import dayjs from "dayjs";
import { FileText, Globe, IdCard, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function OwnerDetail() {
  const { ownerId } = useParams() as { ownerId: string };
  const [ownerDetail, setOwnerDetail] = useState<OwnerProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ownerId) return;
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(
          `https://localhost:5050/workspace-owners/${ownerId}`
        );

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
        <Separator className="my-4 dark:border-gray-700" />
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
              {ownerDetail?.status === "Success" && (
                <span className="text-green-500">Xác thực thành công</span>
              )}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {dayjs(ownerDetail?.updatedAt).format("HH:mm DD/MM/YYYY")}
            </p>
          </div>
        </div>
        <Separator className="my-4 dark:border-gray-700" />
        <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-card px-4">
            <IdCard className="h-5 w-5 text-primary dark:text-primary-dark" />
            Căn cước công dân
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
            <p>
              <strong>Họ và tên:</strong> {ownerDetail?.identityName}
            </p>
            <p>
              <strong>Số CCCD:</strong> {ownerDetail?.identityNumber}
            </p>
            <p>
              <strong>Ngày sinh:</strong>{" "}
              {dayjs(ownerDetail?.dateOfBirth).format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Giới tính:</strong> {ownerDetail?.sex}
            </p>
            <p>
              <strong>Quốc tịch:</strong> {ownerDetail?.nationality}
            </p>
            <p>
              <strong>Quê quán:</strong> {ownerDetail?.placeOfOrigin}
            </p>
            <p>
              <strong>Nơi cư trú:</strong> {ownerDetail?.placeOfResidence}
            </p>
            <p>
              <strong>Ngày hết hạn:</strong>{" "}
              {dayjs(ownerDetail?.identityExpiredDate).format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Ngày cấp:</strong>{" "}
              {dayjs(ownerDetail?.identityCreatedDate).format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Tệp đính kèm:</strong>{" "}
              <a
                href={ownerDetail?.identityFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary underline"
              >
                Xem tệp
              </a>
            </p>
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
              <strong>Tên công ty:</strong> {ownerDetail?.licenseName}
            </p>
            <p>
              <strong>Số giấy phép:</strong> {ownerDetail?.licenseNumber}
            </p>
            <p>
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
