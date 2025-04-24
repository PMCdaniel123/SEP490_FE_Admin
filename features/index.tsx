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
  setCustomerList: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
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
  } finally {
    setLoading(false);
  }
};

export const fetchEmployeeList = async (
  setEmployeeList: React.Dispatch<React.SetStateAction<EmployeeProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
    setLoading(false);
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
    setLoading(false);
  }
};

export const fetchOwnerList = async (
  setOwnerList: React.Dispatch<React.SetStateAction<OwnerProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
    setLoading(false);
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
    setLoading(false);
  }
};

export const fetchWorkspaceList = async (
  setWorkspaceList: React.Dispatch<React.SetStateAction<Workspace[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
    setLoading(false);
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
    setLoading(false);
  }
};

export const fetchOwnerRevenueList = async (
  setOwnerRevenueList: React.Dispatch<React.SetStateAction<OwnerRevenue[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
    setLoading(false);
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
    setLoading(false);
  }
};

export const fetchHighRatingWorkspaceList = async (
  setHighRatingWorkspaceList: React.Dispatch<
    React.SetStateAction<HighRatingWorkspace[]>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
    setLoading(false);
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
    setLoading(false);
  }
};

export const fetchSystemRevenueList = async (
  setSystemRevenueList: React.Dispatch<
    React.SetStateAction<SystemRevenueProps[]>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
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
              dayjs(b.dateOfBooking).unix() - dayjs(a.dateOfBooking).unix()
          );
    setSystemRevenueList(formatted);
    setLoading(false);
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
    setLoading(false);
  }
};
