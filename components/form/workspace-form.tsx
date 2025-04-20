"use client";

import { Info, SquarePen } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MultiText from "../custom-ui/multi-text";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { workspaceSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiImageUpload from "../custom-ui/multi-image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Checkbox } from "../ui/checkbox";
import { Workspace } from "@/types";

interface WorkspaceFormProps {
  initialData?: Workspace | null;
}

function WorkspaceForm({ initialData }: WorkspaceFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData ? initialData.imagesStr : []
  );

  console.log(selectedFiles);

  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          name: "",
          description: "",
          openTime: "",
          closeTime: "",
          code: "",
          is24h: 0,
          area: "",
          cleanTime: "",
          shortTermPrice: "",
          longTermPrice: "",
          imagesStr: existingImages,
          newImages: [],
          facilitiesStr: [],
          policiesStr: [],
          detailsStr: [],
          capacity: "",
          category: "Bàn cá nhân",
          status: "Active",
        },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-primary flex items-center gap-4 mt-4">
        <SquarePen />
        <span>Thông tin chi tiết không gian</span>
      </h1>
      <Separator className="mt-4 mb-8 bg-primary" />
      <Form {...form}>
        <form className="grid sm:grid-cols-3 gap-6">
          <div className="sm:col-span-3 items-start justify-between gap-6 grid sm:grid-cols-3">
            <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-base ml-6">
                        Tên không gian
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-6 px-4 rounded-md file:bg-seventh"
                          placeholder="Nhập tên không gian..."
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-2 my-1">
                <FormField
                  control={form.control}
                  name="is24h"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-6">
                      <FormLabel className="text-fourth font-bold text-base ml-6">
                        Mở cửa 24h
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          {...field}
                          checked={field.value === 1}
                          onCheckedChange={(value) => {
                            field.onChange(value ? 1 : 0);
                            if (value) {
                              form.setValue("openTime", "00:00:00");
                              form.setValue("closeTime", "23:59:00");
                            } else {
                              form.setValue("openTime", "");
                              form.setValue("closeTime", "");
                            }
                          }}
                          disabled
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-2 gap-6 grid sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <FormField
                    control={form.control}
                    name="openTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-fourth font-bold text-base ml-6">
                          Thời gian mở cửa
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="py-6 px-4 rounded-md file:bg-seventh"
                            placeholder="Nhập thời gian mở cửa..."
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
                    name="closeTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-fourth font-bold text-base ml-6">
                          Thời gian đóng cửa
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="py-6 px-4 rounded-md file:bg-seventh"
                            placeholder="Nhập thời gian đóng cửa..."
                            disabled
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-1 flex flex-col gap-6 h-full justify-center w-full p-4 border-2 border-primary rounded-md shadow-md">
              <Label className="text-fourth font-bold text-base ml-6">
                Giá tiền
              </Label>
              <FormField
                control={form.control}
                name="shortTermPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-bold text-sm">
                      1. Theo giờ (VND)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 px-4 rounded-md file:bg-fourth"
                        placeholder="Nhập giá theo giờ..."
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longTermPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-bold text-sm">
                      2. Theo ngày (VND)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 px-4 rounded-md file:bg-fourth"
                        placeholder="Nhập giá theo ngày..."
                        disabled
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Loại không gian
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "Văn phòng"}
                      onValueChange={(value) => field.onChange(value)}
                      disabled
                    >
                      <SelectTrigger className="py-6 px-4 rounded-md w-full">
                        <SelectValue placeholder="Chọn loại không gian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Bàn cá nhân"
                        >
                          Bàn cá nhân
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Văn phòng"
                        >
                          Văn phòng
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Phòng họp"
                        >
                          Phòng họp
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Phòng hội thảo"
                        >
                          Phòng hội thảo
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
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Diện tích (m²)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập diện tích..."
                      disabled
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
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Sức chứa tối đa (người)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập sức chứa tối đa..."
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Mô tả
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Mô tả..."
                      disabled
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
              name="cleanTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Thời gian dọn dẹp (phút)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập thời gian dọn dẹp..."
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="detailsStr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6 flex gap-4 items-center">
                    <span>Chi tiết không gian</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={20} className="text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white font-medium">
                            Enter để thêm
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Nhập chi tiết không gian - Enter để thêm mới..."
                      value={field.value}
                      handleChange={(tag) =>
                        field.onChange([...field.value, tag])
                      }
                      handleRemove={(tag) =>
                        field.onChange([
                          ...field.value.filter((item: string) => item !== tag),
                        ])
                      }
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Mã bàn (phút)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập mã bàn..."
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="facilitiesStr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6 flex gap-4 items-center">
                    <span>Cơ sở vật chất</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={20} className="text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white font-medium">
                            Enter để thêm
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Nhập cơ sở vật chất - Enter để thêm mới..."
                      value={field.value}
                      handleChange={(tag) =>
                        field.onChange([...field.value, tag])
                      }
                      handleRemove={(tag) =>
                        field.onChange([
                          ...field.value.filter((item: string) => item !== tag),
                        ])
                      }
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Trạng thái
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "Inactive"}
                      onValueChange={(value) => field.onChange(value)}
                      disabled
                    >
                      <SelectTrigger className="py-6 px-4 rounded-md w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Active"
                        >
                          Hoạt động
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Inactive"
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
          <div className="sm:col-span-2 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="policiesStr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6 flex gap-4 items-center">
                    <span>Quy định chung</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={20} className="text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white font-medium">
                            Enter để thêm
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Nhập quy định chung - Enter để thêm mới..."
                      value={field.value}
                      handleChange={(tag) =>
                        field.onChange([...field.value, tag])
                      }
                      handleRemove={(tag) =>
                        field.onChange([
                          ...field.value.filter((item: string) => item !== tag),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="imagesStr"
              render={() => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6 flex gap-4 items-center">
                    <span>Hình ảnh</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={20} className="text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white font-medium">
                            Có thể thêm nhiều hình ảnh
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <MultiImageUpload
                      existingImages={existingImages}
                      onExistingImagesChange={setExistingImages}
                      onNewImagesChange={setSelectedFiles}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default WorkspaceForm;
