"use client";

import {
  CustomerProps,
  EmployeeProps,
  formatCurrency,
  OwnerProps,
  TopWorkspace,
  VerifyProps,
  WithdrawalProps,
  Workspace,
} from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Ban, Eye, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

export const topWorkspaceTableColumns: ColumnDef<TopWorkspace>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer">
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Tổng lượt đặt</p>
          <ArrowUpDown className="ml-2 h-4 w-4 dark:text-gray-300" />
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Đơn giá</p>
          <ArrowUpDown className="ml-2 h-4 w-4 dark:text-gray-300" />
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Doanh thu</p>
          <ArrowUpDown className="ml-2 h-4 w-4 dark:text-gray-300" />
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Họ và tên</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số điện thoại</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Email</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("email")}</p>;
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày sinh</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("dateOfBirth")).format("DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    accessorKey: "sex",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Giới tính</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("sex")}</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <li
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              onClick={() => console.log(customer.id)}
            >
              <Eye size={16} /> <span>Xem thông tin</span>
            </li>
            <li className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer">
              <Ban size={16} /> <span>Chặn</span>
            </li>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const OwnerTableColumns: ColumnDef<OwnerProps>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Email</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số điện thoại</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("phone")}</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Xác thực</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Success" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Thành công</span>
        </p>
      ) : row.getValue("status") === "Fail" ? (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Thất bại</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-yellow-500">
          <span>Chưa xác thực</span>
        </p>
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
            <li
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              onClick={() => console.log(owner.id)}
            >
              <Eye size={16} /> <span>Xem thông tin</span>
            </li>
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Họ và tên</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <Image
            src={row.original.avatar}
            alt=""
            width={46}
            height={46}
            className="border rounded-full"
          />
          <div>
            <p className="font-medium text-base">{row.original.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số điện thoại</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Email</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("email")}</p>;
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày sinh</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("dateOfBirth")}</p>
      );
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Giới tính</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("gender")}</p>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Chức vụ</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("role") === "1" ? (
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
              href={`employees/${employee.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin</span>
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

const workspaceCategory: Record<string, string> = {
  "Bàn cá nhân": "Bàn cá nhân",
  "Văn phòng": "Văn phòng",
  "Phòng họp": "Phòng họp",
  "Phòng hội thảo": "Phòng hội thảo",
};

export const WorkspaceTableColumns: ColumnDef<Workspace>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên không gian</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      <div className="text-black dark:text-white  font-semibold text-base text-center">
        Hình ảnh
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={row.original.images[0].imgUrl}
            alt={row.original.name}
            width={100}
            height={100}
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  { accessorKey: "longTermPrice", header: () => <p></p>, cell: () => <p></p> },
  {
    accessorKey: "shortTermPrice",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white  font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Đơn giá</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("shortTermPrice")))} -{" "}
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Loại không gian</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: "capacity",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Sức chứa</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {row.getValue("capacity")} người
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Diện tích</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("area")} m²</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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

export const VerifyTableColumns: ColumnDef<VerifyProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Họ và tên</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <div>
            <p className="font-medium text-base">{row.original.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số điện thoại</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Email</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("email")}</p>;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Địa chỉ</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("location")}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center gap-2 cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColor =
        status === "Đang chờ"
          ? "text-yellow-500"
          : status === "Đã xác minh"
          ? "text-green-500"
          : "text-red-500";
      return (
        <p className={`text-center font-medium ${statusColor}`}>
          {status as string}
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("createdAt")}</p>
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
            <li className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer">
              <Ban size={16} /> <span>Chặn</span>
            </li>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const WithdrawalRequestTableColumns: ColumnDef<WithdrawalProps>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          Số tài khoản
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("number")}</p>
      );
    },
  },
  {
    accessorKey: "bank",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          Ngân hàng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("bank")}</p>;
    },
  },
  {
    accessorKey: "money",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          Số tiền
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("money")))}
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
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("createdAt")}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black dark:text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColor =
        status === "1"
          ? "text-yellow-500"
          : status === "2"
          ? "text-green-500"
          : "text-red-500";
      const statusText =
        status === "1"
          ? "Đang chờ"
          : status === "2"
          ? "Đã duyệt"
          : "Đã từ chối";
      return (
        <p className={`text-center font-medium ${statusColor}`}>{statusText}</p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const withdrawal = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = `/withdrawal-request/${withdrawal.id}`)
              }
            >
              Xem chi tiết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
