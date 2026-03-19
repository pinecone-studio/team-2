'use client';

import type { Dispatch, SetStateAction } from 'react';
import { ApproveRequestDialog } from './ApproveRequestsDialog';
import { RejectRequestDialog } from './RejectRequestDialog';
import {
  type GetBenefitRequestsQuery,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { CheckCircle2, XCircle } from 'lucide-react';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Employee = GetEmployeesQuery['employees'][number];

type RowProps = {
  request: BenefitRequest;
  benefitName: string;
  employee?: Employee;
  onUpdated: (updated: BenefitRequest) => void;
  setActionLoading: Dispatch<SetStateAction<boolean>>;
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
const getEmployeeLates = (employee?: Employee) =>
  employee?.lateArrivalCount || 0;
const getEmployeeOkr = (employee?: Employee) => Boolean(employee?.okrSubmitted);
const getAvatarUrl = (employee?: Employee) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    employee?.name || '?',
  )}&background=random`;

const EmployeeCell = ({ employee }: { employee?: Employee }) => {
  if (!employee) {
    return (
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#0F172A]">—</span>
            <span className="text-xs text-[#64748B]">—</span>
          </div>
        </div>
      </td>
    );
  }

  return (
    <td className="px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
          <img
            src={getAvatarUrl(employee)}
            alt={getEmployeeName(employee)}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#0F172A]">
            {getEmployeeName(employee)}
          </span>
          <span className="text-xs text-[#64748B]">
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

const ActionButtons = ({
  request,
  onUpdated,
  setActionLoading,
}: {
  request: BenefitRequest;
  onUpdated: (updated: BenefitRequest) => void;
  setActionLoading: Dispatch<SetStateAction<boolean>>;
}) => (
  <td className="px-4 py-4">
    <div className="flex items-center justify-center gap-3">
      <ApproveRequestDialog
        request={request}
        onUpdated={onUpdated}
        setActionLoading={setActionLoading}
      />
      <RejectRequestDialog
        request={request}
        onUpdated={onUpdated}
        setActionLoading={setActionLoading}
      />
    </div>
  </td>
);

export const ActiveRequestRow = ({
  request,
  benefitName,
  employee,
  onUpdated,
  setActionLoading,
}: RowProps) => {
  return (
    <tr className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50">
      <EmployeeCell employee={employee} />

      <td className="px-4 py-4 text-sm text-[#334155]">
        {getEmployeeRole(employee)}
      </td>

      <td className="px-4 py-4 text-sm text-[#334155]">{benefitName}</td>

      <OKRStatus submitted={getEmployeeOkr(employee)} />

      <td className="px-4 py-4 text-center">
        <span className="text-sm font-bold text-[#22C55E]">
          {getEmployeeLates(employee)}
        </span>
      </td>

      <td className="px-4 py-4 text-sm font-[300] text-[#334155]">
        <span className="text-[#22C55E] text-sm font-medium">
          {getEmployeeLates(employee)}
        </span>
      </td>
      <td className="px-4 py-4 text-[#334155] text-base font-[300]">
        {formatDate(request.createdAt)}
      </td>

      <ActionButtons
        request={request}
        onUpdated={onUpdated}
        setActionLoading={setActionLoading}
      />
    </tr>
  );
};
