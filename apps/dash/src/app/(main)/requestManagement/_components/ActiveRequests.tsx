'use client';

import React from 'react';
import {
  type GetBenefitRequestsQuery,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from '../../../graphql/generated/graphql';
import { ActiveRequestRow } from './ActiveRequestRow';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

type Props = {
  requests: BenefitRequest[];
  benefits: Benefit[];
  employees: Employee[];
  onUpdated: (updated: BenefitRequest) => void;
};

const RequestTable = ({
  requests,
  onUpdated,
  getBenefitName,
  getEmployee,
}: {
  requests: BenefitRequest[];
  onUpdated: (updated: BenefitRequest) => void;
  getBenefitName: (id: number) => string;
  getEmployee: (id: number) => Employee | undefined;
}) => (
  <div className="overflow-x-auto w-full px-4 pb-4">
    <table className="w-full text-left border-collapse min-w-[1000px]">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="px-4 py-4 text-[#0F172A] text-sm font-bold">
            Employee Name
          </th>
          <th className="px-4 py-4 text-[#0F172A] text-sm font-bold">Role</th>
          <th className="px-4 py-4 text-[#0F172A] text-sm font-bold">Benefit</th>
          <th className="px-4 py-4 text-[#0F172A] text-sm font-bold text-center">
            OKR
          </th>
          <th className="px-4 py-4 text-[#0F172A] text-sm font-bold text-center">
            Late Arrivals
          </th>
          <th className="px-4 py-4 text-[#0F172A] text-sm font-bold">
            Request Date
          </th>
          <th className="px-4 py-4 text-[#0F172A] text-sm font-bold text-center">
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
}: Props) => {
  const getBenefitName = (benefitId: number) =>
    benefits.find((b) => b.id === benefitId)?.name ?? '—';

  const getEmployee = (employeeId: number) =>
    employees.find((e) => e.id === employeeId);

  return (
    <div className="bg-white rounded-[20px] w-full border border-gray-100 shadow-sm overflow-hidden mb-8">
      <div className="pt-8 pb-6 px-8">
        <h2 className="text-[#0F172A] text-xl font-bold">Active requests</h2>
        <p className="text-[#64748B] text-sm mt-1">
          {requests.length} requests awaiting review
        </p>
      </div>
      <RequestTable
        requests={requests}
        onUpdated={onUpdated}
        getBenefitName={getBenefitName}
        getEmployee={getEmployee}
      />
    </div>
  );
};
