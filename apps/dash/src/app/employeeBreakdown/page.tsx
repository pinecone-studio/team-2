// 'use client';

// import { PieChart, Pie, Cell } from 'recharts';

// import { Card, CardContent, CardHeader, CardTitle } from '@team/source-ui';
// import { useEmployeeBreakdown } from './hooks/useEmployeeBreakdown';

// export function EmployeeBreakdown() {
//   const { data } = useEmployeeBreakdown();

//   return (
//     <Card className="w-[538px] h-[389px] rounded-xl">
//       <CardHeader>
//         <CardTitle>Employee Breakdown</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <div className="flex items-center justify-between flex-col gap-6">
//           <PieChart width={140} height={140}>
//             <Pie
//               key={data.length}
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               innerRadius={50}
//               outerRadius={70}
//               paddingAngle={3}
//               stroke="white"
//               strokeWidth={1}
//               isAnimationActive={true}
//               animationBegin={0}
//               animationDuration={800}
//               animationEasing="ease-out"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={index} fill={entry.color} />
//               ))}
//             </Pie>
//           </PieChart>

//           <div className="space-y-2 w-[453px] h-[132px]">
//             {data.map((item) => (
//               <div
//                 key={item.name}
//                 className="flex items-center justify-between gap-4 text-sm"
//               >
//                 <div className="flex items-center justify-between gap-1">
//                   <span
//                     className="h-3 w-3 rounded-full"
//                     style={{ backgroundColor: item.color }}
//                   />
//                   <span className="text-[#45556C] leading-5 text-sm">
//                     {item.name}
//                   </span>
//                 </div>

//                 <span className="font-medium">{item.value}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from '@team/source-ui';
// import { useEmployeeBreakdown } from './hooks/useEmployeeBreakdown';

// function EmployeeBreakdownSkeleton() {
//   return (
//     <Card className="w-[538px] h-[389px] rounded-xl">
//       <CardHeader>
//         <CardTitle>Employee Breakdown</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center flex-col gap-6">
//           <div className="w-[140px] h-[140px] rounded-full bg-gray-200 animate-pulse relative">
//             <div className="absolute inset-[20px] rounded-full bg-white" />
//           </div>
//           <div className="space-y-2 w-[453px]">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <div key={i} className="flex items-center justify-between gap-4">
//                 <div className="flex items-center gap-1">
//                   <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse" />
//                   <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
//                 </div>
//                 <div className="h-4 w-8 rounded bg-gray-200 animate-pulse" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export function EmployeeBreakdown() {
//   const [isClient, setIsClient] = useState(false);
//   const { data, loading } = useEmployeeBreakdown();

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient || loading) return <EmployeeBreakdownSkeleton />; // 👈 single condition covers both phases

//   return (
//     <Card className="w-[538px] h-[389px] rounded-xl">
//       <CardHeader>
//         <CardTitle>Employee Breakdown</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <div className="flex items-center justify-between flex-col gap-6">
//           <PieChart width={140} height={140}>
//             <Pie
//               key={data.length}
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               innerRadius={50}
//               outerRadius={70}
//               paddingAngle={3}
//               stroke="white"
//               strokeWidth={1}
//               isAnimationActive={true}
//               animationBegin={0}
//               animationDuration={800}
//               animationEasing="ease-out"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={index} fill={entry.color} />
//               ))}
//             </Pie>
//           </PieChart>

//           <div className="space-y-2 w-[453px] h-[132px]">
//             {data.map((item) => (
//               <div
//                 key={item.name}
//                 className="flex items-center justify-between gap-4 text-sm"
//               >
//                 <div className="flex items-center justify-between gap-1">
//                   <span
//                     className="h-3 w-3 rounded-full"
//                     style={{ backgroundColor: item.color }}
//                   />
//                   <span className="text-[#45556C] leading-5 text-sm">
//                     {item.name}
//                   </span>
//                 </div>
//                 <span className="font-medium">{item.value}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@team/source-ui';
import { useEmployeeBreakdown } from './hooks/useEmployeeBreakdown';

function EmployeeBreakdownSkeleton() {
  return (
    <Card className="w-[538px] h-[389px] rounded-xl">
      <CardHeader>
        <CardTitle>Employee Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center flex-col gap-6">
          <div className="w-[140px] h-[140px] rounded-full bg-gray-200 animate-pulse relative">
            <div className="absolute inset-[20px] rounded-full bg-white" />
          </div>
          <div className="space-y-2 w-[453px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="h-4 w-8 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EmployeeBreakdown() {
  const [isClient, setIsClient] = useState(false);
  const { data, loading } = useEmployeeBreakdown();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || loading) return <EmployeeBreakdownSkeleton />;

  return (
    <Card className="w-[538px] h-[389px] rounded-xl">
      <CardHeader>
        <CardTitle>Employee Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between flex-col gap-6">
          <PieChart width={140} height={140}>
            <Pie
              key={data.length}
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              stroke="white"
              strokeWidth={1}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
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
