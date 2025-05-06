"use client";

import {
  CustomerProps,
  EmployeeProps,
  formatCurrency,
  HighRatingWorkspace,
  OwnerProps,
  TopWorkspace,
  VerifyOwnerProps,
  OwnerWithdrawalProps,
  Workspace,
  CustomerWithdrawalProps,
  SystemRevenueProps,
} from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Star } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import CustomerDropdown from "@/components/dropdown/customer-dropdown";
import EmployeeDropdown from "@/components/dropdown/employee-dropdown";
import OwnerDropdown from "@/components/dropdown/owner-dropdown";

export const topWorkspaceTableColumns: ColumnDef<TopWorkspace>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer">
        Tên không gian
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={row.original.image}
            alt=""
            width={50}
            height={50}
            className="border rounded-full dark:border-gray-700"
          />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base dark:text-gray-300">
              {row.original.title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {row.original.roomType}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "booking",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Tổng lượt đặt</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4 dark:text-gray-300" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium dark:text-gray-300">
          {row.getValue("booking")}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Đơn giá</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4 dark:text-gray-300" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium dark:text-gray-300">
          {row.getValue("price")}
        </p>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Doanh thu</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4 dark:text-gray-300" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium dark:text-gray-300">
          {row.getValue("amount")}
        </p>
      );
    },
  },
];
export const CustomerTableColumns = (
  onStatusChange: () => void
): ColumnDef<CustomerProps>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã khách hàng</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          KH{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Họ và tên</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("name")}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số điện thoại</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("phone")}</p>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Email</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("email")}</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const customer = row.original;

      return customer.isBan === 1 ? (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Bị chặn</span>
        </p>
      ) : row.getValue("status") === "Active" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Hoạt động</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Ngừng hoạt động</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <CustomerDropdown customer={customer} onStatusChange={onStatusChange} />
      );
    },
  },
];

export const OwnerTableColumns = (
  onStatusChange: () => void
): ColumnDef<OwnerProps>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã doanh nghiệp</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          DN{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Email</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("email")}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số điện thoại</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("phone")}</p>;
    },
  },
  {
    accessorKey: "licenseName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên doanh nghiệp</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("licenseName")}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Fail" ? (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Bị chặn</span>
        </p>
      ) : row.getValue("status") === "Success" ||
        row.getValue("status") === "Active" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Hoạt động</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-yellow-500">
          <span>Chưa hoạt động</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const owner = row.original;

      return <OwnerDropdown owner={owner} onStatusChange={onStatusChange} />;
    },
  },
];

export const EmployeeTableColumns = (
  onStatusChange: () => void
): ColumnDef<EmployeeProps>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã nhân viên</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          NV{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Họ và tên</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("name")}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số điện thoại</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("phone")}</p>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Email</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("email")}</p>;
    },
  },
  {
    accessorKey: "roleName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Chức vụ</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("roleName") === "Manager" ? (
        <p className="text-center font-medium flex items-center justify-center text-blue-500">
          <span>Quản lý</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-yellow-500">
          <span>Nhân viên</span>
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const employee = row.original;

      return employee.isBan === 1 ? (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Bị chặn</span>
        </p>
      ) : row.getValue("status") === "Active" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Hoạt động</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Ngừng hoạt động</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <EmployeeDropdown employee={employee} onStatusChange={onStatusChange} />
      );
    },
  },
];

const workspaceCategory: Record<string, string> = {
  "Bàn cá nhân": "Bàn cá nhân",
  "Văn phòng": "Văn phòng",
  "Phòng họp": "Phòng họp",
  "Phòng hội thảo": "Phòng hội thảo",
};

