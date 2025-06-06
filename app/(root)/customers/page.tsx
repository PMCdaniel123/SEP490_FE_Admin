"use client";

import Loader from "@/components/loader/Loader";
import CustomerTable from "@/components/table/customer-table";
import { BASE_URL } from "@/constants/environments";
import { CustomerTableColumns } from "@/constants/table-columns";
import { CustomerProps } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CustomerManagement() {
  const [customerList, setCustomerList] = useState<CustomerProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomerList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/customers`);

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải danh sách khách hàng.");
      }
      const data = await response.json();
      const formatted =
        data.customers === null || data.customers === undefined
          ? []
          : data.customers;
      setCustomerList(formatted);
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
      setCustomerList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-card rounded-md">
      <CustomerTable
        columns={CustomerTableColumns(fetchCustomerList)}
        data={customerList}
      />
    </div>
  );
}

export default CustomerManagement;
