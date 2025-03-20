"use client";

import WithdrawalRequestTable from "@/components/table/withdrawal-request-table";
import { withdrawalListRequest } from "@/constants/constant";
import { WithdrawalRequestTableColumns } from "@/constants/table-columns";


function WithdrawalRequestManagement() {
  return (
    <div className="p-4 bg-white rounded-xl">
      <WithdrawalRequestTable columns={WithdrawalRequestTableColumns} data={withdrawalListRequest} />
    </div>
  );
}

export default WithdrawalRequestManagement;
