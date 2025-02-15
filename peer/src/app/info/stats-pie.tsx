"use client"

import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

function getChartData(stat: Map<String, number>) {
  console.log(stat)
  let chartData = {
    "data": [],
    "config": {},
  }

  let ci = 0;
  for (let i in stat) {
    chartData["data"].push({ "info": i, "count": stat[i], fill: COLORS[ci++] })
    chartData["config"][i] = { "label": i }

  }
  // console.log(JSON.stringify(chartData));

  return chartData;
}

export default function InfoStatsPie({ stats, title, description }: { stats: any, title: string, description: string }) {
  // console.log(stats)
  const pieData = getChartData(stats)
  const chartConfig = pieData["config"];
  const chartData = pieData["data"];

  return (

    <Card className="p-2 w-1/3">
      <CardTitle>{title}</CardTitle>
      {/* <CardDescription>{description}</CardDescription> */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="info" hideLabel />}
            />
            <Pie data={chartData} dataKey="count">
              <LabelList
                dataKey="info"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
