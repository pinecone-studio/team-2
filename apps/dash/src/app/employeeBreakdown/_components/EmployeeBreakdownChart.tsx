// 'use client';
// import dynamic from 'next/dynamic';

// export const EmployeeBreakdown = dynamic(
//   () => import('../page').then((mod) => mod.EmployeeBreakdown),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="w-[538px] h-[389px] rounded-xl bg-gray-100 animate-pulse" />
//     ),
//   },
// );

// 'use client';
// import dynamic from 'next/dynamic';

// export const EmployeeBreakdown = dynamic(
//   () => import('../page').then((mod) => mod.EmployeeBreakdown),
//   {
//     ssr: false,
//   },
// );

'use client';

export { EmployeeBreakdown } from '../page';
