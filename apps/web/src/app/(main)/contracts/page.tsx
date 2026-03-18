'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  GetBenefitRequestsByEmployeeDocument,
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitsDocument,
  GetBenefitsQuery,
  GetEmployeesDocument,
  RequestStatus,
} from 'apps/web/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';
import { ExternalLink } from 'lucide-react';

type Benefit = GetBenefitsQuery['benefits'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];

type ContractEntry = {
  benefit: Benefit;
  request: BenefitRequest;
};

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
}

function handleViewContract(benefit: Benefit) {
  if (!benefit.r2ObjectKey) return;
  const url = `https://team-service.nbhishgee22.workers.dev/api/images/${benefit.r2ObjectKey}`;
  window.open(url, '_blank');
}

function ContractTable({
  entries,
  showViewContract = false,
}: {
  entries: ContractEntry[];
  showViewContract?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="px-5 py-3 font-semibold text-[#1E293B] text-xs tracking-wide">
              Benefit
            </th>
            <th className="px-5 py-3 font-semibold text-[#1E293B] text-xs tracking-wide">
              Category
            </th>
            <th className="px-5 py-3 font-semibold text-[#1E293B] text-xs tracking-wide">
              Vendor
            </th>
            <th className="px-5 py-3 font-semibold text-[#1E293B] text-xs tracking-wide">
              Subsidy
            </th>
            <th className="px-5 py-3 font-semibold text-[#1E293B] text-xs tracking-wide">
              Submitted
            </th>
            <th className="px-5 py-3 font-semibold text-[#1E293B] text-xs tracking-wide">
              Status
            </th>
            {showViewContract && (
              <th className="px-5 py-3 font-semibold text-[#1E293B] text-xs tracking-wide">
                Contract
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {entries.map(({ benefit, request }) => (
            <tr
              key={request.id}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <td className="px-5 py-4 font-bold text-[#0F172A]">
                {benefit.name}
              </td>
              <td className="px-5 py-4 text-[#64748B]">
                {benefit.category ?? '—'}
              </td>
              <td className="px-5 py-4 text-[#64748B]">
                {benefit.vendorName ?? '—'}
              </td>
              <td className="px-5 py-4 font-bold text-[#137FEC]">
                {benefit.subsidyPercent ?? 0}%
              </td>
              <td className="px-5 py-4 text-[#64748B]">
                {formatDate(request.createdAt)}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={request.status} />
              </td>
              {showViewContract && (
                <td className="px-5 py-4">
                  {benefit.r2ObjectKey ? (
                    <button
                      onClick={() => handleViewContract(benefit)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#137FEC] hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink size={13} />
                      View
                    </button>
                  ) : (
                    <span className="text-xs text-gray-300">—</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status?: RequestStatus | null }) {
  const styles: Record<string, string> = {
    [RequestStatus.Pending]:
      'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]',
    [RequestStatus.Approved]:
      'bg-green-100 text-green-700 border border-green-200',
    [RequestStatus.Rejected]: 'bg-red-100 text-red-500 border border-red-200',
    [RequestStatus.Cancelled]:
      'bg-gray-100 text-gray-500 border border-gray-200',
  };
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    : '—';
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status ?? ''] ?? 'bg-gray-100 text-gray-500'}`}
    >
      {label}
    </span>
  );
}

export default function ContractsPage() {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [pending, setPending] = useState<ContractEntry[]>([]);
  const [processed, setProcessed] = useState<ContractEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;
      setLoading(true);
      setError('');
      try {
        const [benefitsData, employeesData] = await Promise.all([
          gqlRequest(GetBenefitsDocument),
          gqlRequest(GetEmployeesDocument),
        ]);

        const employee = employeesData.employees.find(
          (e) => e.clerkUserId === user.id,
        );
        if (!employee) return;

        const reqData = await gqlRequest(GetBenefitRequestsByEmployeeDocument, {
          employeeId: parseInt(employee.id, 10),
        });

        const allRequests = reqData.benefitRequestsByEmployee;

        function toEntry(r: BenefitRequest): ContractEntry | null {
          const benefit = benefitsData.benefits.find(
            (b) => b.id === r.benefitId,
          );
          if (!benefit || !benefit.r2ObjectKey?.trim()) return null;
          return { benefit, request: r };
        }

        setPending(
          allRequests
            .filter((r) => r.status === RequestStatus.Pending)
            .map(toEntry)
            .filter(Boolean) as ContractEntry[],
        );

        setProcessed(
          allRequests
            .filter(
              (r) =>
                r.status === RequestStatus.Approved ||
                r.status === RequestStatus.Rejected ||
                r.status === RequestStatus.Cancelled,
            )
            .map(toEntry)
            .filter(Boolean) as ContractEntry[],
        );
      } catch (e: any) {
        setError(e.message ?? 'Failed to load contracts');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user?.id]);

  if (!isClerkLoaded || loading) {
    return (
      <div className="mx-auto px-20 py-8 space-y-8">
        <div className="h-7 w-36 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-56 bg-gray-100 rounded animate-pulse" />
        <div className="bg-white rounded-xl h-40 animate-pulse border border-gray-100" />
        <div className="bg-white rounded-xl h-40 animate-pulse border border-gray-100" />
      </div>
    );
  }

  if (error) return <p className="text-red-500 px-20 py-8">{error}</p>;

  return (
    <div className="mx-auto px-20 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          Contracts
        </h1>
        <p className="text-sm font-medium text-[#64748B] mt-1">
          View contracts for your benefit requests
        </p>
      </div>

      {/* Pending */}
      <div className="mb-8">
        <div className="mb-3">
          <h2 className="text-base font-bold text-[#0F172A]">
            Pending Contracts
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            {pending.length} awaiting review
          </p>
        </div>
        {pending.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#E2E8F0] px-6 py-8 text-center">
            <p className="text-sm font-semibold text-[#0F172A]">
              No Pending Contracts
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">
              You have no pending benefit contracts.
            </p>
          </div>
        ) : (
          <ContractTable entries={pending} showViewContract />
        )}
      </div>

      {/* Processed */}
      <div>
        <div className="mb-3">
          <h2 className="text-base font-bold text-[#0F172A]">
            Processed Contracts
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            {processed.length} reviewed request
            {processed.length !== 1 ? 's' : ''}
          </p>
        </div>
        {processed.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#E2E8F0] px-6 py-8 text-center">
            <p className="text-sm font-semibold text-[#0F172A]">
              No Processed Contracts
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">
              No reviewed contracts yet.
            </p>
          </div>
        ) : (
          <ContractTable entries={processed} showViewContract />
        )}
      </div>
    </div>
  );
}
