import dayjs from "dayjs";
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Tên người đăng nhập phải có ít nhất 3 ký tự"),
  email: z.string().email("Địa chỉ email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const phoneSchema = z.object({
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
});

export const emailSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
});

export const adminPhoneSchema = z.object({
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const adminEmailSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const passwordSchema = z.object({
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email("Địa chỉ email không hợp lệ"),
    token: z
      .string()
      .min(6, "Token phải có 6 ký tự")
      .max(6, "Token phải có 6 ký tự"),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu xác nhận phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới và xác nhận không khớp nhau",
    path: ["confirmPassword"],
  });

export const employeeSchema = z.object({
  name: z.string().min(3, "Tên không gian phải có ít nhất 3 ký tự"),
  sex: z.string({
    required_error: "Vui lòng chọn giới tính hợp lệ",
  }),
  roleId: z.string({
    required_error: "Vui lòng chọn chức vụ hợp lệ",
  }),
  email: z.string().email("Địa chỉ email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const identifySchema = z.object({
  name: z.string().min(3, "Họ và tên phải có ít nhất 3 ký tự"),
  number: z
    .string()
    .min(12, "Số căn cước công dân phải có 12 chữ số")
    .max(12, "Số căn cước công dân phải có 12 chữ số")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Số căn cước công dân phải có 12 chữ số",
    }),
  dateOfBirth: z.string().nonempty("Vui lòng chọn ngày sinh"),
  gender: z.string({
    required_error: "Vui lòng chọn giới tính hợp lệ",
  }),
  nationality: z.string().nonempty("Vui lòng nhập quốc tịch"),
  placeOfOrigin: z.string().nonempty("Vui lòng nhập quê quán"),
  placeOfResidence: z.string().nonempty("Vui lòng nhập nơi thường trú"),
  dateOfExpiry: z.string().nonempty("Vui lòng chọn ngày hết hạn"),
  dateOfCreation: z.string().nonempty("Vui lòng chọn ngày tạo cccd"),
  file: z.string().url("Vui lòng tải lên một file hợp lệ"),
});

export const socialSchema = z.object({
  facebook: z.string().url("Vui lòng nhập đường dẫn hợp lệ"),
  instagram: z.string().url("Vui lòng nhập đường dẫn hợp lệ"),
  twitter: z.string().url("Vui lòng nhập đường dẫn hợp lệ"),
  youtube: z.string().url("Vui lòng nhập đường dẫn hợp lệ"),
  other: z.string().url("Vui lòng nhập đường dẫn hợp lệ"),
});

export const licenseSchema = z.object({
  name: z.string().nonempty("Vui lòng nhập tên doanh nghiệp"),
  number: z.string().nonempty("Vui lòng nhập mã số doanh nghiệp"),
  address: z
    .string()
    .nonempty("Vui lòng nhập địa chỉ trụ sở chính của doanh nghiệp"),
  charterCapital: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Vốn tiền lệ phải lớn hơn 0",
    }),
  file: z.string().url("Vui lòng tải lên một file hợp lệ"),
});

export const workspaceSchema = z.object({
  name: z.string().min(3, "Tên không gian phải có ít nhất 3 ký tự"),
  openTime: z.string().nonempty("Vui lòng chọn thời gian mở cửa"),
  closeTime: z.string().nonempty("Vui lòng chọn thời gian đóng cửa"),
  is24h: z.number().min(0).max(1),
  category: z.string({
    required_error: "Vui lòng loại không gian hợp lệ",
  }),
  area: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Diện tích phải lớn hơn 0 m²",
  }),
  capacity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Sức chứa tối đa phải >= 1 người",
    }),
  cleanTime: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Thời gian dọn dẹp phải >= 1 phút",
    }),
  description: z.string().min(3, "Mô tả không gian phải có ít nhất 3 ký tự"),
  shortTermPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Giá theo giờ phải lớn hơn 0",
    }),
  longTermPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Giá theo ngày phải lớn hơn 0",
    }),
  facilitiesStr: z.array(z.string(), {
    required_error: "Vui lòng nhập ít nhất một tiện ích",
  }),
  policiesStr: z.array(z.string(), {
    required_error: "Vui lòng nhập ít nhất một chính sách",
  }),
  imagesStr: z.array(z.string(), {
    required_error: "Vui lòng tải lên ít nhất một hình ảnh",
  }),
  newImages: z.array(z.instanceof(File)).optional(),
  status: z.string({
    required_error: "Vui lòng chọn trạng thái hợp lệ",
  }),
});

const MIN_DATE = dayjs(new Date(1900, 0, 1));

export const employeeFormSchema = z.object({
  name: z.string().min(3, "Tên không gian phải có ít nhất 3 ký tự"),
  sex: z.string({
    required_error: "Vui lòng chọn giới tính hợp lệ",
  }),
  email: z.string().email("Địa chỉ email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
  avatar: z.union([z.string(), z.instanceof(File)]),
  location: z.string().min(3, "Địa chỉ phải có ít nhất 3 ký tự"),
  dateOfBirth: z
    .string()
    .refine((date) => dayjs(date, "DD/MM/YYYY", true).isValid(), {
      message: "Ngày sinh không hợp lệ, định dạng phải là DD/MM/YYYY",
    })
    .refine((date) => dayjs(date, "DD/MM/YYYY").isAfter(MIN_DATE), {
      message: "Sinh nhật phải lớn hơn 01/01/1900",
    }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Mật khẩu hiện tại là bắt buộc."),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự."),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu xác nhận phải có ít nhất 6 ký tự."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });
