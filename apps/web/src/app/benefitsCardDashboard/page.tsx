'use client';

import { useState, useEffect } from 'react';
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
import { BenefitsCardSkeleton } from './_components/skeletonComp/BenefitCardsSkeleton';

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
  const { user } = useUser();
  const [filter, setFilter] = useState('All');
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
            { employeeId: matched.id },
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

  function handleApplied(newRequest: BenefitRequest) {
    setRequests((prev) => {
      const exists = prev.find((r) => r.benefitId === newRequest.benefitId);
      if (exists) return prev.map((r) => (r.id === exists.id ? newRequest : r));
      return [...prev, newRequest];
    });
  }

  const benefitsWithStatus = benefits.map((benefit) => {
    const request = requests.find((r) => r.benefitId === benefit.id);
    const status = deriveBenefitStatus(benefit, request, rules, employee!);
    return { benefit, request, status };
  });

  const filtered =
    filter === 'All'
      ? benefitsWithStatus
      : benefitsWithStatus.filter((b) => b.status === filter);

  if (loading) return <BenefitsCardSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!employee) return <p>Employee record not found.</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <BenefitFilter onChange={setFilter} />
      <div className="mt-[38px]">
        {filtered.length === 0 ? (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
            <div className="w-[280px] rounded-[24px] border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center gap-3 p-8 min-h-[240px] text-center">
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">
                  No {filter === 'All' ? '' : filter} Benefits
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {filter === 'Pending' &&
                    'You have no pending benefit requests.'}
                  {filter === 'Active' && 'You have no active benefits yet.'}
                  {filter === 'Eligible' &&
                    'No benefits are currently available for you.'}
                  {filter === 'Locked' && 'No locked benefits at the moment.'}
                  {filter === 'All' && 'No benefits found.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
            {filtered.map(({ benefit, request, status }) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                employee={employee}
                request={request ?? null}
                status={status}
                onApplied={handleApplied}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
