'use client';
import { AttendanceTrendChart } from './attendanceTrendChart/page';
import { EmployeeBreakdown } from './employeeBreakdown/_components/EmployeeBreakdownChart';
import { ProcessedRequests } from './requestManagement/_components';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] p-12">
      <div className="flex flex-col gap-5">
        <div className="max-w-[1215px]  flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[#0F172A] text-3xl font-semibold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-[#45556C] text-[16px] leading-6 font-normal mt-1">
              Welcome back! Here's what's happening with your team today.
            </p>
          </div>
        </div>
        <div className="flex gap-10 justify-between max-w-[1215px] ">
          <AttendanceTrendChart />
          <EmployeeBreakdown />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Recent Requests</h1>
            <button
              onClick={() => router.push('./employees')}
              className="bg-[#155DFC] hover:bg-[#1259f1] text-white  px-4 py-2  rounded-xl flex items-center justify-center gap-2 h-10"
            >
              <Plus />
              <span className="font-semibold text-sm">Add Employee</span>
            </button>
          </div>
          <ProcessedRequests />
        </div>
      </div>
    </div>
  );
}
