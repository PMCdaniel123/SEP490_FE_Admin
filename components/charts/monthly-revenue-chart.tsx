import { SystemRevenueProps } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Separator } from "../ui/separator";
import { getRevenuePerMonth } from "@/constants/chart-config";

interface Props {
  bookings: SystemRevenueProps[];
}

const MonthlyRevenueChart: React.FC<Props> = ({ bookings }) => {
  const data = getRevenuePerMonth(bookings);

  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="font-bold mt-4">Doanh thu theo tháng</h1>
      <Separator className="mb-8" />
      {bookings.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Trống
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickMargin={12}
              tick={{ fontSize: 10 }}
              stroke="currentColor"
              className="text-gray-700 dark:text-gray-300"
            />
            <YAxis
              width={100}
              tick={{ fontSize: 10 }}
              tickMargin={8}
              tickFormatter={(value) =>
                new Intl.NumberFormat("vi-VN").format(value) + " ₫"
              }
              stroke="currentColor"
              className="text-gray-700 dark:text-gray-300"
            />
            <Tooltip
              formatter={(value: number) => [
                `${new Intl.NumberFormat("vi-VN").format(value)} ₫`,
                "Doanh thu",
              ]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#67CADF"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyRevenueChart;
