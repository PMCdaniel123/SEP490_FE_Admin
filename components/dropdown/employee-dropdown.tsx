"use client";

import {
  Eye,
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { EmployeeProps } from "@/types";
import EmployeeModal from "../modal/employee-modal";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";

function EmployeeDropdown({
  employee,
  onStatusChange,
}: {
  employee: EmployeeProps;
  onStatusChange: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!employee) return;
  }, [employee]);

  const handleBan = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/users/banstaff/${employee.id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi chặn nhân viên.");
      }

      const data = await response.json();
      console.log(data);
      setLoading(false);
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
      setLoading(false);
    }
  };

  const handleUnban = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/users/unbanstaff/${employee.id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi mở chặn nhân viên.");
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
          {employee.isBan === 0 && (
            <li
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              onClick={handleBan}
            >
              <LockKeyhole size={16} /> <span>Chặn</span>
            </li>
          )}
          {employee.isBan === 1 && (
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
          <p className="text-xl font-bold text-primary">Thông tin nhân viên</p>
        }
        open={isOpen}
        onCancel={() => setIsOpen(!isOpen)}
        footer={null}
      >
        <EmployeeModal employee={employee} onStatusChange={onStatusChange} />
      </Modal>
    </>
  );
}

export default EmployeeDropdown;
