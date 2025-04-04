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
import { OwnerProps } from "@/types";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";
import Link from "next/link";

function OwnerDropdown({
  owner,
  onStatusChange,
}: {
  owner: OwnerProps;
  onStatusChange: () => void;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!owner) return;
  }, [owner]);

  const handleBan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/owners/banowner/${owner.id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi chặn doanh nghiệp.");
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
          {owner.status === "Success" ||
            (owner.status === "Active" && (
              <li
                className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                onClick={handleBan}
              >
                <LockKeyhole size={16} /> <span>Chặn</span>
              </li>
            ))}
          {owner.status === "InActive" && (
            <li
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              onClick={handleUnban}
            >
              <LockKeyholeOpen size={16} /> <span>Mở chặn</span>
            </li>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default OwnerDropdown;
