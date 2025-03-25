/* eslint-disable @next/next/no-img-element */
"use client";

import { EmployeeProps } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { employeeFormSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LoadingOutlined } from "@ant-design/icons";
import { Save, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { BASE_URL } from "@/constants/environments";
import { Button, Upload as AntUpload } from "antd";
import ImgCrop from "antd-img-crop";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

interface ProfileFormProps {
  employee: EmployeeProps | null;
  isEdit: boolean;
}

function ProfileForm({ employee, isEdit }: ProfileFormProps) {
  const { admin } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
      avatar: employee?.avatar || "",
      location: employee?.location || "",
      dateOfBirth: employee?.dateOfBirth || "",
      sex: employee?.sex || "",
    },
  });

  const avatarValue = form.watch("avatar");

  const handleUpload = ({ file }: { file: File }) => {
    form.setValue("avatar", file);
  };

  useEffect(() => {
    form.reset({
      name: employee?.name || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
      avatar: employee?.avatar || "",
      location: employee?.location || "",
      dateOfBirth: employee?.dateOfBirth || "",
      sex: employee?.sex || "",
    });
    if (!isEdit) {
      form.setValue("avatar", employee?.avatar || "");
    }
  }, [form, employee, isEdit]);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/images/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
      }

      const result = await response.json();
      setLoading(false);
      return result.data[0];
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

  const onCreate = async (values: z.infer<typeof employeeFormSchema>) => {
    let imgUrl = values.avatar;
    setLoading(true);
    if (typeof imgUrl !== "string") {
      try {
        const uploadedUrl = await uploadImage(imgUrl);
        if (!uploadedUrl) {
          throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
        }
        imgUrl = uploadedUrl;
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
        return;
      }
    }

    const requestData = {
      userId: admin?.id,
      ...values,
      avatar: imgUrl,
    };

    try {
      const response = await fetch(`${BASE_URL}/users/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Có lỗi khi cập nhật hồ sơ.");
      }

      toast.success("Cập nhật hồ sơ thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          className="grid sm:grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(onCreate)}
        >
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Ảnh đại diện
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden border my-2 mr-2">
                        {avatarValue ? (
                          <img
                            src={
                              typeof avatarValue === "string"
                                ? avatarValue
                                : URL.createObjectURL(avatarValue)
                            }
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src="/logo.png"
                            alt="Default Avatar"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      {isEdit && (
                        <ImgCrop rotationSlider>
                          <AntUpload
                            showUploadList={false}
                            beforeUpload={(file) => {
                              handleUpload({ file });
                              return false;
                            }}
                          >
                            <Button icon={<Upload className="mr-2" />}>
                              Chọn ảnh
                            </Button>
                          </AntUpload>
                        </ImgCrop>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Họ và tên
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập họ và tên"
                      disabled={!isEdit}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1">
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Giới tính
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "Nữ"}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={!isEdit}
                    >
                      <SelectTrigger className="py-6 px-4 rounded-md w-full dark:bg-gray-800 dark:text-white dark:border-gray-700">
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Nam"
                        >
                          Nam
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Nữ"
                        >
                          Nữ
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Khác"
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
          <div className="sm:col-span-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập email"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Số điện thoại
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập số điện thoại"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Ngày sinh
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập ngày sinh"
                      disabled={!isEdit}
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Địa chỉ
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập địa chỉ"
                      disabled={!isEdit}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          {isEdit && (
            <div className="sm:col-span-2 flex flex-col gap-2 w-full">
              <button
                className="z-10 flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
                type="submit"
              >
                {loading ? (
                  <LoadingOutlined style={{ color: "white" }} />
                ) : (
                  <span className="font-bold flex items-center gap-2">
                    <Save size={18} /> Xác nhận
                  </span>
                )}
              </button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;
