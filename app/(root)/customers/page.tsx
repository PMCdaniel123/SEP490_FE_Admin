"use client";

import Loader from "@/components/loader/Loader";
import CustomerTable from "@/components/table/customer-table";
import { CustomerTableColumns } from "@/constants/table-columns";
import { CustomerProps } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CustomerManagement() {
  const [customerList, setCustomerList] = useState<CustomerProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await fetch("https://localhost:5050/users/customers");

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách khách hàng.");
        }
        const data = await response.json();
        const formatted = data.customers;
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
    <div className="p-4 bg-card rounded-xl">
      <CustomerTable columns={CustomerTableColumns} data={customerList} />
    </div>
  );
}

export default CustomerManagement;
