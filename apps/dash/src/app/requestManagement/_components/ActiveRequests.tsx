import React from 'react';
import { ApproveRequestDialog } from './ApproveRequestsDialog';
import { RejectRequestDialog } from './RejectRequestDialog';

interface BenefitRequest {
  id: number;
  employeeName: string;
  benefit: string;
  requestDate: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

const MOCK_DATA: BenefitRequest[] = [
  {
    id: 1,
    employeeName: 'Emily Watson',
    benefit: 'Gym Membership',
    requestDate: '1/15/2024',
    status: 'Active',
  },
  {
    id: 2,
    employeeName: 'Joe Biden',
    benefit: 'Golf Membership',
    requestDate: '1/15/2023',
    status: 'Inactive',
  },
];

export const ActiveRequests = () => {
  return (
    <div className="p-5 bg-white rounded-lg w-full border border-gray-100 shadow-sm">
      <div className="mb-6 px-4">
        <h2 className="text-gray-900 text-xl font-bold leading-10">
          Active requests
        </h2>
        <p className="text-gray-500 text-sm">
          {MOCK_DATA.length} requests awaiting review
        </p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[1000px] table-fixed">
          <thead>
            <tr className="border-b border-black/10">
              <th className="w-[20%] px-4 py-3 text-slate-900 text-base font-bold">
                Employee
              </th>
              <th className="w-[25%] px-4 py-3 text-slate-900 text-base font-bold">
                Benefit
              </th>
              <th className="w-[20%] px-4 py-3 text-slate-900 text-base font-bold">
                Request Date
              </th>
              <th className="w-[15%] px-4 py-3 text-slate-900 text-base font-bold">
                Status
              </th>
              <th className="w-[20%] px-4 py-3 text-slate-900 text-base font-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.map((request) => (
              <tr
                key={request.id}
                className="border-b border-black/10 hover:bg-gray-50 transition-colors h-14"
              >
                <td className="px-4 py-2 text-black text-sm font-semibold">
                  {request.employeeName}
                </td>
                <td className="px-4 py-2 text-black/50 text-sm font-semibold">
                  {request.benefit}
                </td>
                <td className="px-4 py-2 text-black/50 text-sm font-semibold">
                  {request.requestDate}
                </td>
                <td className="px-4 py-2">
                  <div
                    className={`w-[90px] h-[29px] rounded-lg outline outline-1 outline-offset-[-1px] flex justify-center items-center font-semibold text-xs
                    ${
                      request.status === 'Active'
                        ? 'bg-green-50 text-green-600 outline-emerald-100'
                        : request.status === 'Inactive'
                          ? 'bg-rose-50 text-rose-600 outline-rose-100'
                          : 'bg-amber-50 text-amber-600 outline-amber-100'
                    }`}
                  >
                    {request.status}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <ApproveRequestDialog />
                    <RejectRequestDialog />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
