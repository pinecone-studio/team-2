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
  if (!employee && !loading) return <p>Employee record not found.</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          My Requests
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Track the status of your benefit requests
        </p>
      </div>

      {/* ── Pending Requests ── */}
      <section>
        <div className="mb-3">
          <h2 className="text-base font-semibold text-[#0F172A]">
            Pending Requests
          </h2>
          <p className="text-xs text-[#64748B]">
            {pendingRequests.length} awaiting review
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Benefit
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Vendor
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Subsidy
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Submitted
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-gray-400"
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
          <h2 className="text-base font-semibold text-[#0F172A]">
            Processed Requests
          </h2>
          <p className="text-xs text-[#64748B]">
            {processedRequests.length} reviewed requests
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Benefit
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Vendor
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Subsidy
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Submitted
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-[#1E293B] tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {processedRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-gray-400"
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
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-4 py-3 text-sm font-semibold text-[#0F172A]">
        {benefitName}
      </td>
      <td className="px-4 py-3 text-sm text-[#64748B]">{category}</td>
      <td className="px-4 py-3 text-sm text-[#64748B]">{vendor}</td>
      <td className="px-4 py-3 text-sm font-bold text-[#137FEC]">{subsidy}%</td>
      <td className="px-4 py-3 text-sm text-[#64748B]">
        {request.createdAt
          ? new Date(request.createdAt).toLocaleDateString()
          : '—'}
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-[10px] py-1 rounded-lg text-[11px] font-semibold border capitalize ${
            style?.badge ?? 'bg-gray-100 text-gray-500 border-gray-200'
          }`}
        >
          {request.status?.toLowerCase()}
        </span>
      </td>
    </tr>
  );
}
