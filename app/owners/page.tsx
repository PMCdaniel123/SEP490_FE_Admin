import OwnerTable from "@/components/table/owner-table";
import { ownerList } from "@/constants/constant";
import { OwnerTableColumns } from "@/constants/table-columns";

function OwnerManagement() {
  return (
    <div className="p-4 bg-white rounded-xl">
      <OwnerTable columns={OwnerTableColumns} data={ownerList} />
    </div>
  );
}

export default OwnerManagement;
