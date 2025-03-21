"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VerifyProps } from "@/types";
import { verifyList } from "@/constants/constant";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { User, IdCard, Globe, Phone, FileText } from "lucide-react";

function VerifyOwnerDetail() {
  const params = useParams();
  const verifyOwnerId = params?.["verify-ownerId"];
  const [verifyDetail, setVerifyDetail] = useState<VerifyProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (verifyOwnerId) {
      const detail =
        verifyList.find((item) => item.id === verifyOwnerId) || null;
      setVerifyDetail(detail);
      setLoading(false);
    }
  }, [verifyOwnerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!verifyDetail) {
    return <div>Không tìm thấy thông tin xác minh.</div>;
  }

  const handleApprove = () => {
    console.log("Approved");
  };

  const handleReject = () => {
    console.log("Rejected");
  };

  return (
    <div className="p-6 bg-card rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-primary dark:text-primary-dark mb-4">
        Chi tiết xác minh
      </h1>
      <Separator className="my-4 dark:border-gray-700" />
      <div className="flex flex-col gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-300">
            <User className="h-5 w-5 text-primary dark:text-primary-dark" />
            Thông tin cá nhân
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Họ và tên:</strong> {verifyDetail.name}
            </p>
            <p>
              <strong>Email:</strong> {verifyDetail.email}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {verifyDetail.location}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {verifyDetail.phone}
            </p>
            <p>
              <strong>Trạng thái:</strong> {verifyDetail.status}
            </p>
            <p>
              <strong>Ngày tạo:</strong> {verifyDetail.createdAt}
            </p>
          </div>
        </div>
        <Separator className="my-4 dark:border-gray-700" />
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-300">
            <IdCard className="h-5 w-5 text-primary dark:text-primary-dark" />
            Căn cước công dân
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Họ và tên:</strong> {verifyDetail.identify.name}
            </p>
            <p>
              <strong>Số CCCD:</strong> {verifyDetail.identify.number}
            </p>
            <p>
              <strong>Ngày sinh:</strong> {verifyDetail.identify.dateOfBirth}
            </p>
            <p>
              <strong>Giới tính:</strong> {verifyDetail.identify.gender}
            </p>
            <p>
              <strong>Quốc tịch:</strong> {verifyDetail.identify.nationality}
            </p>
            <p>
              <strong>Quê quán:</strong> {verifyDetail.identify.placeOfOrigin}
            </p>
            <p>
              <strong>Nơi cư trú:</strong>{" "}
              {verifyDetail.identify.placeOfResidence}
            </p>
            <p>
              <strong>Ngày hết hạn:</strong>{" "}
              {verifyDetail.identify.dateOfExpiry}
            </p>
            <p>
              <strong>Ngày cấp:</strong> {verifyDetail.identify.dateOfCreation}
            </p>
            <p>
              <strong>Tệp đính kèm:</strong>{" "}
              <a
                href={verifyDetail.identify.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 underline"
              >
                Xem tệp
              </a>
            </p>
          </div>
        </div>
        <Separator className="my-4 dark:border-gray-700" />
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-300">
            <Globe className="h-5 w-5 text-primary dark:text-primary-dark" />
            Tài khoản mạng xã hội
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Facebook:</strong> {verifyDetail.social.facebook}
            </p>
            <p>
              <strong>Instagram:</strong> {verifyDetail.social.instagram}
            </p>
            <p>
              <strong>Twitter:</strong> {verifyDetail.social.twitter}
            </p>
            <p>
              <strong>Youtube:</strong> {verifyDetail.social.youtube}
            </p>
            <p>
              <strong>Khác:</strong> {verifyDetail.social.other}
            </p>
          </div>
        </div>
        <Separator className="my-4 dark:border-gray-700" />
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-300">
            <FileText className="h-5 w-5 text-primary dark:text-primary-dark" />
            Giấy phép kinh doanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Tên công ty:</strong> {verifyDetail.license.name}
            </p>
            <p>
              <strong>Số giấy phép:</strong> {verifyDetail.license.number}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {verifyDetail.license.address}
            </p>
            <p>
              <strong>Vốn điều lệ:</strong>{" "}
              {verifyDetail.license.charterCapital}
            </p>
            <p>
              <strong>Tệp đính kèm:</strong>{" "}
              <a
                href={verifyDetail.license.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 underline"
              >
                Xem tệp
              </a>
            </p>
          </div>
        </div>
        <Separator className="my-4 dark:border-gray-700" />
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-300">
            <Phone className="h-5 w-5 text-primary dark:text-primary-dark" />
            Xác thực số điện thoại
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Số điện thoại:</strong> {verifyDetail.verifyPhone.phone}
          </p>
        </div>
        <Separator className="my-4 dark:border-gray-700" />
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={handleReject}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
          >
            Từ chối
          </Button>
          <Button onClick={handleApprove} className="dark:bg-primary-dark dark:hover:bg-secondary-dark">
            Chấp nhận
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOwnerDetail;