'use client';

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from '@team/source-ui';

import { useState } from 'react';
import { CheckCircle, Clock, XCircle, ShieldCheck } from 'lucide-react';
import {
  CreateBenefitRequestDocument,
  RequestStatus,
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitsQuery,
  GetEligibilityRulesByBenefitDocument,
  GetEligibilityRulesByBenefitQuery,
  GetEmployeesQuery,
} from 'apps/web/src/graphql/generated/graphql';
import {
  checkEligibility,
  EligibilityResult,
} from 'apps/web/src/lib/check-eligibility';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';
import { BenefitDetailsDialogSkeleton } from './skeletonComp/BenefitDetailsDialogSkeleton';

type Benefit = GetBenefitsQuery['benefits'][number];
type Rule =
  GetEligibilityRulesByBenefitQuery['eligibilityRulesByBenefit'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];
type Employee = GetEmployeesQuery['employees'][number];

type Props = {
  benefit: Benefit;
  employee: Employee;
  existingRequest: BenefitRequest | null;
  onApplied: (request: BenefitRequest) => void;
  children?: React.ReactNode;
};

const requestStatusConfig: Record<
  string,
  { label: string; className: string; icon: React.ReactNode }
> = {
  [RequestStatus.Approved]: {
    label: 'Approved',
    className: 'bg-green-100 text-green-700 border-green-200',
    icon: <CheckCircle size={14} />,
  },
  [RequestStatus.Pending]: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: <Clock size={14} />,
  },
  [RequestStatus.Rejected]: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-600 border-red-200',
    icon: <XCircle size={14} />,
  },
  [RequestStatus.Cancelled]: {
    label: 'Cancelled',
    className: 'bg-gray-100 text-gray-500 border-gray-200',
    icon: <XCircle size={14} />,
  },
};

export function EmployeeBenefitDetailsDialog({
  benefit,
  employee,
  existingRequest,
  onApplied,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [eligibility, setEligibility] = useState<EligibilityResult | null>(
    null,
  );
  const [loadingData, setLoadingData] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState('');

  async function handleOpen(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen) {
      setLoadingData(true);
      try {
        const rulesData = await gqlRequest(
          GetEligibilityRulesByBenefitDocument,
          { benefitId: benefit.id },
        );
        setRules(rulesData.eligibilityRulesByBenefit);
        setEligibility(
          checkEligibility(employee, rulesData.eligibilityRulesByBenefit),
        );
      } catch {
        setRules([]);
        setEligibility(null);
      } finally {
        setLoadingData(false);
      }
    }
  }

  async function handleApply() {
    setApplying(true);
    setApplyError('');
    try {
      const data = await gqlRequest(CreateBenefitRequestDocument, {
        input: {
          benefitId: benefit.id,
          employeeId: parseInt(employee.id, 10),
          status: RequestStatus.Pending,
          createdAt: new Date().toISOString(),
        },
      });
      onApplied(data.createBenefitRequest);
    } catch (e: any) {
      setApplyError(e.message ?? 'Failed to submit request');
    } finally {
      setApplying(false);
    }
  }

  const statusKey = existingRequest?.status ?? RequestStatus.Pending;
  const statusConfig = requestStatusConfig[statusKey];

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button className="w-full !bg-[#137FEC] !rounded-[16px] hover:shadow-[2px_4px_3.8px_rgba(19,127,236,0.25)] transition-shadow duration-300">
            View Details
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
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

        {loadingData ? (
          <BenefitDetailsDialogSkeleton />
        ) : (
          <div className="space-y-6 mt-2">
            {/* ── Section 1: Benefit Details ── */}
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
              </div>
            </section>

            <Separator />

            {/* ── Section 2: Eligibility Rules ── */}
            <section>
              <SectionTitle>Eligibility Rules</SectionTitle>
              {rules.length === 0 ? (
                <EmptyState message="No eligibility rules — everyone can apply." />
              ) : (
                <div className="space-y-2">
                  {rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
                    >
                      <ShieldCheck
                        size={15}
                        className="text-blue-400 mt-0.5 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#0F172A]">
                          <span className="text-[#64748B]">
                            {rule.ruleType}
                          </span>{' '}
                          {rule.operator}{' '}
                          <span className="font-semibold">{rule.value}</span>
                        </p>
                        {rule.errorMessage && (
                          <p className="text-[11px] text-[#94A3B8] mt-0.5">
                            {rule.errorMessage}
                          </p>
                        )}
                      </div>
                      <Badge
                        className={
                          rule.isActive
                            ? '!bg-green-100 !text-green-700 !rounded-full text-[10px] shrink-0'
                            : '!bg-gray-100 !text-gray-500 !rounded-full text-[10px] shrink-0'
                        }
                      >
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <Separator />

            {/* ── Section 3: My Request ── */}
            <section>
              <SectionTitle>My Request</SectionTitle>

              {existingRequest ? (
                <div
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                    statusConfig?.className ?? 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {statusConfig?.icon}
                  <div>
                    <p className="text-sm font-semibold">
                      {statusConfig?.label ?? existingRequest.status}
                    </p>
                    <p className="text-[11px] opacity-75">
                      {existingRequest.createdAt
                        ? `Submitted on ${new Date(existingRequest.createdAt).toLocaleDateString()}`
                        : 'Request submitted'}
                    </p>
                  </div>
                </div>
              ) : eligibility && !eligibility.eligible ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 space-y-2">
                  <p className="text-sm font-semibold text-red-600">
                    ❌ You are not eligible for this benefit
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {eligibility.errors.map((err, i) => (
                      <li key={i} className="text-xs text-red-500">
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-3">
                  {eligibility?.eligible && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2">
                      <p className="text-xs text-green-700 font-medium">
                        ✅ You meet all eligibility requirements
                      </p>
                    </div>
                  )}
                  <EmptyState message="You have not applied for this benefit yet." />
                  {applyError && (
                    <p className="text-xs text-red-500">{applyError}</p>
                  )}
                  <Button
                    className="w-full !bg-[#137FEC] !rounded-[16px] hover:shadow-[2px_4px_3.8px_rgba(19,127,236,0.25)] transition-shadow duration-300"
                    onClick={handleApply}
                    disabled={applying || !benefit.isActive}
                  >
                    {applying
                      ? 'Submitting...'
                      : !benefit.isActive
                        ? 'Benefit Inactive'
                        : 'Request Benefit'}
                  </Button>
                </div>
              )}
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

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
    <div className="rounded-lg border border-dashed border-gray-200 px-4 py-3 text-center">
      <p className="text-xs text-gray-400">{message}</p>
    </div>
  );
}
