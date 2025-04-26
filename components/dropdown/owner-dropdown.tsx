import {
  Eye,
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  TriangleAlert,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { OwnerProps } from "@/types";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

function OwnerDropdown({
  owner,
  onStatusChange,
}: {
  owner: OwnerProps;
  onStatusChange: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { admin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;
  }, [owner]);

  const handleBan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/owners/banowner/${owner.id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi chặn doanh nghiệp.");
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
        `${BASE_URL}/owners/unbanowner/${owner.id}`,
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
      onStatusChange();
      toast.success("Mở chặn thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
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

  if (loading) return;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="py-2">
          <Link
            className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
            href={`owners/${owner.id}`}
          >
            <Eye size={16} /> <span>Xem thông tin chi tiết</span>
          </Link>
          {Number(admin?.role || "0") === 1 &&
            (owner.status === "Success" || owner.status === "Active") && (
              <li
                className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <LockKeyhole size={16} /> <span>Chặn</span>
              </li>
            )}
          {Number(admin?.role || "0") === 1 && owner.status === "Fail" && (
            <li
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              onClick={handleUnban}
            >
              <LockKeyholeOpen size={16} /> <span>Mở chặn</span>
            </li>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

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
            className={`px-4 py-2 rounded-md border border-red-500 text-red-500`}
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

export default OwnerDropdown;
