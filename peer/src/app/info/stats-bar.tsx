"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',"hsl(var(--chart-1))","hsl(var(--chart-2))","hsl(var(--chart-3))","hsl(var(--chart-4))","hsl(var(--chart-5))"];

function getChartData(stat:Map<String,number>){
  console.log(stat)
  let chartData = {
    "data":[],
    "config":{},
  }

  let ci = 0;
  for(let i in stat){
    chartData["data"].push({"value":i,"count":stat[i],fill:COLORS[ci++]})
    chartData["config"][i] = {"label":i}
  
  }
  // console.log(JSON.stringify(chartData));
  return chartData;
}

export function InfoStatsBar({ stats,title,description }: { stats: any,title:string,description:string }) {
  const barData = getChartData(stats)
  const chartConfig = barData["config"];
  const chartData = barData["data"];
  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="value"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
