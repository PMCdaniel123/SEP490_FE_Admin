"use client";

import VerifyTable from "@/components/table/verify-table";
import { verifyList } from "@/constants/constant";
import { VerifyTableColumns } from "@/constants/table-columns";

function VerifyOwnerManagement() {
  return (
    <div className="p-4 bg-white rounded-xl">
      <VerifyTable columns={VerifyTableColumns} data={verifyList} />
    </div>
  );
}

export default VerifyOwnerManagement;