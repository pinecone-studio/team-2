'use client';

import { useState, useEffect, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { BenefitCard, BenefitFilter } from './_components';
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
import { checkEligibility } from 'apps/web/src/lib/check-eligibility';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';

// Skeleton Components
import { BenefitsCardSkeleton } from './_components/skeletonComp/BenefitCardsSkeleton';
import {
  QuickActionsSkeleton,
  BenefitFilterSkeleton,
} from './_components/skeletonComp/QuickActionsSkeleton';

import QuickActions from './_components/QuickActions';
import { Spinner } from 'libs/ui/src/components/spinner';

// Types
type Employee = GetEmployeesQuery['employees'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];
type EligibilityRule = GetEligibilityRulesQuery['eligibilityRules'][number];

export type BenefitStatus =
  | 'Active'
  | 'Pending'
  | 'Eligible'
  | 'Locked'
  | 'Rejected';

export function deriveBenefitStatus(
  benefit: Benefit,
  request: BenefitRequest | undefined,
  rules: EligibilityRule[],
  employee: Employee,
): BenefitStatus {
  if (request) {
    if (request.status === RequestStatus.Pending) return 'Pending';
    if (request.status === RequestStatus.Approved) return 'Active';
    if (request.status === RequestStatus.Rejected) return 'Rejected';
    if (request.status === RequestStatus.Cancelled) return 'Locked';
  }
  if (!benefit.isActive) return 'Locked';
  const benefitRules = rules.filter((r) => r.benefitId === benefit.id);
  const { eligible } = checkEligibility(employee, benefitRules);
  return eligible ? 'Eligible' : 'Locked';
}

export default function BenefitsCardDashboard() {
  // isLoaded: Clerk-ийн хэрэгдэгчийн мэдээлэл ачаалж дууссан эсэх
  const { user, isLoaded: isClerkLoaded } = useUser();

  const [filter, setFilter] = useState<string>('All');
  const [data, setData] = useState<{
    benefits: Benefit[];
    employee: Employee | null;
    requests: BenefitRequest[];
    rules: EligibilityRule[];
  }>({ benefits: [], employee: null, requests: [], rules: [] });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [benefitsData, employeesData, rulesData] = await Promise.all([
          gqlRequest(GetBenefitsDocument),
          gqlRequest(GetEmployeesDocument),
          gqlRequest(GetEligibilityRulesDocument),
        ]);

        const matchedEmployee = employeesData.employees.find(
          (e) => e.clerkUserId === user.id,
        );

        let employeeRequests: BenefitRequest[] = [];
        if (matchedEmployee) {
          // const reqs = await gqlRequest(GetBenefitRequestsByEmployeeDocument, {
          //   employeeId: matchedEmployee.id,
          // });
          const reqs = await gqlRequest(GetBenefitRequestsByEmployeeDocument, {
            employeeId: parseInt(matchedEmployee.id, 10),
          });

          employeeRequests = reqs.benefitRequestsByEmployee;
        }

        setData({
          benefits: benefitsData.benefits,
          employee: matchedEmployee ?? null,
          requests: employeeRequests,
          rules: rulesData.eligibilityRules,
        });
      } catch (e: any) {
        setError(e.message ?? 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user?.id]);

  // Статус болон тоог тооцоолох логик
  const { benefitsWithStatus, counts } = useMemo(() => {
    if (!data.employee)
      return { benefitsWithStatus: [], counts: {} as Record<string, number> };

    const mapped = data.benefits.map((benefit) => {
      const request = data.requests.find((r) => r.benefitId === benefit.id);
      const status = deriveBenefitStatus(
        benefit,
        request,
        data.rules,
        data.employee!,
      );
      return { benefit, request, status };
    });

    const statusCounts = {
      All: mapped.length,
      Active: mapped.filter((b) => b.status === 'Active').length,
      Eligible: mapped.filter((b) => b.status === 'Eligible').length,
      Pending: mapped.filter((b) => b.status === 'Pending').length,
      Locked: mapped.filter((b) => b.status === 'Locked').length,
    };

    return { benefitsWithStatus: mapped, counts: statusCounts };
  }, [data]);

  const filtered =
    filter === 'All'
      ? benefitsWithStatus
      : benefitsWithStatus.filter((b) => b.status === filter);

  const handleApplied = (newRequest: BenefitRequest) => {
    setData((prev) => ({
      ...prev,
      requests: prev.requests.some((r) => r.benefitId === newRequest.benefitId)
        ? prev.requests.map((r) =>
            r.benefitId === newRequest.benefitId ? newRequest : r,
          )
        : [...prev.requests, newRequest],
    }));
  };

  // --- Скелетонуудыг нэгэн зэрэг харуулах нөхцөл ---
  if (!isClerkLoaded || loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-12 items-start py-4 animate-pulse">
        <div className="flex-1 w-full order-2 lg:order-1">
          <BenefitFilterSkeleton />
          <div className="mt-8">
            <BenefitsCardSkeleton />
          </div>
        </div>
        <aside className="w-full lg:w-[360px] lg:sticky lg:top-8 order-1 lg:order-2">
          <QuickActionsSkeleton />
        </aside>
      </div>
    );
  }

  if (error) return <p className="p-6 text-red-500 font-medium">{error}</p>;
  if (!data.employee)
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <Spinner className="w-16 h-16 opacity-30" />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start py-6 animate-in fade-in duration-500">
      {/* LEFT SIDE: Benefits List */}
      <div className="flex-1 w-full order-2 lg:order-1">
        <BenefitFilter onChange={setFilter} counts={counts} />

        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-20 text-center border border-dashed border-gray-200">
              <p className="text-[18px] font-bold text-[#0F172A]">
                No {filter === 'All' ? '' : filter} Benefits Found
              </p>
              <p className="text-sm text-[#717182] mt-2 italic">
                Nothing to show here right now.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-4 gap-y-8 justify-start items-stretch">
              {filtered.map(({ benefit, request, status }) => (
                <div
                  key={benefit.id}
                  className="w-full sm:w-[calc(50%-18px)] xl:w-[calc(50%-18px)] 2xl:w-[calc(33.33%-18px)] max-w-[320px]"
                >
                  <BenefitCard
                    benefit={benefit}
                    employee={data.employee!}
                    request={request ?? null}
                    status={status}
                    onApplied={handleApplied}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Quick Actions */}
      <aside className="w-full lg:w-[360px] lg:sticky lg:top-8 order-1 lg:order-2">
        <QuickActions />
      </aside>
    </div>
  );
}
