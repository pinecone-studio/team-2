'use client';

import React from 'react';
import {
  type GetBenefitRequestsQuery,
  type GetEmployeesQuery,
  RequestStatus,
} from '../../../graphql/generated/graphql';
import { CheckCircle2, XCircle } from 'lucide-react';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Employee = GetEmployeesQuery['employees'][number];

type RowProps = {
  request: BenefitRequest;
  benefitName: string;
  employee?: Employee;
};

const formatDate = (date?: string | null) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getEmployeeName = (employee?: Employee) => employee?.name || '—';
const getEmployeeEmail = (employee?: Employee) => employee?.email || '—';
const getEmployeeRole = (employee?: Employee) => employee?.employeeRole || '—';
const getEmployeeLates = (employee?: Employee) => employee?.lateArrivalCount || 0;
const getEmployeeOkr = (employee?: Employee) => Boolean(employee?.okrSubmitted);
const getAvatarUrl = (employee?: Employee) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    employee?.name || '?'
  )}&background=random`;

const EmployeeCell = ({ employee }: { employee?: Employee }) => {
  if (!employee) {
    return (
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-[#0F172A] text-sm font-semibold">—</span>
            <span className="text-[#64748B] text-xs">—</span>
          </div>
        </div>
      </td>
    );
  }

  return (
    <td className="px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <img
            src={getAvatarUrl(employee)}
            alt={getEmployeeName(employee)}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[#0F172A] text-sm font-semibold">
            {getEmployeeName(employee)}
          </span>
          <span className="text-[#64748B] text-xs">
            {getEmployeeEmail(employee)}
          </span>
        </div>
      </div>
    </td>
  );
};

const OKRStatus = ({ submitted }: { submitted: boolean }) => (
  <td className="px-4 py-4 text-center">
    <div className="flex justify-center">
      {submitted ? (
        <CheckCircle2 className="text-[#22C55E]" size={20} />
      ) : (
        <XCircle className="text-[#EF4444]" size={20} />
      )}
    </div>
  </td>
);

const StatusBadge = ({ isApproved }: { isApproved: boolean }) => {
  if (isApproved) {
    return (
      <td className="px-4 py-4">
        <div className="flex justify-center">
          <div className="px-5 py-2 rounded-xl text-xs font-bold border transition-colors bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]">
            Approved
          </div>
        </div>
      </td>
    );
  }

  return (
    <td className="px-4 py-4">
      <div className="flex justify-center">
        <div className="px-5 py-2 rounded-xl text-xs font-bold border transition-colors bg-[#FFE4E6] text-[#991B1B] border-[#FECDD3]">
          Rejected
        </div>
      </div>
    </td>
  );
};

export const ProcessedRequestRow = ({
  request,
  benefitName,
  employee,
}: RowProps) => {
  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <EmployeeCell employee={employee} />
      <td className="px-4 py-4 text-[#334155] text-sm">{getEmployeeRole(employee)}</td>
      <td className="px-4 py-4 text-[#334155] text-sm">{benefitName}</td>
      <OKRStatus submitted={getEmployeeOkr(employee)} />
      <td className="px-4 py-4 text-center">
        <span className="text-[#22C55E] text-sm font-bold">
          {getEmployeeLates(employee)}
        </span>
      </td>
      <td className="px-4 py-4 text-[#334155] text-sm">
        {formatDate(request.createdAt)}
      </td>
      <StatusBadge isApproved={request.status === RequestStatus.Approved} />
    </tr>
  );
};
