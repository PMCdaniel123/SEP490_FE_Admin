"use client";

import {
  CustomerProps,
  EmployeeProps,
  formatCurrency,
  OwnerProps,
  TopWorkspace,
  WithdrawalRequestProps,
  Workspace,
} from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Ban, Eye, MoreHorizontal } from "lucide-react";

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

export const topWorkspaceTableColumns: ColumnDef<TopWorkspace>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer">
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
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
export const CustomerTableColumns: ColumnDef<CustomerProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
      const customer = row.original;

      return <CustomerDropdown customer={customer} />;
    },
  },
];

export const OwnerTableColumns: ColumnDef<OwnerProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
    accessorKey: "identityName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Chủ sở hữu</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {row.getValue("identityName")}
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
          className="text-white dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
    id: "actions",
    cell: ({ row }) => {
      const owner = row.original;

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
              href={`owners/${owner.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
            <li className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer">
              <Ban size={16} /> <span>Chặn</span>
            </li>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const EmployeeTableColumns: ColumnDef<EmployeeProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
    accessorKey: "sex",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Giới tính</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("sex")}</p>;
    },
  },
  {
    accessorKey: "roleName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
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
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      return <EmployeeDropdown employee={employee} />;
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
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã không gian</p>
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
          className="text-white dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
      <div className="text-white dark:text-white  font-semibold text-base text-center">
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
    accessorKey: "shortTermPrice",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Giá giờ</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("shortTermPrice")))}
        </p>
      );
    },
  },
  {
    accessorKey: "longTermPrice",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Giá ngày</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("longTermPrice")))}
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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

export const VerifyTableColumns: ColumnDef<OwnerProps>[] = [
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo yêu cầu</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("updatedAt")).format("HH:mm DD/MM/YYYY")}
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
          className="text-white dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
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

export const WithdrawalTableColumns: ColumnDef<WithdrawalRequestProps>[] = [
  {
    accessorKey: "bankNumber",
    header: () => {
      return (
        <div className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer">
          <p>Số tài khoản ngân hàng</p>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("bankNumber")}</p>
      );
    },
  },
  {
    accessorKey: "bankName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên ngân hàng</p>
          <ArrowUpDown size={16} className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("bankName")}</p>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
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
              href={`/withdrawal-request/${request.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
