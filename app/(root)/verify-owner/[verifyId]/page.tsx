"use client";

import Loader from "@/components/loader/Loader";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/constants/environments";
import { RootState } from "@/stores";
import { EmployeeProps, OwnerProps } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import dayjs from "dayjs";
import { FileText, Globe, TriangleAlert, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function VerifyOwnerDetail() {
  const { verifyId } = useParams() as { verifyId: string };
  const [verifyDetail, setVerifyDetail] = useState<OwnerProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { admin } = useSelector((state: RootState) => state.auth);
  const [employee, setEmployee] = useState<EmployeeProps | null>(null);

  useEffect(() => {
    if (!verifyId) return;

    setLoading(true);
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/workspace-owners/${verifyId}`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải thông tin xác thực.");
        }

        const data = await response.json();
        setVerifyDetail(data.owner);
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
  }, [verifyId]);

  useEffect(() => {
    if (!verifyDetail) {
      return;
    }

    if (!verifyDetail.userId) {
      return;
    }

    setLoading(true);
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/${verifyDetail.userId}`
        );

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
  }, [verifyDetail]);

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
      const response = await fetch(`${BASE_URL}/owners/${verifyId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          message: status === "Success" ? "Ok" : message,
          userId: admin?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải thông tin xác thực.");
      }

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      if (status === "Success") {
        setIsAccepted(false);
      } else {
        setIsRejected(false);
      }
      router.push("/verify-owner");
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
      router.push("/verify-owner");
    }
  };

  return (
    <>
      <div className="p-4 bg-card rounded-xl">
        <div className="flex flex-col gap-6 mt-10">
          <h1 className="text-xl font-bold text-center text-primary">
            Thông tin chi tiết doanh nghiệp
          </h1>
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => setIsAccepted(true)}
              className="px-4 py-2 rounded-lg border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300"
            >
              Chấp nhận
            </button>
            <button
              onClick={() => setIsRejected(true)}
              className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
            >
              Từ chối
            </button>
          </div>
          <Separator className="mb-4 dark:border-gray-700" />
          <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-card px-4">
              <User className="h-5 w-5 text-primary dark:text-primary-dark" />
              Thông tin chung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
              <p>
                <strong>Email:</strong> {verifyDetail?.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {verifyDetail?.phone}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {verifyDetail?.status === "Handling" ? (
                  <span className="text-yellow-500">Chờ xác thực</span>
                ) : (
                  <span className="text-red-500">Xác thực thất bại</span>
                )}
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {dayjs(verifyDetail?.updatedAt).format("HH:mm DD/MM/YYYY")}
              </p>
              {verifyDetail?.userId && (
                <p>
                  <span className="font-semibold">
                    ID nhân viên xử lý yêu cầu:{" "}
                  </span>
                  NV{Number(verifyDetail?.userId).toString().padStart(4, "0")}
                </p>
              )}
              {verifyDetail?.userId && (
                <p>
                  <span className="font-semibold">
                    Nhân viên xử lý yêu cầu:{" "}
                  </span>
                  {employee?.name}
                </p>
              )}
              {verifyDetail?.userId && (
                <p>
                  <span className="font-semibold">Tin nhắn: </span>
                  {verifyDetail?.message}
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
              <Link href={verifyDetail?.facebook || ""}>
                <strong>Facebook:</strong>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {verifyDetail?.facebook}
                </span>
              </Link>
              <Link href={verifyDetail?.instagram || ""}>
                <strong>Instagram:</strong>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {verifyDetail?.instagram}
                </span>
              </Link>
              <Link href={verifyDetail?.tiktok || ""}>
                <strong>Tiktok:</strong>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {verifyDetail?.tiktok}
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
                <strong>Họ và tên:</strong> {verifyDetail?.ownerName}
              </p>
              <p>
                <strong>Giới tính:</strong> {verifyDetail?.sex}
              </p>
              <p>
                <strong>Ngày đăng kí doanh nghiệp:</strong>{" "}
                {dayjs(verifyDetail?.registrationDate).format("DD/MM/YYYY")}
              </p>
              <p>
                <strong>Tên công ty:</strong> {verifyDetail?.licenseName}
              </p>
              <p>
                <strong>Số giấy phép:</strong> {verifyDetail?.licenseNumber}
              </p>
              <p className="md:col-span-2">
                <strong>Địa chỉ:</strong> {verifyDetail?.licenseAddress}
              </p>
              <p>
                <strong>Vốn điều lệ:</strong> {verifyDetail?.charterCapital}
              </p>
              <p>
                <strong>Tệp đính kèm:</strong>{" "}
                <a
                  href={verifyDetail?.licenseFile}
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
        open={isAccepted}
        onCancel={() => setIsAccepted(!isAccepted)}
        footer={[
          <button
            key="accept"
            disabled={isLoading}
            onClick={() => handleChangeStatus("Success")}
            className="px-4 py-2 rounded-lg border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300"
          >
            {isLoading ? (
              <LoadingOutlined style={{ color: "white" }} />
            ) : (
              <span>Xác nhận</span>
            )}
          </button>,
        ]}
      >
        <p className="text-gray-700 dark:text-black py-4">
          Bạn có đồng ý xác thực tài khoản doanh nghiệp này không?
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
            className={`px-4 py-2 rounded-lg border border-red-500 text-red-500 ${
              message === ""
                ? "cursor-not-allowed"
                : "hover:bg-red-500 hover:text-white transition-colors duration-300"
            } `}
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
          Bạn có muốn từ chối yêu cầu xác thực tài khoản doanh nghiệp này không?
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

export default VerifyOwnerDetail;
