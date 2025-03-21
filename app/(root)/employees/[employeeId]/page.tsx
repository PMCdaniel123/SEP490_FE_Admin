"use client";

import EmployeeForm from "@/components/admin-form/employee-form";
import { employeeList } from "@/constants/constant";
import { EmployeeProps } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function EmployeeDetail() {
  const { employeeId } = useParams() as { employeeId: string };
  const [employeeDetail, setEmployeeDetail] = useState<EmployeeProps | null>(
    null
  );

  useEffect(() => {
    if (employeeId) {
      setEmployeeDetail(employeeList[Number.parseInt(employeeId) - 1]);
    }
  }, [employeeId]);

  return (
    <div className="p-4 bg-card rounded-xl ">
      <EmployeeForm initialData={employeeDetail} />
    </div>
  );
}

export default EmployeeDetail;
