'use client';

import React from 'react';
import {
  type GetBenefitRequestsQuery,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

type Props = {
  requests?: BenefitRequest[];
  benefits?: Benefit[];
  employees?: Employee[];
  variant?: 'table' | 'feed';
};

export const ProcessedRequests = ({
  requests = [],
  benefits = [],
  employees = [],
  variant = 'table',
}: Props) => {
  function getBenefitName(benefitId: number) {
    return benefits.find((b) => b.id === benefitId)?.name ?? '—';
  }

  function getEmployeeName(employeeId: number) {
    return employees.find((e) => e.id === employeeId)?.name ?? '—';
  }

  function getEmployeeInitials(employeeId: number) {
    const employeeName = getEmployeeName(employeeId);

    if (employeeName === '—') return 'NA';

    return employeeName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }

  function formatDate(date?: string | null) {
    if (!date) return '—';

    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  if (variant === 'feed') {
    const latestRequests = [...requests]
      .sort((a, b) => {
        const first = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const second = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return second - first;
      })
      .slice(0, 4);

    return (
      <aside className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-md xl:sticky xl:top-6">
        <div className="mb-5">
          <h2 className="text-[18px] font-semibold text-[#0F172A]">
            Recent Requests
          </h2>
          <p className="text-sm text-[#64748B]">
            Latest approved and rejected activity
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {latestRequests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
              No recent requests yet.
            </div>
          ) : (
            latestRequests.map((request) => {
              const approved = request.status?.toLowerCase() === 'approved';

              return (
                <div
                  key={request.id}
                  className={`rounded-[24px] border p-4 shadow-sm ${
                    approved
                      ? 'border-[#D9E8FF] bg-[#EEF5FF]'
                      : 'border-[#F1E3FF] bg-white'
                  }`}
                >
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      approved
                        ? 'bg-[#DDEAFE] text-[#295FD6]'
                        : 'bg-[#F0E4FF] text-[#7C3AED]'
                    }`}
                  >
                    {getBenefitName(request.benefitId)}
                  </span>

                  <p className="mt-5 text-base text-[#334155]">
                    {approved
                      ? 'You accepted the request.'
                      : 'You rejected the request.'}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-[#94A3B8]">
                      {formatDate(request.createdAt)}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8ECFF] text-xs font-semibold text-[#155DFC]">
                      {getEmployeeInitials(request.employeeId)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    );
  }

  return (
    <div className="p-5 bg-white rounded-lg w-full border border-gray-100 shadow-sm">
      <div className="mb-6 px-4">
        <h2 className="text-gray-900 text-xl font-bold leading-10">
          Processed requests
        </h2>
        <p className="text-gray-500 text-sm">
          {requests.length} previously reviewed requests
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
              <th className="w-[20%] px-4 py-3 text-slate-900 text-base font-bold">
                Review Date
              </th>
              <th className="w-[15%] px-4 py-3 text-slate-900 text-base font-bold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-gray-400"
                >
                  No processed requests yet
                </td>
              </tr>
            ) : (
              requests.map((request) => {
                const statusLower = request.status?.toLowerCase() ?? '';
                return (
                  <tr
                    key={request.id}
                    className="border-b border-black/10 hover:bg-gray-50 transition-colors h-14"
                  >
                    <td className="px-4 py-2 text-black text-sm font-semibold">
                      {getEmployeeName(request.employeeId)}
                    </td>
                    <td className="px-4 py-2 text-black/50 text-sm font-semibold">
                      {getBenefitName(request.benefitId)}
                    </td>
                    <td className="px-4 py-2 text-black/50 text-sm font-semibold">
                      {request.createdAt
                        ? new Date(request.createdAt).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="px-4 py-2 text-black/50 text-sm font-semibold">
                      {request.createdAt
                        ? new Date(request.createdAt).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="px-4 py-2">
                      <div
                        className={`w-[90px] h-[29px] rounded-lg flex justify-center items-center font-semibold text-xs capitalize outline outline-1 outline-offset-[-1px]
                          ${
                            statusLower === 'approved'
                              ? 'bg-green-50 text-green-500 outline-emerald-100'
                              : 'bg-rose-100 text-rose-700 outline-rose-100'
                          }`}
                      >
                        {request.status}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
