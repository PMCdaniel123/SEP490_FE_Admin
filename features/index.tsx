import { BASE_URL } from "@/constants/environments";
import {
  CustomerProps,
  EmployeeProps,
  HighRatingWorkspace,
  OwnerProps,
  OwnerRevenue,
  SystemRevenueProps,
  Workspace,
} from "@/types";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const fetchCustomerList = async (
  setCustomerList: React.Dispatch<React.SetStateAction<CustomerProps[]>>
) => {
  try {
    const response = await fetch(`${BASE_URL}/users/customers`);
    if (!response.ok)
      throw new Error("Có lỗi xảy ra khi tải danh sách khách hàng.");

    const data = await response.json();
    const formatted =
      data.customers === null || data.customers === undefined
        ? []
        : data.customers;
    setCustomerList(formatted);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setCustomerList([]);
  }
};

export const fetchEmployeeList = async (
  setEmployeeList: React.Dispatch<React.SetStateAction<EmployeeProps[]>>
) => {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách nhân viên.");
    }
    const data = await response.json();
    const formatted =
      data.users === null || data.users === undefined ? [] : data.users;
    setEmployeeList(formatted);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đã xảy ra lỗi!";
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setEmployeeList([]);
  }
};

export const fetchOwnerList = async (
  setOwnerList: React.Dispatch<React.SetStateAction<OwnerProps[]>>
) => {
  try {
    const response = await fetch(`${BASE_URL}/workspace-owners`);

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách doanh nghiệp.");
    }
    const data = await response.json();
    const formatted = Array.isArray(data.owners)
      ? data.owners
          .filter(
            (owner: OwnerProps) =>
              owner.status === "Success" ||
              owner.status === "InActive" ||
              owner.status === "Active"
          )
          .sort(
            (a: OwnerProps, b: OwnerProps) =>
              dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
          )
      : [];
    setOwnerList(formatted);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đã xảy ra lỗi!";
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setOwnerList([]);
  }
};

export const fetchWorkspaceList = async (
  setWorkspaceList: React.Dispatch<React.SetStateAction<Workspace[]>>
) => {
  try {
    const response = await fetch(`${BASE_URL}/workspaces`);

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách không gian.");
    }
    const data = await response.json();
    const formatted = data.workspaces.map((workspace: Workspace) => ({
      ...workspace,
      shortTermPrice:
        workspace.prices.find((price) => price.category === "Giờ")?.price || 0,
      longTermPrice:
        workspace.prices.find((price) => price.category === "Ngày")?.price || 0,
    }));
    setWorkspaceList(formatted);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đã xảy ra lỗi!";
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setWorkspaceList([]);
  }
};

export const fetchOwnerRevenueList = async (
  setOwnerRevenueList: React.Dispatch<React.SetStateAction<OwnerRevenue[]>>
) => {
  try {
    const response = await fetch(`${BASE_URL}/owners/revenue`);

    if (!response.ok) {
      throw new Error(
        "Có lỗi xảy ra khi tải danh sách doanh thu của doanh nghiệp."
      );
    }
    const data = await response.json();
    const formatted = data === null || data === undefined ? [] : data;
    setOwnerRevenueList(formatted);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đã xảy ra lỗi!";
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setOwnerRevenueList([]);
  }
};

export const fetchHighRatingWorkspaceList = async (
  setHighRatingWorkspaceList: React.Dispatch<
    React.SetStateAction<HighRatingWorkspace[]>
  >
) => {
  try {
    const response = await fetch(`${BASE_URL}/users/searchbyrate`);

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách không gian.");
    }
    const data = await response.json();
    const formatted =
      data.workspaces === null || data.workspaces === undefined
        ? []
        : data.workspaces
            .slice(0, 5)
            .sort(
              (a: HighRatingWorkspace, b: HighRatingWorkspace) =>
                b.rate - a.rate
            );
    setHighRatingWorkspaceList(formatted);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đã xảy ra lỗi!";
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setHighRatingWorkspaceList([]);
  }
};

export const fetchSystemRevenueList = async (
  setSystemRevenueList: React.Dispatch<
    React.SetStateAction<SystemRevenueProps[]>
  >,
  adminId: string | null
) => {
  try {
    const response = await fetch(`${BASE_URL}/getrevenueforadmin/${adminId}`);

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách không gian.");
    }
    const data = await response.json();
    const formatted =
      data.bookingInformation === null || data.bookingInformation === undefined
        ? []
        : data.bookingInformation.sort(
            (a: SystemRevenueProps, b: SystemRevenueProps) =>
              dayjs(a.dateOfBooking).unix() - dayjs(b.dateOfBooking).unix()
          );
    setSystemRevenueList(formatted);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Đã xảy ra lỗi!";
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setSystemRevenueList([]);
  }
};
