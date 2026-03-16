'use client';

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@team/source-ui';

import { useState } from 'react';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import {
  GetBenefitRequestsByBenefitDocument,
  GetBenefitRequestsByBenefitQuery,
  GetBenefitsQuery,
  GetEligibilityRulesByBenefitDocument,
  GetEligibilityRulesByBenefitQuery,
} from 'apps/dash/src/graphql/generated/graphql';

type Benefit = GetBenefitsQuery['benefits'][number];
type Rule =
  GetEligibilityRulesByBenefitQuery['eligibilityRulesByBenefit'][number];
type BenefitRequest =
  GetBenefitRequestsByBenefitQuery['benefitRequestsByBenefit'][number];

type Props = {
  benefit: Benefit;
};

const requestStatusStyles: Record<string, string> = {
  approved: '!bg-green-100 !text-green-700 !rounded-full',
  pending: '!bg-yellow-100 !text-yellow-700 !rounded-full',
  rejected: '!bg-red-100 !text-red-600 !rounded-full',
};

export const BenefitDetailsDialog = ({ benefit }: Props) => {
  const [open, setOpen] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [requests, setRequests] = useState<BenefitRequest[]>([]);
  const [loadingRules, setLoadingRules] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

  async function handleOpen(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen) {
      setLoadingRules(true);
      setLoadingRequests(true);

      try {
        const [rulesData, requestsData] = await Promise.all([
          gqlRequest(GetEligibilityRulesByBenefitDocument, {
            benefitId: benefit.id,
          }),
          gqlRequest(GetBenefitRequestsByBenefitDocument, {
            benefitId: benefit.id,
          }),
        ]);
        setRules(rulesData.eligibilityRulesByBenefit);
        setRequests(requestsData.benefitRequestsByBenefit);
      } catch {
        setRules([]);
        setRequests([]);
      } finally {
        setLoadingRules(false);
        setLoadingRequests(false);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[#137FEC] hover:text-blue-700 hover:bg-blue-50 font-medium"
        >
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg font-bold text-[#0F172A]">
              {benefit.name}
            </DialogTitle>
            <span
              className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold border ${
                benefit.isActive
                  ? 'bg-[#EDF7EC] text-[#59AF4F] border-[#D1E9CF]'
                  : 'bg-[#FEF2F2] text-[#EF4444] border-[#FEE2E2]'
              }`}
            >
              {benefit.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          {benefit.description && (
            <p className="text-sm text-[#64748B] mt-1">{benefit.description}</p>
          )}
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* ── Section 1: Benefit Fields ── */}
          <section>
            <SectionTitle>Benefit Details</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              <DetailRow label="Category" value={benefit.category} />
              <DetailRow label="Vendor" value={benefit.vendorName} />
              <DetailRow
                label="Subsidy"
                value={
                  benefit.subsidyPercent != null
                    ? `${benefit.subsidyPercent}%`
                    : null
                }
              />
              <DetailRow
                label="Requires Contract"
                value={benefit.requiresContract ? 'Yes' : 'No'}
              />
              <DetailRow
                label="Contract Expiry"
                value={benefit.contractExpiryDate ?? null}
              />
              <DetailRow
                label="Contract Uploaded"
                value={
                  benefit.contractUploadedAt
                    ? new Date(benefit.contractUploadedAt).toLocaleDateString()
                    : null
                }
              />
            </div>
          </section>

          {/* ── Section 2: Eligibility Rules ── */}
          <section>
            <SectionTitle>Eligibility Rules</SectionTitle>
            {loadingRules ? (
              <p className="text-xs text-gray-400">Loading rules...</p>
            ) : rules.length === 0 ? (
              <EmptyState message="No eligibility rules defined for this benefit." />
            ) : (
              <SimpleTable
                headers={[
                  'Rule Type',
                  'Operator',
                  'Value',
                  'Error Message',
                  'Status',
                ]}
                rows={rules.map((rule) => [
                  rule.ruleType ?? '—',
                  rule.operator ?? '—',
                  rule.value ?? '—',
                  rule.errorMessage ?? '—',
                  <Badge
                    key={rule.id}
                    className={
                      rule.isActive
                        ? '!bg-green-100 !text-green-700 !rounded-full text-[10px]'
                        : '!bg-gray-100 !text-gray-500 !rounded-full text-[10px]'
                    }
                  >
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </Badge>,
                ])}
              />
            )}
          </section>

          {/* ── Section 3: Benefit Requests ── */}
          <section>
            <SectionTitle>Benefit Requests</SectionTitle>
            {loadingRequests ? (
              <p className="text-xs text-gray-400">Loading requests...</p>
            ) : requests.length === 0 ? (
              <EmptyState message="No requests have been submitted for this benefit." />
            ) : (
              <SimpleTable
                headers={[
                  'Request ID',
                  'Employee ID',
                  'Status',
                  'Submitted At',
                ]}
                rows={requests.map((req) => [
                  `#${req.id}`,
                  `#${req.employeeId}`,
                  <Badge
                    key={req.id}
                    className={
                      requestStatusStyles[req.status?.toLowerCase() ?? ''] ??
                      '!bg-gray-100 !text-gray-500 !rounded-full'
                    }
                  >
                    {req.status ?? 'Unknown'}
                  </Badge>,
                  req.createdAt
                    ? new Date(req.createdAt).toLocaleDateString()
                    : '—',
                ])}
              />
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ── Helpers ──────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
      {children}
    </p>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
      <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-sm font-medium text-[#0F172A]">{value ?? '—'}</p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 px-4 py-4 text-center">
      <p className="text-xs text-gray-400">{message}</p>
    </div>
  );
}

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="rounded-lg border border-gray-100 overflow-hidden">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {headers.map((h) => (
              <th
                key={h}
                className="px-3 py-2 font-semibold text-[#64748B] tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-[#0F172A]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
