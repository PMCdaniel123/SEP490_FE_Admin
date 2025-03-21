"use client";

import { EmployeeProps } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/zod/schema";
import { useEffect } from "react";
import { Save, SquarePen } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import ImageUpload from "../custom-ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EmployeeFormProps {
  initialData?: EmployeeProps | null;
}

function EmployeeForm({ initialData }: EmployeeFormProps) {
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          name: "",
          avatar: "",
          location: "",
          email: "",
          phone: "",
          password: "",
          dateOfBirth: "",
          role: "1",
          gender: "1",
          status: "1",
        },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onCreate = (values: z.infer<typeof employeeSchema>) => {
    alert(JSON.stringify(values));
  };
  return (
    <div className="flex flex-col bg-card">
      <h1 className="text-xl font-bold text-primary flex items-center gap-4 mt-4">
        <SquarePen />
        {initialData ? (
          <span>Chỉnh sửa nhân viên</span>
        ) : (
          <span>Tạo mới nhân viên</span>
        )}
      </h1>
      <Separator className="mt-4 mb-8 bg-primary" />
      <Form {...form}>
        <form
          className="grid sm:grid-cols-3 gap-6 "
          onSubmit={form.handleSubmit(onCreate)}
        >
          <div className="sm:col-span-3 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                    Họ và tên
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      placeholder="Nhập họ và tên..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-3 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                    Địa chỉ
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      placeholder="Nhập địa chỉ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-3 items-start justify-between gap-6 grid sm:grid-cols-3">
            <div className="sm:col-span-1 flex flex-col gap-2 w-full">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                      Ngày bắt đầu
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 px-4 rounded-md file:bg-seventh dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        placeholder="Nhập ngày bắt đầu..."
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      type="email"
                      placeholder="Nhập email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                    Số điện thoại
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      placeholder="Nhập số điện thoại..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      placeholder="Nhập mật khẩu..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-3 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                    Hình ảnh
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      handleChange={(image) => field.onChange(image)}
                      handleRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                    Giới tính
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "2"}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="py-6 px-4 rounded-md w-full dark:bg-gray-800 dark:text-white dark:border-gray-700">
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="1"
                        >
                          Nam
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="2"
                        >
                          Nữ
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="3"
                        >
                          Khác
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300
 font-bold text-base ml-6">
                    Chức vụ
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "2"}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="py-6 px-4 rounded-md w-full dark:bg-gray-800 dark:text-white dark:border-gray-700">
                        <SelectValue placeholder="Chọn chức vụ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="1"
                        >
                          Quản lý
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="2"
                        >
                          Nhân viên
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth dark:text-gray-300 font-bold text-base ml-6">
                    Trạng thái
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "2"}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="py-6 px-4 rounded-md w-full dark:bg-gray-800 dark:text-white dark:border-gray-700 ">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="1"
                        >
                          Hoạt động
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="2"
                        >
                          Ngừng hoạt động
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-3 flex flex-col gap-2 w-full">
            <button
              className="z-10 flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
              type="submit"
            >
              <Save size={18} /> <span className="font-bold">Xác nhận</span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EmployeeForm;
