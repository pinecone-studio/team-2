'use client';

import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@team/source-ui';
import { CheckCircle, FileText, X } from 'lucide-react';

import {
  CreateBenefitRequestDocument,
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitsQuery,
  GetEmployeesQuery,
  RequestStatus,
} from 'apps/web/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';

type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  benefit: Benefit;
  employee: Employee;
  onApplied: (request: BenefitRequest) => void;
};

type Step = 1 | 2 | 3;

export function BenefitRequestDialog({
  open,
  onOpenChange,
  benefit,
  employee,
  onApplied,
}: Props) {
  const [step, setStep] = useState<Step>(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [contractPreviewOpen, setContractPreviewOpen] = useState(false);

  const contractUrl = benefit.r2ObjectKey
    ? `https://team-service.nbhishgee22.workers.dev/api/images/${benefit.r2ObjectKey}`
    : '';

  function resetState() {
    setStep(1);
    setAcceptedTerms(false);
    setSubmitting(false);
    setError('');
    setContractPreviewOpen(false);
  }

  function handleDialogChange(nextOpen: boolean) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetState();
    }
  }

  useEffect(() => {
    if (step !== 3 || !open) return;

    const timer = window.setTimeout(() => {
      handleDialogChange(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [step, open, onOpenChange]);

  async function handleSubmit() {
    setSubmitting(true);
    setError('');

    try {
      const employeeId = Number.parseInt(employee.id, 10);

      if (Number.isNaN(employeeId)) {
        throw new Error('Invalid employee id');
      }

      const data = await gqlRequest(CreateBenefitRequestDocument, {
        input: {
          benefitId: benefit.id,
          employeeId,
          status: RequestStatus.Pending,
          createdAt: new Date().toISOString(),
        },
      });

      onApplied(data.createBenefitRequest);
      setStep(3);
    } catch (e: any) {
      setError(e.message ?? 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDownloadContract() {
    if (!contractUrl) return;

    const res = await fetch(contractUrl);
    if (!res.ok) {
      throw new Error('Download failed');
    }

    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = `${benefit.name ?? 'contract'}-contract`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[8px] border border-[#E7ECF3] bg-white p-0 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:max-w-[430px]">
          <DialogTitle className="sr-only">
            {benefit.name} request dialog
          </DialogTitle>

          {step === 1 && (
            <div className="p-4">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-[16px] font-normal text-[#0A0A0A]">
                  {benefit.name}
                </DialogTitle>
              </DialogHeader>

              <RequestStepper step={1} />

              <div className="mt-5 space-y-4">
                <p className="text-sm text-[#64748B]">
                  Please review the contract agreement before proceeding.
                </p>

                {contractUrl && (
                  <button
                    type="button"
                    onClick={() => setContractPreviewOpen(true)}
                    className="inline-flex h-[30px] max-w-fit items-center gap-2 rounded-[8px] border border-[#E5E7EB] bg-[#F3F4F6] px-[10px] text-left transition hover:bg-[#EDEFF3]"
                  >
                    <FileText size={14} className="shrink-0 text-[#9CA3AF]" />
                    <span className="truncate text-[13px] font-normal text-[#9CA3AF]">
                      {`${benefit.name}.pdf`}
                    </span>
                  </button>
                )}

                {benefit.requiresContract && !benefit.r2ObjectKey && (
                  <div className="inline-flex h-[30px] max-w-fit items-center gap-2 rounded-[8px] border border-dashed border-[#E5E7EB] bg-[#F3F4F6] px-[10px] text-[13px] font-normal text-[#9CA3AF]">
                    <FileText size={14} className="shrink-0 text-[#9CA3AF]" />
                    No contract file
                  </div>
                )}

                <div className="rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <h3 className="mb-3 text-sm font-medium text-[#0F172A]">
                    Terms & Conditions
                  </h3>

                  <div className="space-y-3 text-xs leading-5 text-[#475569]">
                    <p>
                      This agreement is entered into between{' '}
                      <span className="font-semibold">
                        {benefit.vendorName ?? 'the vendor'}
                      </span>{' '}
                      and the company for employee benefit services.
                    </p>

                    <p>
                      <span className="font-medium text-[#0F172A]">
                        1. Services Provided:
                      </span>{' '}
                      The vendor agrees to provide the services covered by this
                      benefit to eligible employees.
                    </p>

                    <p>
                      <span className="font-medium text-[#0F172A]">
                        2. Employee Obligations:
                      </span>{' '}
                      Employees must remain actively employed and continue
                      meeting all eligibility requirements.
                    </p>

                    <p>
                      <span className="font-medium text-[#0F172A]">
                        3. Company Subsidy:
                      </span>{' '}
                      The company will subsidize up to{' '}
                      {benefit.subsidyPercent ?? 0}% of the approved cost.
                    </p>

                    <p>
                      <span className="font-medium text-[#0F172A]">
                        4. HR Review:
                      </span>{' '}
                      Once submitted, the request will be reviewed by HR before
                      final approval.
                    </p>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-[#E2E8F0] bg-white px-4 py-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-[#0F172A]">
                    Accept terms and conditions
                  </span>
                </label>
              </div>

              <div className="mt-5 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 !h-[33px] !rounded-[6px] !border-[#D8DEE7] !bg-white !text-[#111827] !shadow-none font-normal hover:!bg-[#F8FAFC]"
                  onClick={() => handleDialogChange(false)}
                >
                  Close
                </Button>

                <Button
                  className="flex-1 !h-[33px] !rounded-[6px] !bg-[#FB923C] font-normal text-white hover:!bg-[#F27E1E]"
                  onClick={() => setStep(2)}
                  disabled={!acceptedTerms}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-4">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-[16px] font-normal text-[#0A0A0A]">
                  {benefit.name}
                </DialogTitle>
              </DialogHeader>

              <RequestStepper step={2} />

              <div className="mt-5 space-y-4">
                <p className="text-sm text-[#64748B]">
                  Review your request details and submit.
                </p>

                <div className="rounded-[12px] border border-[#D9E3F0] bg-[#F8FAFF] p-4">
                  <h3 className="mb-4 text-sm font-medium text-[#0F172A]">
                    Request Summary
                  </h3>

                  <div className="space-y-3 text-sm">
                    <SummaryRow label="Benefit" value={benefit.name} />
                    <SummaryRow
                      label="Vendor"
                      value={benefit.vendorName ?? '—'}
                    />
                    <SummaryRow
                      label="Company Subsidy"
                      value={`${benefit.subsidyPercent ?? 0}%`}
                    />
                    <SummaryRow label="Contract Accepted" value="Yes" />
                  </div>
                </div>

                <p className="text-xs text-[#64748B]">
                  Once submitted, your request will be reviewed by HR.
                </p>

                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>

              <div className="mt-5 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 !h-[33px] !rounded-[6px] !border-[#D8DEE7] !bg-white !text-[#111827] !shadow-none font-normal hover:!bg-[#F8FAFC]"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>

                <Button
                  className="flex-1 !h-[33px] !rounded-[6px] !bg-[#FB923C] font-normal text-white hover:!bg-[#F27E1E]"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? 'Sending request...' : 'Submit'}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="px-6 py-10 text-center">
              <DialogHeader className="mb-4">
                <DialogTitle className="sr-only">
                  Request submitted successfully
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center">
                <CheckCircle className="mb-4 h-14 w-14 text-green-500" />

                <h3 className="text-xl font-medium text-[#0F172A]">
                  You have successfully
                  <br />
                  submitted your request
                </h3>

                <p className="mt-3 max-w-[280px] text-sm text-[#64748B]">
                  The HR team will review your request and respond within 1–2
                  business days.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={contractPreviewOpen} onOpenChange={setContractPreviewOpen}>
        <DialogContent className="z-[100] max-h-[85vh] overflow-hidden p-0 sm:max-w-4xl">
          <DialogTitle className="sr-only">
            {benefit.name} contract preview
          </DialogTitle>

          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-sm font-semibold text-[#17233C]">
              {benefit.name} contract
            </h3>

            <button
              type="button"
              onClick={() => setContractPreviewOpen(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>

          <div className="h-[70vh] w-full bg-gray-50">
            <iframe
              key={contractUrl}
              src={contractUrl}
              title={`${benefit.name} contract`}
              className="h-full w-full"
            />
          </div>

          <div className="flex justify-end gap-2 border-t px-4 py-3">
            <button
              type="button"
              onClick={handleDownloadContract}
              className="rounded-md bg-orange-400 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
            >
              Download
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function RequestStepper({ step }: { step: Step }) {
  return (
    <div className="grid grid-cols-[24px_1fr_24px_1fr_24px] items-center gap-2">
      <StepCircle
        number={1}
        variant={step === 1 ? 'blue' : step > 1 ? 'green' : 'gray'}
      />
      <StepLine active={step >= 2} />
      <StepCircle
        number={2}
        variant={step === 2 ? 'green' : step > 2 ? 'green' : 'gray'}
      />
      <StepLine active={step >= 3} />
      <StepCircle number={3} variant={step === 3 ? 'green' : 'gray'} />
    </div>
  );
}

function StepCircle({
  number,
  variant,
}: {
  number: number;
  variant: 'blue' | 'green' | 'gray';
}) {
  const className =
    variant === 'blue'
      ? 'bg-[#3B82F6] text-white'
      : variant === 'green'
        ? 'bg-[#10B981] text-white'
        : 'bg-[#E2E8F0] text-[#64748B]';

  return (
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${className}`}
    >
      {number}
    </div>
  );
}

function StepLine({ active }: { active: boolean }) {
  return (
    <div
      className={`h-[3px] w-full rounded-full ${
        active ? 'bg-[#10B981]' : 'bg-[#DDE5EF]'
      }`}
    />
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#64748B]">{label}</span>
      <span className="text-right font-medium text-[#0F172A]">{value}</span>
    </div>
  );
}
