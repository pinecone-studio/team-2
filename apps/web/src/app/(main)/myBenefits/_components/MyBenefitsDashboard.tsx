'use client';

import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';

import { Spinner } from '@team/source-ui';
import { Ban, CheckCircle2, Clock, Home, Lock, LucideIcon } from 'lucide-react';
import {
  GetBenefitRequestsByEmployeeDocument,
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitsDocument,
  GetBenefitsQuery,
  GetEligibilityRulesDocument,
  GetEligibilityRulesQuery,
  GetEmployeesDocument,
  GetEmployeesQuery,
  RequestStatus,
} from 'apps/web/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';
import {
  BenefitStatus,
  deriveBenefitStatus,
} from '../../benefitsCardDashboard/page';
import { EmployeeBenefitDetailsDialog } from '../../benefitsCardDashboard/_components/EmployeeBenefitDetailsDialog';
import { MyBenefitsDashboardSkeleton } from './skeletonComp/MyBenefitsDashboardSkeleton';

type Employee = GetEmployeesQuery['employees'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];
type EligibilityRule = GetEligibilityRulesQuery['eligibilityRules'][number];

const statusIcons: Record<BenefitStatus, LucideIcon> = {
  Active: CheckCircle2,
  Eligible: Home,
  Pending: Clock,
  Locked: Lock,
  Rejected: Ban,
};

