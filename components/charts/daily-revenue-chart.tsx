import { getRevenuePerDay } from "@/constants/chart-config";
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

interface Props {
  bookings: SystemRevenueProps[];
}

const DailyRevenueChart: React.FC<Props> = ({ bookings }) => {
  const data = getRevenuePerDay(bookings);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold mt-4">Doanh thu theo ngày</h1>
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
              dataKey="day"
              tickMargin={10}
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
            {/* <Tooltip
              formatter={(value: number) => [
                `${new Intl.NumberFormat("vi-VN").format(value)} ₫`,
                "Doanh thu",
              ]}
            /> */}
            <Tooltip
              content={({ payload, label, active }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-gray-600 border dark:border-gray-700 p-3 rounded shadow text-sm text-gray-800 dark:text-gray-200">
                      <p className="font-medium mb-2">{label}</p>
                      <p>
                        Doanh thu:{" "}
                        {new Intl.NumberFormat("vi-VN").format(
                          payload[0].value as number
                        )}{" "}
                        ₫
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#27D095"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DailyRevenueChart;
