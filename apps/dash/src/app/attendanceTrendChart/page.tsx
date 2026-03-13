'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@team/source-ui';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@team/source-ui';

const chartData = [
  { days: 'Monday', desktop: 186, mobile: 80 },
  { days: 'Tuesday', desktop: 305, mobile: 200 },
  { days: 'Wednesday', desktop: 237, mobile: 120 },
  { days: 'Thursday', desktop: 173, mobile: 190 },
  { days: 'Friday', desktop: 209, mobile: 130 },
  { days: 'Saturday', desktop: 114, mobile: 90 },
  { days: 'Sunday', desktop: 80, mobile: 40 },
];

const chartConfig = {
  desktop: {
    label: 'Present',
    color: '#EC4899',
  },
  mobile: {
    label: 'Absent',
    color: '#8B5CF6',
  },
} satisfies ChartConfig;

export default function ChartAreaAxes() {
  return (
    <Card className="w-[620px] h-[330px]">
      <CardHeader>
        <CardTitle>Attendance Trend</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart
            data={chartData}
            margin={{
              left: 0,
              right: 12,
              top: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="days"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            {/* Absent */}
            <Area
              type="monotone"
              dataKey="desktop"
              stroke="#6366f1"
              fill="url(#presentGradient)"
              strokeWidth={0.6}
            />

            {/* Present */}
            <Area
              type="monotone"
              dataKey="mobile"
              stroke="#ec4899"
              fill="url(#absentGradient)"
              strokeWidth={0.6}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
