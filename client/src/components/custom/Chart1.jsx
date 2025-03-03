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
    label: "Keyboard",
    color: Color.customGrey ,
  },
  keyboard: {
    label: "Mouse",
    color: Color.customYellow,
  },
    Headset :{
        label : "Headset",
        color : Color.customIsabelline
    }
} 

export  function Chart1() {
  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-hmin">
        <CardHeader>
            <CardTitle>Bar Chart - Multiple</CardTitle>
            <CardDescription> January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
        <ChartContainer config={chartConfig} >
        <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="mouse" fill="var(--color-mouse)" radius={4} />
            <Bar dataKey="keyboard" fill="var(--color-keyboard)" radius={4} />
            <Bar dataKey="headset" fill="var(--color-headset)" radius={4} />
        </BarChart>
        </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm" >
            <div className="flex gap-2 font-medium leading-none" >
                Trending up by 2.2% this month <TrendingUp className=" h-4 w-4 "/>
            </div>
            <div className="leading-none text-muted-foreground ">Showing total vositors for the last 3 months</div>
        </CardFooter>
    </Card>
  )
}
