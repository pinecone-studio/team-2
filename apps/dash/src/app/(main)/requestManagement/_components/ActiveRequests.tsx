'use client';

import type { Dispatch, SetStateAction } from 'react';
import {
  type GetBenefitRequestsQuery,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { ActiveRequestRow } from './ActiveRequestRow';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

type Props = {
  requests: BenefitRequest[];
  benefits: Benefit[];
  employees: Employee[];
  onUpdated: (updated: BenefitRequest) => void;
  setActionLoading: Dispatch<SetStateAction<boolean>>;
};

const RequestTable = ({
  requests,
  onUpdated,
  getBenefitName,
  getEmployee,
  setActionLoading,
}: {
  requests: BenefitRequest[];
  onUpdated: (updated: BenefitRequest) => void;
  getBenefitName: (id: number) => string;
  getEmployee: (id: number) => Employee | undefined;
  setActionLoading: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="overflow-x-auto w-full px-4 pb-4">
    <table className="w-full min-w-[1000px] border-collapse text-left">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="px-4 py-1 text-sm font-[600] text-[#0F172A]">
            Employee Name
          </th>
          <th className="px-4 py-1 text-sm font-[600] text-[#0F172A]">Role</th>
          <th className="px-4 py-1 text-sm font-[600] text-[#0F172A]">
            Benefit
          </th>
          <th className="px-4 py-1 text-center text-sm font-[600] text-[#0F172A]">
            OKR
          </th>
          <th className="px-4 py-1 text-center text-sm font-[600] text-[#0F172A]">
            Late Arrivals
          </th>
          <th className="px-4 py-1 text-sm font-[600] text-[#0F172A]">
            Request Date
          </th>
          <th className="px-4 py-1 text-center text-sm font-[600] text-[#0F172A]">
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
              No pending requests
            </td>
          </tr>
        ) : (
          requests.map((request) => (
            <ActiveRequestRow
              key={request.id}
              request={request}
              benefitName={getBenefitName(request.benefitId)}
              employee={getEmployee(request.employeeId)}
              onUpdated={onUpdated}
              setActionLoading={setActionLoading}
            />
          ))
        )}
      </tbody>
    </table>
  </div>
);

export const ActiveRequests = ({
  requests = [],
  benefits = [],
  employees = [],
  onUpdated,
  setActionLoading,
}: Props) => {
  const getBenefitName = (benefitId: number) =>
    benefits.find((b) => b.id === benefitId)?.name ?? '—';

  const getEmployee = (employeeId: number) =>
    employees.find((e) => e.id === employeeId);

  return (
    <div className="mb-8 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="px-8 pt-8 pb-6">
        <h2 className="text-xl font-[600] text-[#101828]">Active requests</h2>
        <p className="mt-1 text-sm font-[300] text-[#717182]">
          {requests.length} requests awaiting review
        </p>
      </div>

      <RequestTable
        requests={requests}
        onUpdated={onUpdated}
        getBenefitName={getBenefitName}
        getEmployee={getEmployee}
        setActionLoading={setActionLoading}
      />
    </div>
  );
};
