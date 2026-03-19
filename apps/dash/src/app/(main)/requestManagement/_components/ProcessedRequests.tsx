'use client';

import React from 'react';
import {
  type GetBenefitRequestsQuery,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { ProcessedRequestRow } from './ProcessedRequestRow';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

type Props = {
  requests?: BenefitRequest[];
  benefits?: Benefit[];
  employees?: Employee[];
  variant?: 'table' | 'feed';
};

const ProcessedRequestTable = ({
  requests,
  getBenefitName,
  getEmployee,
}: {
  requests: BenefitRequest[];
  getBenefitName: (id: number) => string;
  getEmployee: (id: number) => Employee | undefined;
}) => (
  <div className="overflow-x-auto w-full px-4 pb-4">
    <table className="w-full text-left border-collapse min-w-[1000px]">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="px-4 py-1 text-[#0F172A] text-sm font-[600]">
            Employee Name
          </th>
          <th className="px-4 py-1 text-[#0F172A] text-sm font-[600]">Role</th>
          <th className="px-4 py-1 text-[#0F172A] text-sm font-[600]">
            Benefit
          </th>
          <th className="px-4 py-1 text-[#0F172A] text-sm font-[600] text-center">
            OKR
          </th>
          <th className="px-4 py-1 text-[#0F172A] text-sm font-[600] text-center">
            Late Arrivals
          </th>
          <th className="px-4 py-1 text-[#0F172A] text-sm font-[600]">
            Request Date
          </th>
          <th className="px-4 py-1 text-[#0F172A] text-sm font-[600] text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {requests.length === 0 ? (
          <tr>
            <td
              colSpan={7}
              className="px-4 py-12 text-center text-sm text-[#64748B]"
            >
              No processed requests yet
            </td>
          </tr>
        ) : (
          requests.map((request) => (
            <ProcessedRequestRow
              key={request.id}
              request={request}
              benefitName={getBenefitName(request.benefitId)}
              employee={getEmployee(request.employeeId)}
            />
          ))
        )}
      </tbody>
    </table>
  </div>
);

export const ProcessedRequests = ({
  requests = [],
  benefits = [],
  employees = [],
  variant = 'table',
}: Props) => {
  const getBenefitName = (benefitId: number) =>
    benefits.find((b) => b.id === benefitId)?.name ?? '—';

  const getEmployee = (employeeId: number) =>
    employees.find((e) => e.id === employeeId);

  // function getEmployeeInitials(employeeId: number) {
  //   const employeeName = getEmployeeName(employeeId);

  //   if (employeeName === '—') return 'NA';

  //   return employeeName
  //     .split(' ')
  //     .filter(Boolean)
  //     .slice(0, 2)
  //     .map((part) => part[0]?.toUpperCase())
  //     .join('');
  // }

  function getEmployeeInitials(employeeId: number) {
    const employeeName = getEmployee(employeeId)?.name ?? '—';

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
    <div className="bg-white rounded-lg w-full border border-gray-100 shadow-sm overflow-hidden">
      <div className="pt-8 pb-6 px-8">
        <h2 className="text-[#101828] text-xl font-[600]">
          Processed requests
        </h2>
        <p className="text-[#717182] font-[300] text-sm mt-1">
          Previously reviewed requests
        </p>
      </div>
      <ProcessedRequestTable
        requests={requests}
        getBenefitName={getBenefitName}
        getEmployee={getEmployee}
      />
    </div>
  );
};
