'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  GetBenefitRequestsByEmployeeDocument,
  GetBenefitsDocument,
  GetEmployeesDocument,
  RequestStatus,
  type GetBenefitRequestsByEmployeeQuery,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from 'apps/web/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';
import { MyRequestsDashboardSkeleton } from './skeletonComp/MyRequestsDashboardSkeleton';
import { BrandLoader } from '../../../_components/main/loading/BrandLoader';

type Employee = GetEmployeesQuery['employees'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];

const statusStyles: Record<string, { badge: string }> = {
  [RequestStatus.Pending]: {
    badge: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  [RequestStatus.Approved]: {
    badge: 'bg-green-50 text-green-600 border-green-200',
  },
  [RequestStatus.Rejected]: {
    badge: 'bg-rose-50 text-rose-600 border-rose-200',
  },
  [RequestStatus.Cancelled]: {
    badge: 'bg-gray-100 text-gray-500 border-gray-200',
  },
};

export function MyRequestsDashboard() {
  const { user } = useUser();
  const [requests, setRequests] = useState<BenefitRequest[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const [benefitsData, employeesData] = await Promise.all([
          gqlRequest(GetBenefitsDocument),
          gqlRequest(GetEmployeesDocument),
        ]);

        setBenefits(benefitsData.benefits);

        const matched = employeesData.employees.find(
          (e) => e.clerkUserId === user?.id,
        );
        setEmployee(matched ?? null);

        if (matched) {
          const employeeId = Number.parseInt(matched.id, 10);

          if (Number.isNaN(employeeId)) {
            throw new Error('Invalid employee id');
          }

          const requestsData = await gqlRequest(
            GetBenefitRequestsByEmployeeDocument,
            { employeeId },
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

  function getBenefitName(benefitId: number) {
    return benefits.find((b) => b.id === benefitId)?.name ?? '—';
  }

  function getBenefitCategory(benefitId: number) {
    return benefits.find((b) => b.id === benefitId)?.category ?? '—';
  }

  function getBenefitVendor(benefitId: number) {
    return benefits.find((b) => b.id === benefitId)?.vendorName ?? '—';
  }

  function getBenefitSubsidy(benefitId: number) {
    return benefits.find((b) => b.id === benefitId)?.subsidyPercent ?? 0;
  }

  const pendingRequests = requests.filter(
    (r) => r.status === RequestStatus.Pending,
  );
  const processedRequests = requests.filter(
    (r) =>
      r.status === RequestStatus.Approved ||
      r.status === RequestStatus.Rejected ||
      r.status === RequestStatus.Cancelled,
  );

  if (loading) return <MyRequestsDashboardSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!employee && !loading)
    return (
      <BrandLoader className="min-h-screen" label="Loading your requests" />
    );

  return (
    <div className="mx-auto mt-4 space-y-8 px-36 py-2">
      <div className="mb-8">
        <h1 className="text-gray-900 text-3xl font-bold">My Requests</h1>
        <p className="text-[#666666]">
          Track the status of your benefit requests
        </p>
      </div>

      {/* ── Pending Requests ── */}
      <section>
        <div className="mb-3">
          <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#17233C]">
            Pending Requests
          </h2>
          <p className="mt-1 text-sm font-medium text-[#6F7C91]">
            {pendingRequests.length} awaiting review
          </p>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#EEF2F6] bg-white/92 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EEF2F6]">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Benefit
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Category
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Vendor
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Subsidy
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Submitted
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F6]">
              {pendingRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-[#94A3B8]"
                  >
                    No pending requests
                  </td>
                </tr>
              ) : (
                pendingRequests.map((request) => (
                  <RequestRow
                    key={request.id}
                    request={request}
                    benefitName={getBenefitName(request.benefitId)}
                    category={getBenefitCategory(request.benefitId)}
                    vendor={getBenefitVendor(request.benefitId)}
                    subsidy={getBenefitSubsidy(request.benefitId)}
                    style={statusStyles[request.status ?? '']}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Processed Requests ── */}
      <section>
        <div className="mb-3">
          <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#17233C]">
            Processed Requests
          </h2>
          <p className="mt-1 text-sm font-medium text-[#6F7C91]">
            {processedRequests.length} reviewed requests
          </p>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#EEF2F6] bg-white/92 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EEF2F6]">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Benefit
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Category
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Vendor
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Subsidy
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Submitted
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F6]">
              {processedRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-[#94A3B8]"
                  >
                    No processed requests yet
                  </td>
                </tr>
              ) : (
                processedRequests.map((request) => (
                  <RequestRow
                    key={request.id}
                    request={request}
                    benefitName={getBenefitName(request.benefitId)}
                    category={getBenefitCategory(request.benefitId)}
                    vendor={getBenefitVendor(request.benefitId)}
                    subsidy={getBenefitSubsidy(request.benefitId)}
                    style={statusStyles[request.status ?? '']}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// ── Shared row component ──────────────────────────────────

function RequestRow({
  request,
  benefitName,
  category,
  vendor,
  subsidy,
  style,
}: {
  request: BenefitRequest;
  benefitName: string;
  category: string;
  vendor: string;
  subsidy: number;
  style?: { badge: string };
}) {
  return (
    <tr className="transition-colors hover:bg-[#F8FAFC]/80">
      <td className="px-5 py-4 text-sm font-semibold text-[#17233C]">
        {benefitName}
      </td>
      <td className="px-5 py-4 text-sm text-[#6F7C91]">{category}</td>
      <td className="px-5 py-4 text-sm text-[#6F7C91]">{vendor}</td>
      <td className="px-5 py-4 text-sm font-bold text-[#137FEC]">{subsidy}%</td>
      <td className="px-5 py-4 text-sm text-[#6F7C91]">
        {request.createdAt
          ? new Date(request.createdAt).toLocaleDateString()
          : '—'}
      </td>
      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize border ${
            style?.badge ?? 'bg-gray-100 text-gray-500 border-gray-200'
          }`}
        >
          {request.status?.toLowerCase()}
        </span>
      </td>
    </tr>
  );
}
