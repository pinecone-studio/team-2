'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@team/source-ui';
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
import { SecondaryPagesGradient } from '../../_components/main/backgroundGradient/SecondaryPagesGradient';

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
    <div className="overflow-hidden rounded-[24px] border border-[#EEF2F6] bg-white/92 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
      <table className="w-full text-left text-sm">
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
            {showViewContract && (
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6A7282]">
                Contract
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEF2F6]">
          {entries.map(({ benefit, request }) => (
            <tr
              key={request.id}
              className="transition-colors hover:bg-[#F8FAFC]/80"
            >
              <td className="px-5 py-4 font-semibold text-[#17233C]">
                {benefit.name}
              </td>
              <td className="px-5 py-4 text-[#6F7C91]">
                {benefit.category ?? '—'}
              </td>
              <td className="px-5 py-4 text-[#6F7C91]">
                {benefit.vendorName ?? '—'}
              </td>
              <td className="px-5 py-4 font-bold text-[#137FEC]">
                {benefit.subsidyPercent ?? 0}%
              </td>
              <td className="px-5 py-4 text-[#6F7C91]">
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
                    <span className="text-xs text-[#CBD5E1]">—</span>
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

function ContractTableSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#EEF2F6] bg-white/92 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#EEF2F6]">
            {Array.from({ length: 7 }).map((_, index) => (
              <th key={index} className="px-5 py-4">
                <Skeleton className="h-3 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEF2F6]">
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index}>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-14" />
              </td>
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
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[status ?? ''] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}
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

  let content: ReactNode;

  if (!isClerkLoaded || loading) {
    content = (
      <div className="mx-auto mt-4 space-y-8 px-36 py-2">
        <div className="mb-8">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="mt-2 h-5 w-80" />
        </div>
        <section>
          <div className="mb-3">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
          <ContractTableSkeleton rows={4} />
        </section>
        <section>
          <div className="mb-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
          <ContractTableSkeleton rows={4} />
        </section>
      </div>
    );
  } else if (error) {
    content = <p className="mx-auto mt-4 px-36 py-2 text-red-500">{error}</p>;
  } else {
    content = (
      <div className="mx-auto mt-4 px-36 py-2">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 text-3xl font-bold">Contracts</h1>
          <p className="text-[#666666]">
            View contracts for your benefit requests
          </p>
        </div>

        {/* Pending */}
        <div className="mb-8">
          <div className="mb-3">
            <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#17233C]">
              Pending Contracts
            </h2>
            <p className="mt-1 text-sm font-medium text-[#6F7C91]">
              {pending.length} awaiting review
            </p>
          </div>
          {pending.length === 0 ? (
            <div className="rounded-[24px] border-2 border-dashed border-[#E2E8F0] bg-white/70 px-6 py-8 text-center">
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
            <h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#17233C]">
              Processed Contracts
            </h2>
            <p className="mt-1 text-sm font-medium text-[#6F7C91]">
              {processed.length} reviewed request
              {processed.length !== 1 ? 's' : ''}
            </p>
          </div>
          {processed.length === 0 ? (
            <div className="rounded-[24px] border-2 border-dashed border-[#E2E8F0] bg-white/70 px-6 py-8 text-center">
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

  return (
    <div className="relative isolate min-h-screen">
      <SecondaryPagesGradient />
      <div className="relative z-10">{content}</div>
    </div>
  );
}
