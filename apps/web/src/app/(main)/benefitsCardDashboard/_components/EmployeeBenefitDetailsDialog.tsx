'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@team/source-ui';

import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle,
  Clock,
  Code2,
  X,
  XCircle,
} from 'lucide-react';
import {
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
import { BenefitRequestDialog } from './BenefitRequestDialog';

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
    icon: <Clock size={22} />,
  },
  [RequestStatus.Rejected]: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-600 border-red-100',
    icon: <XCircle size={22} />,
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
  const [requestOpen, setRequestOpen] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [eligibility, setEligibility] = useState<EligibilityResult | null>(
    null,
  );
  const [loadingData, setLoadingData] = useState(false);

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

  function handleOpenRequestDialog() {
    setOpen(false);
    setRequestOpen(true);
  }

  const statusKey = existingRequest?.status ?? RequestStatus.Pending;
  const statusConfig = requestStatusConfig[statusKey];
  const dialogMode = getDialogMode({
    benefit,
    existingRequest,
    eligibility,
  });
  const unmetCount = eligibility?.errors.length ?? 0;

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          {children ?? (
            <Button className="w-full !rounded-[8px] !bg-[#137FEC] transition-shadow duration-300 hover:shadow-[2px_4px_3.8px_rgba(19,127,236,0.25)]">
              View Details
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[8px] border border-[#E7ECF3] bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:max-w-[430px]">
          <DialogHeader className="sr-only">
            <DialogTitle>{benefit.name}</DialogTitle>
          </DialogHeader>

          <div className="pointer-events-none absolute left-0 top-[-34px] flex w-full items-center justify-between px-1">
            <p
              className={`text-[15px] font-normal lowercase ${getModeLabelClass(dialogMode)}`}
            >
              {getModeLabel(dialogMode)}
            </p>

            {dialogMode === 'eligible' ? (
              <Code2 className="h-4 w-4 text-[#66B3FF]" strokeWidth={2} />
            ) : (
              <div className="h-4" />
            )}
          </div>

          {loadingData ? (
            <BenefitDetailsDialogSkeleton />
          ) : (
            <div className="space-y-4">
              <div className="mt-4 rounded-[8px] bg-[#F8F8F8] px-[16px] py-[18px]">
                <h2 className="text-[16px] font-normal leading-[1.2] text-[#0A0A0A]">
                  {benefit.name}
                </h2>
              </div>

              <div>
                <h3 className="text-[16px] font-normal text-[#262d39]">
                  Description
                </h3>
                <p className="mt-[2px] text-[13px] leading-[1.45] text-[#717182]">
                  {benefit.description ||
                    'No description provided for this benefit.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Category" value={benefit.category} />
                <DetailRow
                  label="Company Subsidy"
                  value={
                    benefit.subsidyPercent != null
                      ? `${benefit.subsidyPercent}%`
                      : null
                  }
                />
                <DetailRow label="Vendor" value={benefit.vendorName} />
                <DetailRow
                  label="Contract Required"
                  value={benefit.requiresContract ? 'Yes' : 'No'}
                />
              </div>

              <div>
                <h3 className="text-[14px] font-medium text-[#0E1629]">
                  Eligibility Rules
                </h3>

                {rules.length === 0 ? (
                  <div className="mt-4 rounded-[16px] px-4 py-4 text-center" />
                ) : (
                  <div className="mt-4 space-y-4">
                    {rules.map((rule) => {
                      const rulePassed = isRulePassing(
                        rule,
                        dialogMode,
                        eligibility,
                      );

                      return (
                        <EligibilityRuleCard
                          key={rule.id}
                          passed={rulePassed}
                          title={formatRuleTitle(rule.ruleType)}
                          description={formatRuleDescription(rule)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {dialogMode === 'locked' && (
                <LockedReasonCard unmetCount={unmetCount} />
              )}

              {existingRequest && dialogMode === 'request' && (
                <div
                  className={`flex items-center gap-3 rounded-[12px] px-[14px] py-[10px] ${
                    statusConfig?.className ?? 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {statusConfig?.icon}
                  <div>
                    <p className="text-[14px] font-normal text-[#7F1D1D]">
                      {statusConfig?.label ?? existingRequest.status}
                    </p>
                    <p className="text-xs opacity-75">
                      {existingRequest.createdAt
                        ? `Submitted on ${new Date(existingRequest.createdAt).toLocaleDateString()}`
                        : 'Request submitted'}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 !h-[33px] !rounded-[6px] !border-[#D8DEE7] !bg-white !text-[#111827] !shadow-none font-normal hover:!bg-[#F8FAFC]"
                  onClick={() => setOpen(false)}
                >
                  {dialogMode === 'eligible' ? 'Cancel' : 'Close'}
                </Button>

                {dialogMode === 'eligible' && !existingRequest && (
                  <Button
                    className="flex-1 !h-[33px] !rounded-[6px] !bg-[#FB923C] font-normal text-white hover:!bg-[#F27E1E]"
                    onClick={handleOpenRequestDialog}
                  >
                    Send request
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BenefitRequestDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        benefit={benefit}
        employee={employee}
        onApplied={onApplied}
      />
    </>
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
    <div className="rounded-[6px] border border-[#E5E7EB] bg-[#F9FAFB] px-[10px] py-[7px] shadow-[0_6px_16px_rgba(15,23,42,0.03)]">
      <p className="mb-1 text-[10px] font-normal text-[#364153]">{label}</p>
      <p className="text-[12px] font-normal text-[#000000]">{value ?? '—-'}</p>
    </div>
  );
}

function EligibilityRuleCard({
  title,
  description,
  passed,
}: {
  title: string;
  description: string;
  passed: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-4 rounded-[12px] px-[14px] py-[10px] ${
        passed ? 'bg-[#ECFDF5]' : 'bg-[#FEF2F2]'
      }`}
    >
      <div
        className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[2px] ${
          passed
            ? 'border-[#0AA370] text-[#0AA370]'
            : 'border-[#EF4444] text-[#EF4444]'
        }`}
      >
        {passed ? (
          <Check size={14} strokeWidth={3} />
        ) : (
          <X size={16} strokeWidth={2} />
        )}
      </div>

      <div className="min-w-0">
        <p
          className={`text-[14px] font-normal ${
            passed ? 'text-[#064E3B]' : 'text-red-900'
          }`}
        >
          {title}
        </p>
        <p
          className={`text-[12px] font-normal ${
            passed ? 'text-[#059669]' : 'text-red-600'
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function LockedReasonCard({ unmetCount }: { unmetCount: number }) {
  return (
    <div className="flex items-start gap-4 rounded-[12px] bg-[#FFFBE9] px-[14px] py-[10px]">
      <AlertTriangle
        className="mt-3 h-5 w-5 shrink-0 text-[#FB923C]"
        strokeWidth={2.5}
      />
      <div>
        <p className="text-[14px] font-normal text-[#7B3306]">
          Why is this benefit locked?
        </p>
        <p className="text-[12px] font-normal text-[#973B00]">
          You currently do not meet {unmetCount || 1} requirement
          {unmetCount === 1 ? '' : 's'} for this benefit.
        </p>
      </div>
    </div>
  );
}

function getDialogMode({
  benefit,
  existingRequest,
  eligibility,
}: {
  benefit: Benefit;
  existingRequest: BenefitRequest | null;
  eligibility: EligibilityResult | null;
}) {
  if (existingRequest?.status === RequestStatus.Approved) return 'active';
  if (!benefit.isActive) return 'locked';
  if (existingRequest) return 'request';
  if (eligibility && !eligibility.eligible) return 'locked';
  if (eligibility?.eligible) return 'eligible';
  return 'request';
}

function getModeLabel(mode: 'active' | 'eligible' | 'locked' | 'request') {
  switch (mode) {
    case 'active':
      return 'active details';
    case 'eligible':
      return 'eligible details';
    case 'locked':
      return 'locked details';
    default:
      return 'pending details';
  }
}

function getModeLabelClass(mode: 'active' | 'eligible' | 'locked' | 'request') {
  switch (mode) {
    case 'eligible':
      return 'text-[#46A3F9]';
    case 'locked':
      return 'text-[#7A7A7A]';
    default:
      return 'text-[#7A7A7A]';
  }
}

function formatRuleTitle(ruleType?: string | null) {
  if (!ruleType) return 'Requirement';

  return ruleType
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatRuleDescription(rule: Rule) {
  return rule.errorMessage ?? `${rule.operator} ${rule.value}`;
}

function isRulePassing(
  rule: Rule,
  mode: 'active' | 'eligible' | 'locked' | 'request',
  eligibility: EligibilityResult | null,
) {
  if (mode === 'active' || mode === 'eligible') return true;

  const errorMessage =
    rule.errorMessage ??
    `${rule.ruleType} ${rule.operator} ${rule.value} — not met`;

  return !eligibility?.errors.includes(errorMessage);
}
