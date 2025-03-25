"use client";

import ProfileForm from "@/components/form/profile-form";
import Loader from "@/components/loader/Loader";
import { BASE_URL } from "@/constants/environments";
import { RootState } from "@/stores";
import { EmployeeProps } from "@/types";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProfilePage() {
  const { admin } = useSelector((state: RootState) => state.auth);
  const [employeeDetail, setEmployeeDetail] = useState<EmployeeProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!admin) return;
    const getEmployeeDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${admin.id}`);

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải thông tin nhân viên.");
        }

        const data = await response.json();
        setEmployeeDetail(data.user);
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
        setLoading(false);
      }
    };
    getEmployeeDetail();
  }, [admin]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  console.log(employeeDetail);

  return (
    <div className="p-4 bg-card rounded-xl">
      <h1 className="text-xl font-bold text-center text-primary mt-10 flex items-center gap-2">
        <User /> Thông tin nhân viên
      </h1>
      <div className="flex justify-end mb-4">
        {!isEdit && (
          <button
            className="rounded-lg text-white font-medium px-4 py-2 bg-primary hover:bg-secondary transition-colors duration-300"
            onClick={() => setIsEdit(true)}
          >
            Sửa thông tin
          </button>
        )}
        {isEdit && (
          <button
            className="rounded-lg text-white font-medium px-4 py-2 bg-red-500 hover:bg-red-200 transition-colors duration-300"
            onClick={() => setIsEdit(false)}
          >
            Hủy
          </button>
        )}
      </div>
      <div className="p-4 border rounded-xl">
        <ProfileForm employee={employeeDetail} isEdit={isEdit} />
      </div>
    </div>
  );
}

export default ProfilePage;
