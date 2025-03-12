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

export const passwordSchema = z.object({
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const employeeSchema = z.object({
  name: z.string().min(3, "Tên không gian phải có ít nhất 3 ký tự"),
  dateOfBirth: z.string().nonempty("Vui lòng chọn ngày sinh"),
  avatar: z.string().nonempty("Vui lòng chọn avatar"),
  gender: z.string({
    required_error: "Vui lòng chọn giới tính hợp lệ",
  }),
  location: z.string().min(3, "Địa chỉ không gian phải có ít nhất 3 ký tự"),
  status: z.string({
    required_error: "Vui lòng chọn trạng thái hợp lệ",
  }),
  role: z.string({
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