export const WorkspaceTableColumns: ColumnDef<Workspace>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã không gian</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          WS{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên không gian</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("name")}</p>;
    },
  },
  {
    accessorKey: "image",
    header: () => (
      <div className="text-white dark:text-white  font-semibold text-sm text-center">
        Hình ảnh
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={row.original.images[0].imgUrl}
            alt={row.original.name}
            width={80}
            height={80}
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "ownerId",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã doanh nghiệp</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          DN{Number(row.getValue("ownerId")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Phân loại</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {workspaceCategory[String(row.getValue("category"))] ||
            "Không xác định"}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Active" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Hoạt động</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Ngừng hoạt động</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workspace = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <Link
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              href={`workspaces/${workspace.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const HighRateWorkspaceTableColumns: ColumnDef<HighRatingWorkspace>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã không gian</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          WS{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số sao</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium flex items-center gap-1 justify-center">
          {row.getValue("rate")} <Star size={16} stroke={"0"} fill="#f59e0b" />
        </p>
      );
    },
  },
  {
    accessorKey: "image",
    header: () => (
      <div className="text-white dark:text-white font-semibold text-sm text-center">
        Hình ảnh
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={row.original.images[0].imgUrl}
            alt={row.original.name}
            width={80}
            height={80}
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Phân loại</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {workspaceCategory[String(row.getValue("category"))] ||
            "Không xác định"}
        </p>
      );
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Diện tích</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {row.getValue("area")} m<sup>2</sup>
        </p>
      );
    },
  },
];

export const VerifyTableColumns: ColumnDef<VerifyOwnerProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã yêu cầu</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          YCXT{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "ownerId",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã doanh nghiệp</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          DN{Number(row.getValue("ownerId")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "licenseName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên doanh nghiệp</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("licenseName")}</p>
      );
    },
  },
  {
    accessorKey: "licenseNumber",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số giấy phép</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {row.getValue("licenseNumber")}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("createdAt")).format("HH:mm DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-sm text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      return status === "Handling" ? (
        <p className={`text-center font-medium text-yellow-500`}>
          Chờ xác thực
        </p>
      ) : status === "Success" ? (
        <p className={`text-center font-medium text-green-500`}>
          Xác thực thành công
        </p>
      ) : (
        <p className={`text-center font-medium text-red-500`}>
          Xác thực thất bại
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const verify = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <Link
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              href={`/verify-owner/${verify.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const OwnerWithdrawalTableColumns: ColumnDef<OwnerWithdrawalProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã yêu cầu</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          YCRT{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "workspaceOwnerId",
    header: () => {
      return (
        <div className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer">
          <p>Mã doanh nghiệp</p>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          DN
          {Number(row.getValue("workspaceOwnerId")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số tiền</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("balance")))}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("createdAt")).format("HH:mm:ss DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Handling" ? (
        <p className="text-center font-medium flex items-center justify-center text-yellow-500">
          <span>Chờ xử lý</span>
        </p>
      ) : row.getValue("status") === "Success" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Thành công</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Thất bại</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <Link
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              href={`/withdrawal-request/owners/${request.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const CustomerWithdrawalTableColumns: ColumnDef<CustomerWithdrawalProps>[] =
  [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
          >
            <p>Mã yêu cầu</p>
            <ArrowUpDown size={16} className="ml-2" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="text-center font-medium">
            YCRT{Number(row.getValue("id")).toString().padStart(4, "0")}
          </p>
        );
      },
    },
    {
      accessorKey: "customerId",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
          >
            <p>Mã khách hàng</p>
            <ArrowUpDown size={16} className="ml-2" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="text-center font-medium">
            KH{Number(row.getValue("customerId")).toString().padStart(4, "0")}
          </p>
        );
      },
    },
    {
      accessorKey: "balance",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
          >
            <p>Số tiền</p>
            <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="text-center font-medium">
            {formatCurrency(Number(row.getValue("balance")))}
          </p>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
          >
            <p>Ngày tạo</p>
            <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="text-center font-medium">
            {dayjs(row.getValue("createdAt")).format("HH:mm:ss DD/MM/YYYY")}
          </p>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
          >
            <p>Trạng thái</p>
            <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return row.getValue("status") === "Handling" ? (
          <p className="text-center font-medium flex items-center justify-center text-yellow-500">
            <span>Chờ xử lý</span>
          </p>
        ) : row.getValue("status") === "Success" ? (
          <p className="text-center font-medium flex items-center justify-center text-green-500">
            <span>Thành công</span>
          </p>
        ) : (
          <p className="text-center font-medium flex items-center justify-center text-red-500">
            <span>Thất bại</span>
          </p>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const request = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="py-2">
              <Link
                className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                href={`/withdrawal-request/customers/${request.id}`}
              >
                <Eye size={16} /> <span>Xem thông tin chi tiết</span>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
export const SystemRevenueTableColumns: ColumnDef<SystemRevenueProps>[] = [
  {
    accessorKey: "bookingId",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã đặt chỗ</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          ĐC{Number(row.getValue("bookingId")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "ownerName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên doanh nghiệp</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("ownerName")}</p>
      );
    },
  },
  {
    accessorKey: "workspaceName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên không gian</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {row.getValue("workspaceName")}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Giá trị đơn</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("price")))}
        </p>
      );
    },
  },
  {
    accessorKey: "system_price",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Phí hệ thống (10%)</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium text-red-500">
          {formatCurrency((Number(row.getValue("price")) * 10) / 100)}
        </p>
      );
    },
  },
  {
    accessorKey: "dateOfBooking",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-sm text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo đơn</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("dateOfBooking")).format("HH:mm:ss DD/MM/YYYY")}
        </p>
      );
    },
  },
];
