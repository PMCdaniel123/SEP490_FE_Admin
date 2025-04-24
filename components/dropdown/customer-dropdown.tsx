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
import { Modal } from "antd";
import { CustomerProps } from "@/types";
import CustomerModal from "../modal/customer-modal";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

function CustomerDropdown({
  customer,
  onStatusChange,
}: {
  customer: CustomerProps;
  onStatusChange: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { admin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!customer) return;
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

  const handleViewDetail = () => {
    setDropdownOpen(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="py-2">
          <li
            className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
            onClick={handleViewDetail}
          >
            <Eye size={16} /> <span>Xem thông tin chi tiết</span>
          </li>
          {Number(admin?.id || "0") === 1 && customer.isBan === 0 && (
            <li
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <LockKeyhole size={16} /> <span>Chặn</span>
            </li>
          )}
          {Number(admin?.id || "0") === 1 && customer.isBan === 1 && (
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
          <p className="text-xl font-bold text-primary">Thông tin khách hàng</p>
        }
        open={isOpen}
        onCancel={() => setIsOpen(!isOpen)}
        footer={null}
      >
        <CustomerModal customer={customer} onStatusChange={onStatusChange} />
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

export default CustomerDropdown;
