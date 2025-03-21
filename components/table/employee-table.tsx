"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Separator } from "../ui/separator";
import { CirclePlus, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function EmployeeTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-bold text-primary dark:text-primary-dark text-xl">
          Danh sách nhân viên
        </h1>
        <Button
          className="flex items-center gap-2 text-white dark:bg-gray-800 dark:text-white dark:border-gray-700 font-semibold"
          onClick={() => router.push("employees/new")}
        >
          <CirclePlus />
          <span>Tạo nhân viên mới</span>
        </Button>
      </div>
      <Separator className="mb-4 dark:border-gray-700" />
      <div className="flex items-center">
        <Input
          placeholder="Tên nhân viên..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <Info />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize dark:hover:bg-gray-700"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader className="dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="dark:border-gray-700">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-4 dark:text-gray-300">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="dark:bg-gray-900">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="dark:text-gray-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="dark:border-gray-700">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center dark:text-gray-300"
                >
                  Không tìm thấy kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
        >
          Trước
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
        >
          Kế tiếp
        </Button>
      </div>
    </div>
  );
}