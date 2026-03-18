'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@team/source-ui';

import { Plus, Trash2, Beaker } from 'lucide-react';
import { useState } from 'react';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import {
  CreateBenefitDocument,
  CreateBenefitMutationVariables,
  CreateEligibilityRuleDocument,
  GetBenefitsQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { toast } from 'sonner';
import { BenefitDetailsStep } from './BenefitDetailsStep';
import { EligibilityRulesStep, RuleForm } from './EligibilityRulesStep';

type Benefit = GetBenefitsQuery['benefits'][number];

type Props = {
  onCreated: (benefit: Benefit) => void;
};

const emptyRule = (): RuleForm => ({
  ruleType: '',
  operator: '',
  value: '',
  errorMessage: '',
  isActive: true,
});

const STEPS = ['Benefit Details', 'Eligibility Rules'] as const;

export const AddBenefitDialog = ({ onCreated }: Props) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addRules, setAddRules] = useState(false);
  const [rules, setRules] = useState<RuleForm[]>([emptyRule()]);
  const [contractFile, setContractFile] = useState<File | null>(null);

  const [form, setForm] = useState<CreateBenefitMutationVariables['input']>({
    name: '',
    category: '',
    description: '',
    vendorName: '',
    subsidyPercent: 0,
    isActive: true,
    requiresContract: false,
    contractExpiryDate: '',
    r2ObjectKey: '',
  });

  function updateForm<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateRule<K extends keyof RuleForm>(
    index: number,
    key: K,
    value: RuleForm[K],
  ) {
    setRules((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [key]: value } : r)),
    );
  }

  function addRuleRow() {
    setRules((prev) => [...prev, emptyRule()]);
  }

  function removeRuleRow(index: number) {
    setRules((prev) => prev.filter((_, i) => i !== index));
  }

  function handleClose() {
    setOpen(false);
    setStep(0);
    setAddRules(false);
    setRules([emptyRule()]);
    setError('');
    setContractFile(null);
    setForm({
      name: '',
      category: '',
      description: '',
      vendorName: '',
      subsidyPercent: 0,
      isActive: true,
      requiresContract: false,
      contractExpiryDate: '',
      r2ObjectKey: '',
    });
  }

  function fillDemoData() {
    setForm({
      name: 'Premium Health Insurance',
      category: 'Health',
      description:
        'Comprehensive medical and dental coverage for full-time employees.',
      vendorName: 'BlueCross Shield',
      subsidyPercent: 75,
      isActive: true,
      requiresContract: true,
      contractExpiryDate: '2025-12-31',
      r2ObjectKey: 'demo-contract-key',
    });
    setAddRules(true);
    setRules([
      {
        ruleType: 'responsibility_level',
        operator: 'gte',
        value: '1',
        errorMessage: 'Only level 2 or above employees are eligible.',
        isActive: true,
      },
      {
        ruleType: 'department',
        operator: 'equals',
        value: 'Engineering',
        errorMessage: 'Benefit limited to Engineering department.',
        isActive: true,
      },
    ]);
  }

  async function handleFinish() {
    setLoading(true);
    setError('');
    try {
      // Step 1: upload file to R2 via Worker if a file was selected
      let uploadedKey: string | undefined;
      if (contractFile) {
        const fd = new FormData();
        fd.append('file', contractFile);

        const uploadRes = await fetch(
          'https://team-service.nbhishgee22.workers.dev/api/upload',
          { method: 'POST', body: fd },
        );
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadJson?.message ?? 'Upload failed');

        uploadedKey = uploadJson.key;
      }

      // Step 2: create benefit in D1, attaching the R2 key if we got one
      const data = await gqlRequest(CreateBenefitDocument, {
        input: {
          ...form,
          r2ObjectKey: uploadedKey ?? form.r2ObjectKey,
          requiresContract: uploadedKey ? true : form.requiresContract,
          contractUploadedAt: uploadedKey
            ? new Date().toISOString()
            : undefined,
        },
      });
      const createdBenefit = data.createBenefit;

      if (addRules && rules.length > 0) {
        await Promise.all(
          rules
            .filter((r) => r.ruleType)
            .map((r) =>
              gqlRequest(CreateEligibilityRuleDocument, {
                input: { ...r, benefitId: createdBenefit.id },
              }),
            ),
        );
      }

      onCreated(createdBenefit);
      handleClose();
      toast.success('Successfully added new benefit', {
        className: 'my-custom-class',
        style: { background: '#43A047', color: '#ffffff', border: '0' },
      });
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong');
      toast.error('Benefit has not been added', {
        className: 'my-custom-class',
        style: { background: '#E53935', color: '#ffffff', border: '0' },
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (step === 0 && addRules) {
      setStep(1);
    } else {
      await handleFinish();
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(v) => (v ? setOpen(true) : handleClose())}
      >
        <DialogTrigger asChild>
          <Button className="flex-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 border-0">
            <Plus />
            <span className="font-semibold text-sm">Add Benefit</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl">
          <form onSubmit={handleNext}>
            {/* Header */}
            <div className="bg-gray-100 px-6 py-5 flex items-center justify-between rounded-2xl mt-4">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Add New Benefit
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillDemoData}
                  className="h-7 text-xs flex items-center gap-1"
                >
                  Demo Button
                </Button>
              </div>
            </div>

            {/* Step indicator — only when addRules is checked */}
            {addRules && (
              <div className="px-6 pt-4">
                <span className="flex items-center gap-2">
                  {STEPS.map((label, i) => (
                    <span key={label} className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                          i === step
                            ? 'bg-blue-600 text-white'
                            : i < step
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={
                          i === step
                            ? 'text-orange-400 font-medium text-sm'
                            : 'text-gray-400 text-sm'
                        }
                      >
                        {label}
                      </span>
                      {i < STEPS.length - 1 && (
                        <span className="text-gray-300">→</span>
                      )}
                    </span>
                  ))}
                </span>
              </div>
            )}

            {/* Body */}
            <div className="px-6 pb-2 max-h-[60vh] overflow-y-auto">
              {step === 0 && (
                <BenefitDetailsStep
                  form={form}
                  addRules={addRules}
                  contractFile={contractFile}
                  onFormChange={updateForm}
                  onAddRulesChange={setAddRules}
                  onContractFileChange={setContractFile}
                />
              )}

              {step === 1 && (
                <EligibilityRulesStep
                  rules={rules}
                  onRuleChange={updateRule}
                  onAddRule={addRuleRow}
                  onRemoveRule={removeRuleRow}
                />
              )}

              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex gap-3">
              {step === 0 ? (
                <>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 rounded-lg border-gray-300 text-gray-800 font-semibold h-12"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-lg bg-orange-400 hover:bg-orange-500 text-white font-semibold h-12 border-0"
                  >
                    {addRules
                      ? 'Next: Add Rules →'
                      : loading
                        ? 'Saving...'
                        : 'Add Benefit'}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(0)}
                    disabled={loading}
                    className="flex-1 rounded-lg border-gray-300 text-gray-800 font-semibold h-12"
                  >
                    ← Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-lg bg-orange-400 hover:bg-orange-500 text-white font-semibold h-12 border-0"
                  >
                    {loading ? 'Saving...' : 'Save Benefit & Rules'}
                  </Button>
                </>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
