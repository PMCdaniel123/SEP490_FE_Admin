"use client";

import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminEmailSchema } from "@/lib/zod/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { AdminEmailSignInProps } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { login } from "@/stores/slices/authSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { BASE_URL } from "@/constants/environments";
import Cookies from "js-cookie";

interface EmailSignInFormProps {
  initialData?: AdminEmailSignInProps | null;
}

function EmailSignInForm({ initialData }: EmailSignInFormProps) {
  const form = useForm<z.infer<typeof adminEmailSchema>>({
    resolver: zodResolver(adminEmailSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          email: "",
          password: "",
        },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSignIn = async (values: z.infer<typeof adminEmailSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại! Vui lòng kiểm tra lại.");
      }

      const result = await response.json();
      const token = result.token;

      if (token === "") {
        throw new Error(result.notification);
      }

      try {
        const decodeResponse = await fetch(`${BASE_URL}/users/decodejwttoken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: token,
          }),
        });

        if (!decodeResponse.ok) {
          throw new Error("Đăng nhập thất bại! Vui lòng kiểm tra lại.");
        }

        const decoded = await decodeResponse.json();

        if (
          decoded.claims.RoleId !== "1" &&
          decoded.claims.RoleId !== "2" &&
          decoded.claims.RoleId !== "3"
        ) {
          throw new Error("Không có quyền truy cập!");
        }

        const adminData = {
          id: decoded.claims.sub,
          email: decoded.claims.email,
          phone: decoded.claims.Phone,
          name: decoded.claims.name,
          avatar: decoded.avatarUrl,
          role: decoded.claims.RoleId,
        };
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });

        dispatch(login(adminData));
        Cookies.set("admin_token", token);
        setIsLoading(false);
        const redirect_url =
          adminData.role === "1"
            ? "/dashboard"
            : adminData.role === "2"
            ? "/withdrawal-request/owners"
            : "/verify-owner";
        router.push(redirect_url);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-8">
      <Form {...form}>
        <form
          className="grid sm:grid-cols-3 gap-6"
          onSubmit={form.handleSubmit(onSignIn)}
        >
          <div className="sm:col-span-3 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fifth font-medium text-sm ml-6">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-black py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập email..."
                      type="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-fifth font-medium text-sm ml-6">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-black py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập mật khẩu..."
                      type="password"
                      {...field}
                    />
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
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingOutlined style={{ color: "white" }} />
              ) : (
                <span className="font-semibold">Đăng nhập</span>
              )}
            </button>
            <div className="flex items-center justify-end mt-2">
              <p
                className="text-fifth font-medium text-sm cursor-pointer hover:text-fourth"
                onClick={() => router.push("/forgot_password")}
              >
                Quên mật khẩu?
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EmailSignInForm;
