"use client";

import Loader from "@/components/loader/Loader";
import WorkspaceTable from "@/components/table/workspace-table";
import { WorkspaceTableColumns } from "@/constants/table-columns";
import { Workspace } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function WorkspaceManagement() {
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaceList = async () => {
      try {
        const response = await fetch("https://localhost:5050/workspaces");

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách không gian.");
        }
        const data = await response.json();
        const formatted = data.workspaces.map((workspace: Workspace) => ({
          ...workspace,
          shortTermPrice:
            workspace.prices.find((price) => price.category === "Giờ")?.price ||
            0,
          longTermPrice:
            workspace.prices.find((price) => price.category === "Ngày")
              ?.price || 0,
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

    fetchWorkspaceList();
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
      <WorkspaceTable columns={WorkspaceTableColumns} data={workspaceList} />
    </div>
  );
}

export default WorkspaceManagement;