const statusIconStyles: Record<BenefitStatus, { bg: string; text: string }> = {
  Active: { bg: 'bg-[#D1FAE5]', text: 'text-[#047857]' },
  Eligible: { bg: 'bg-[#EBF2FF]', text: 'text-[#3B82F6]' },
  Pending: { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
  Locked: { bg: 'bg-gray-100', text: 'text-gray-400' },
  Rejected: { bg: 'bg-red-100', text: 'text-red-400' },
};

const accentStyles = [
  'bg-[#F9DDE7]',
  'bg-[#FCE3E9]',
  'bg-[#E8E0FF]',
  'bg-[#FFE6D1]',
];

function formatSubmittedDate(dateStr?: string | null) {
  if (!dateStr) return 'Recently submitted';

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return 'Recently submitted';

  return `Submitted ${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
}

function formatRequestStatus(status?: RequestStatus | null) {
  if (!status) return 'Updated';
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function getTrailingLabel(
  status: BenefitStatus,
  benefit: Benefit,
  request: BenefitRequest | undefined,
) {
  if (status === 'Pending') {
    return {
      text: 'In review',
      className: 'text-[#F59E0B]',
    };
  }

  if (status === 'Active') {
    const expiryDate = benefit.contractExpiryDate
      ? new Date(benefit.contractExpiryDate)
      : null;

    if (expiryDate && !Number.isNaN(expiryDate.getTime())) {
      const msInDay = 1000 * 60 * 60 * 24;
      const daysRemaining = Math.ceil(
        (expiryDate.getTime() - Date.now()) / msInDay,
      );

      if (daysRemaining > 0 && daysRemaining <= 30) {
        return {
          text: `${daysRemaining} day${daysRemaining === 1 ? '' : 's'} remaining`,
          className: 'text-[#3CCB7F]',
        };
      }
    }

    return {
      text: 'Active',
      className: 'text-[#3CCB7F]',
    };
  }

  if (status === 'Eligible') {
    return {
      text: 'Ready to apply',
      className: 'text-[#3B82F6]',
    };
  }

  return {
    text: formatRequestStatus(request?.status),
    className: 'text-[#64748B]',
  };
}

export default function MyBenefitsDashboard() {
  const { user } = useUser();
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [requests, setRequests] = useState<BenefitRequest[]>([]);
  const [rules, setRules] = useState<EligibilityRule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const [benefitsData, employeesData, rulesData] = await Promise.all([
          gqlRequest(GetBenefitsDocument),
          gqlRequest(GetEmployeesDocument),
          gqlRequest(GetEligibilityRulesDocument),
        ]);

        setBenefits(benefitsData.benefits);
        setRules(rulesData.eligibilityRules);

        const matched = employeesData.employees.find(
          (e) => e.clerkUserId === user?.id,
        );
        setEmployee(matched ?? null);

        if (matched) {
          const requestsData = await gqlRequest(
            GetBenefitRequestsByEmployeeDocument,
            { employeeId: parseInt(matched.id, 10) },
          );
          setRequests(requestsData.benefitRequestsByEmployee);
        }
      } catch (e: any) {
        setError(e.message ?? 'Failed to load');
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) fetchData();
  }, [user?.id]);

  function handleApplied(updatedRequest: BenefitRequest) {
    setRequests((prev) => {
      const existing = prev.find((request) => request.id === updatedRequest.id);

      if (existing) {
        return prev.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request,
        );
      }

      const sameBenefit = prev.find(
        (request) => request.benefitId === updatedRequest.benefitId,
      );

      if (sameBenefit) {
        return prev.map((request) =>
          request.benefitId === updatedRequest.benefitId
            ? updatedRequest
            : request,
        );
      }

      return [...prev, updatedRequest];
    });
  }

  const benefitEntries = useMemo(() => {
    if (!employee) return [];

    return benefits
      .map((benefit) => {
        const request = requests.find((r) => r.benefitId === benefit.id);
        const status = deriveBenefitStatus(benefit, request, rules, employee);

        return {
          benefit,
          request,
          status,
        };
      })
      .filter((entry) => entry.status === 'Active' || entry.status === 'Eligible')
      .sort((a, b) => {
        const aTime = new Date(a.request?.createdAt ?? 0).getTime();
        const bTime = new Date(b.request?.createdAt ?? 0).getTime();
        return bTime - aTime;
      });
  }, [benefits, requests, rules, employee]);

  if (loading) return <MyBenefitsDashboardSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!employee)
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <Spinner className="w-16 h-16 opacity-30" />
      </div>
    );

  return (
    <div className="mx-auto px-36 mt-4 py-2">
      <div className="mb-8">
        <h1 className="text-gray-900 text-3xl font-bold">My Benefits</h1>
        <p className="text-[#666666]">
          Your comprenhensive benefits package overview{' '}
        </p>
      </div>

      {benefitEntries.length === 0 ? (
        <div className="flex min-h-[261px] w-full items-center justify-center rounded-[24px] border-2 border-dashed border-[#E2E8F0] p-8 text-center xl:max-w-[calc((100%-3rem)/3)]">
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">
              No benefits to show yet
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              Your active and eligible benefits will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-start gap-4 xl:grid-cols-[repeat(3,minmax(0,1fr))] xl:gap-x-6">
          {benefitEntries.map(({ benefit, request, status }, index) => {
            const StatusIcon = statusIcons[status];
            const iconStyle = statusIconStyles[status];
            const trailing = getTrailingLabel(status, benefit, request);

            return (
              <div
                key={benefit.id}
                className="relative w-full min-h-[261px] overflow-hidden rounded-[24px] border border-[#EEF2F6] bg-white/92 p-6 shadow-[0_14px_30px_rgba(15,23,42,0.08)] md:p-7"
              >
                <div
                  className={`pointer-events-none absolute right-0 top-0 h-[132px] w-[132px] rounded-bl-[132px] opacity-85 md:h-[144px] md:w-[144px] md:rounded-bl-[144px] ${accentStyles[index % accentStyles.length]}`}
                />

                <div className="relative z-10 flex min-h-[210px] flex-col md:min-h-[224px]">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-[16px] md:h-14 md:w-14 ${iconStyle.bg}`}
                  >
                    <StatusIcon
                      className={iconStyle.text}
                      size={24}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="mt-8 md:mt-9">
                    <h3
                      className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] truncate text-[#17233C] md:text-[24px]"
                      title={benefit.name}
                    >
                      {benefit.name}
                    </h3>
                    <div className="flex items-center justify-between ">
                      <p className="mt-2 text-[15px] font-medium leading-6 text-[#6F7C91] md:mt-3 md:text-base">
                        {status === 'Eligible'
                          ? 'Ready to apply'
                          : formatSubmittedDate(request?.createdAt)}
                      </p>
                      <EmployeeBenefitDetailsDialog
                        benefit={benefit}
                        employee={employee}
                        existingRequest={request ?? null}
                        onApplied={handleApplied}
                      >
                        <button className="w-fit pt-3 text-[13px] font-semibold text-[#459cf3] transition-colors hover:text-blue-600">
                          View Details
                        </button>
                      </EmployeeBenefitDetailsDialog>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 md:pt-10">
                    <div className="h-px w-full bg-[#EEF2F6]" />
                    <div className="flex items-center justify-between gap-4 pt-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#6A7282] text-[14px] font-normal leading-normal">
                          {status === 'Eligible'
                            ? 'Eligible'
                            : formatRequestStatus(request?.status)}
                        </span>
                      </div>
                      <span
                        className={`text-right text-sm font-semibold md:text-[15px] ${trailing.className}`}
                      >
                        {trailing.text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
