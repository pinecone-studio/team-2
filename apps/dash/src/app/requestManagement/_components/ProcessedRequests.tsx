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
};

export const ProcessedRequests = ({
  requests = [],
  benefits = [],
  employees = [],
}: Props) => {
  function getBenefitName(benefitId: number) {
    return benefits.find((b) => b.id === benefitId)?.name ?? '—';
  }

  function getEmployeeName(employeeId: number) {
    return employees.find((e) => e.id === employeeId)?.name ?? '—';
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
