'use client';

import { PieChart, Pie, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@team/source-ui';
import { useEmployeeBreakdown } from './hooks/useEmployeeBreakdown';

export function EmployeeBreakdown() {
  const { data, loading, error } = useEmployeeBreakdown();

  if (loading) {
    return (
      <Card className="w-[538px] h-[389px] rounded-xl">
        <CardHeader>
          <CardTitle>Employee Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-[538px] h-[389px] rounded-xl">
        <CardHeader>
          <CardTitle>Employee Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-full items-center justify-center text-sm text-red-500">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[538px] h-[389px] rounded-xl">
      <CardHeader>
        <CardTitle>Employee Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between flex-col gap-6">
          <PieChart width={140} height={140}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              stroke="white"
              strokeWidth={1}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          <div className="space-y-2 w-[453px] h-[132px]">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#45556C] leading-5 text-sm">
                    {item.name}
                  </span>
                </div>

                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
