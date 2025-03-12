import EmployeeTable from "@/components/table/employee-table";
import { employeeList } from "@/constants/constant";
import { EmployeeTableColumns } from "@/constants/table-columns";

function EmployeeManagement() {
  return (
    <div className="p-4 bg-white rounded-xl">
      <EmployeeTable columns={EmployeeTableColumns} data={employeeList} />
    </div>
  );
}

export default EmployeeManagement;
