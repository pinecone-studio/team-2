'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

import { Tabs, TabsList, TabsTrigger } from '@team/source-ui';
import {
  GetBenefitRequestsByEmployeeDocument,
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitsDocument,
  GetBenefitsQuery,
  GetEligibilityRulesDocument,
  GetEligibilityRulesQuery,
  GetEmployeesDocument,
  GetEmployeesQuery,
} from 'apps/web/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';
import { deriveBenefitStatus } from '../../benefitsCardDashboard/page';
import { BenefitCard } from '../../benefitsCardDashboard/_components';

type Employee = GetEmployeesQuery['employees'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];
type EligibilityRule = GetEligibilityRulesQuery['eligibilityRules'][number];

export default function MyBenefitsDashboard() {
  const { user } = useUser();
  const [tab, setTab] = useState<'Active' | 'Pending'>('Active');
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

  // Only Active and Pending
  const filtered = benefitsWithStatus.filter((b) => b.status === tab);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!employee) return <p>Employee record not found.</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          My Benefits
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Your active and pending benefit requests
        </p>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as 'Active' | 'Pending')}
        className=" mb-[38px]"
      >
        <TabsList className="bg-transparent gap-2">
          <TabsTrigger
            value="Active"
            className="px-3 py-1 !rounded-[16px] data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="Pending"
            className="px-3 py-1 !rounded-[16px] data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
          <div className="w-[280px] rounded-[24px] border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center gap-3 p-8 min-h-[240px] text-center">
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                No {tab} Benefits
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                {tab === 'Active'
                  ? 'You have no active benefits yet.'
                  : 'You have no pending benefit requests.'}
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
  );
}
