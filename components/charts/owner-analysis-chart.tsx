"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { OwnerProps } from "@/types";

const chartConfig = {
  visitors: {
    label: "Phân tích doanh nghiệp",
  },
  male: {
    label: "Nam",
    color: "#27D095",
  },
  female: {
    label: "Nữ",
    color: "#FF8E29",
  },
  other: {
    label: "Khác",
    color: "#F54F5F",
  },
} satisfies ChartConfig;

export default function OwnerAnalysisChart({
  ownerList,
}: {
  ownerList?: OwnerProps[];
}) {
  const safeOwnerList = ownerList ?? [];

  const maleOwner = safeOwnerList.filter((owner) => owner.sex === "Nam");
  const femaleOwner = safeOwnerList.filter((owner) => owner.sex === "Nữ");
  const otherOwner = safeOwnerList.filter((owner) => owner.sex === "Khác");

  const chartData = React.useMemo(
    () => [
      {
        browser: "male",
        visitors: maleOwner.length,
        fill: "var(--color-male)",
      },
      {
        browser: "female",
        visitors: femaleOwner.length,
        fill: "var(--color-female)",
      },
      {
        browser: "other",
        visitors: otherOwner.length,
        fill: "var(--color-other)",
      },
    ],
    [maleOwner.length, femaleOwner.length, otherOwner.length]
  );

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="mt-4 font-bold">Số lượng doanh nghiệp</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {safeOwnerList.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Trống
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Doanh nghiệp
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
