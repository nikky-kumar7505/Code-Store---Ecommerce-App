"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Color } from "@/constants/color"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { TrendingUp } from "lucide-react"

const chartData = [
  { month: "January", mouse: 186, keyboard: 80, headset: 234},
  { month: "February", mouse: 305, keyboard: 200, headset: 234},
  { month: "March", mouse: 237, keyboard: 120, headset: 24},
  { month: "April", mouse: 73, keyboard: 190, headset: 234},
  { month: "May", mouse: 309, keyboard: 130, headset: 234},
  { month: "June", mouse: 214, keyboard: 140, headset: 224},
]

const chartConfig = {
  mouse: {
    label: "Mouse",
    color: Color.customGrey,
  },
  keyboard: {
    label: "Keyboard",
    color: Color.customYellow,
  },
  headset: {
    label: "Headset",
    color: Color.customIsabelline,
  },
}

export  function Chart1() {
  return (
    <Card className="h-full w-full min-w-0 flex-1 rounded-xl bg-muted/50">
        <CardHeader className="space-y-1 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Sales by category</CardTitle>
            <CardDescription className="text-xs sm:text-sm">January – June 2024</CardDescription>
        </CardHeader>
        <CardContent className="px-2 pb-2 pt-0 sm:px-6">
        <ChartContainer config={chartConfig} className="aspect-[4/3] w-full min-h-[200px] max-w-full sm:aspect-video">
        <BarChart accessibilityLayer data={chartData} margin={{ left: 4, right: 4, top: 4, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            interval={0}
            tickFormatter={(value) => value.slice(0, 3)}
            className="text-[10px] sm:text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="mouse" fill="var(--color-mouse)" radius={4} />
            <Bar dataKey="keyboard" fill="var(--color-keyboard)" radius={4} />
            <Bar dataKey="headset" fill="var(--color-headset)" radius={4} />
        </BarChart>
        </ChartContainer>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4 text-xs sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:text-sm" >
            <div className="flex flex-wrap items-center gap-2 font-medium leading-snug" >
                Trending up by 2.2% this month <TrendingUp className="h-4 w-4 shrink-0" aria-hidden />
            </div>
            <div className="leading-snug text-muted-foreground">Showing total visitors for the last 6 months</div>
        </CardFooter>
    </Card>
  )
}
