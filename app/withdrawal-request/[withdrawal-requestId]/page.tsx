"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WithdrawalRequestProps } from "@/types";
import { withdrawalListRequest } from "@/constants/constant";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Banknote, User,  } from "lucide-react";

function WithdrawalRequestDetail() {
  const params = useParams();
  const withdrawalRequestId = params?.["withdrawal-requestId"];
  const [withdrawalDetail, setWithdrawalDetail] = useState<WithdrawalRequestProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (withdrawalRequestId) {
      const detail = withdrawalListRequest.find((item) => item.id === withdrawalRequestId) || null;
      setWithdrawalDetail(detail);
      setLoading(false);
    }
  }, [withdrawalRequestId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!withdrawalDetail) {
    return <div>Không tìm thấy yêu cầu rút tiền.</div>;
  }

  const handleApprove = () => {
    console.log("Approved");
  };

  const handleReject = () => {
    console.log("Rejected");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-primary mb-4">Chi tiết yêu cầu rút tiền</h1>
      <Separator className="my-4" />
      <div className="flex flex-col gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary" />
            Thông tin yêu cầu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Số tài khoản:</strong> {withdrawalDetail.number}
            </p>
            <p>
              <strong>Ngân hàng:</strong> {withdrawalDetail.bank}
            </p>
            <p>
              <strong>Số tiền:</strong> {withdrawalDetail.money}
            </p>
            <p>
              <strong>Trạng thái:</strong> {withdrawalDetail.status === "1" ? "Đang chờ" : withdrawalDetail.status === "2" ? "Đã duyệt" : "Đã từ chối"}
            </p>
            <p>
              <strong>Ngày tạo:</strong> {withdrawalDetail.createdAt}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong> {withdrawalDetail.updatedAt}
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Thông tin người dùng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Họ và tên:</strong> {withdrawalDetail.user.name}
            </p>
            <p>
              <strong>Ngày sinh:</strong> {withdrawalDetail.user.dob}
            </p>
            <p>
              <strong>Email:</strong> {withdrawalDetail.user.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {withdrawalDetail.user.phone}
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleReject}>
            Từ chối
          </Button>
          <Button onClick={handleApprove}>Chấp nhận</Button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalRequestDetail;