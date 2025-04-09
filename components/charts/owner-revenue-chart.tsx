"use client";

import { OwnerRevenue } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import { Separator } from "../ui/separator";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function OwnerRevenueChart({ data }: { data: OwnerRevenue[] }) {
  const sortedData = [...data]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5); // Get top 5

  const isMoreThanFive = data.length > 5;

  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="font-bold mt-4">Top 5 không gian có doanh thu cao nhất</h1>
      <Separator className="mb-8" />
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Trống
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(value) =>
                `${new Intl.NumberFormat("vi-VN").format(value)} ₫`
              }
              fontSize={12}
              tickMargin={12}
            />
            <YAxis
              type="category"
              dataKey="ownerName"
              width={180}
              fontSize={12}
              tickMargin={8}
            />
            <Tooltip
              formatter={(value: number) => [
                `${new Intl.NumberFormat("vi-VN").format(value)} ₫`,
                "Doanh thu",
              ]}
            />
            <Bar dataKey="totalRevenue" radius={[0, 10, 10, 0]} barSize={30}>
              {sortedData.map((entry, index) => (
                <Cell
                  key={entry.ownerId}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {isMoreThanFive && (
        <p className="text-sm text-gray-500 mt-2 text-right italic">
          + còn nhiều cửa hàng khác...
        </p>
      )}
    </div>
  );
}
