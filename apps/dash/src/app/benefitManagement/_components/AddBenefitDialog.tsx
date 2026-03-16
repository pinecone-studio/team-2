'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldGroup,
  Input,
  Label,
} from '@team/source-ui';

import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import {
  CreateBenefitDocument,
  CreateBenefitMutationVariables,
  CreateEligibilityRuleDocument,
  CreateEligibilityRuleInput,
  GetBenefitsQuery,
} from 'apps/dash/src/graphql/generated/graphql';

type Benefit = GetBenefitsQuery['benefits'][number];

type Props = {
  onCreated: (benefit: Benefit) => void;
};

type RuleForm = Omit<CreateEligibilityRuleInput, 'benefitId'>;

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

  async function handleFinish() {
    setLoading(true);
    setError('');
    try {
      // Step 1: create benefit
      const data = await gqlRequest(CreateBenefitDocument, {
        input: {
          ...form,
          contractUploadedAt: new Date().toISOString(),
        },
      });
      const createdBenefit = data.createBenefit;

      // Step 2: create rules if user opted in
      if (addRules && rules.length > 0) {
        await Promise.all(
          rules
            .filter((r) => r.ruleType) // skip empty rows
            .map((r) =>
              gqlRequest(CreateEligibilityRuleDocument, {
                input: { ...r, benefitId: createdBenefit.id },
              }),
            ),
        );
      }

      onCreated(createdBenefit);
      handleClose();
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong');
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
          <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 h-10">
            <Plus />
            <span className="font-semibold text-sm">Add Benefit</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleNext}>
            <DialogHeader>
              <DialogTitle>Add New Benefit</DialogTitle>
              <DialogDescription>
                {/* Step indicator */}
                <span className="flex items-center gap-2 mt-1">
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
                            ? 'text-blue-600 font-medium'
                            : 'text-gray-400'
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
              </DialogDescription>
            </DialogHeader>

            {/* ── STEP 0: Benefit Details ── */}
            {step === 0 && (
              <FieldGroup>
                <Field>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Health Insurance"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g. Health, Transport"
                    value={form.category ?? ''}
                    onChange={(e) => updateForm('category', e.target.value)}
                  />
                </Field>

                <Field>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Short description"
                    value={form.description ?? ''}
                    onChange={(e) => updateForm('description', e.target.value)}
                  />
                </Field>

                <Field>
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input
                    id="vendorName"
                    placeholder="e.g. Manulife"
                    value={form.vendorName ?? ''}
                    onChange={(e) => updateForm('vendorName', e.target.value)}
                  />
                </Field>

                <Field>
                  <Label htmlFor="subsidyPercent">Subsidy %</Label>
                  <Input
                    id="subsidyPercent"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0–100"
                    value={form.subsidyPercent ?? 0}
                    onChange={(e) =>
                      updateForm('subsidyPercent', Number(e.target.value))
                    }
                  />
                </Field>

                <Field>
                  <Label htmlFor="contractExpiryDate">
                    Contract Expiry Date
                  </Label>
                  <Input
                    id="contractExpiryDate"
                    type="date"
                    value={form.contractExpiryDate ?? ''}
                    onChange={(e) =>
                      updateForm('contractExpiryDate', e.target.value)
                    }
                  />
                </Field>

                <Field>
                  <Label
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(form.requiresContract)}
                      onChange={(e) =>
                        updateForm('requiresContract', e.target.checked)
                      }
                    />
                    Requires Contract
                  </Label>
                </Field>

                <Field>
                  <Label
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(form.isActive)}
                      onChange={(e) => updateForm('isActive', e.target.checked)}
                    />
                    Is Active
                  </Label>
                </Field>

                {/* Optional rules toggle */}
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-blue-300 bg-blue-50 px-4 py-3">
                  <input
                    type="checkbox"
                    id="addRules"
                    checked={addRules}
                    onChange={(e) => setAddRules(e.target.checked)}
                    className="accent-blue-600"
                  />
                  <Label
                    htmlFor="addRules"
                    className="text-blue-700 font-medium cursor-pointer"
                  >
                    Add eligibility rules to this benefit
                  </Label>
                </div>
              </FieldGroup>
            )}

            {/* ── STEP 1: Eligibility Rules ── */}
            {step === 1 && (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-gray-500">
                  Define rules that determine which employees are eligible for
                  this benefit. All fields are optional per rule.
                </p>

                {rules.map((rule, i) => (
                  <div
                    key={i}
                    className="relative rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Rule {i + 1}
                      </span>
                      {rules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRuleRow(i)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <FieldGroup>
                      <Field>
                        <Label>Rule Type</Label>
                        <Input
                          placeholder="e.g. department, responsibility_level"
                          value={rule.ruleType ?? ''}
                          onChange={(e) =>
                            updateRule(i, 'ruleType', e.target.value)
                          }
                        />
                      </Field>
                      <Field>
                        <Label>Operator</Label>
                        <Input
                          placeholder="e.g. equals, gte, lte"
                          value={rule.operator ?? ''}
                          onChange={(e) =>
                            updateRule(i, 'operator', e.target.value)
                          }
                        />
                      </Field>
                      <Field>
                        <Label>Value</Label>
                        <Input
                          placeholder="e.g. Engineering, L3"
                          value={rule.value ?? ''}
                          onChange={(e) =>
                            updateRule(i, 'value', e.target.value)
                          }
                        />
                      </Field>
                      <Field>
                        <Label>Error Message</Label>
                        <Input
                          placeholder="Shown when rule fails"
                          value={rule.errorMessage ?? ''}
                          onChange={(e) =>
                            updateRule(i, 'errorMessage', e.target.value)
                          }
                        />
                      </Field>
                      <Field>
                        <Label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(rule.isActive)}
                            onChange={(e) =>
                              updateRule(i, 'isActive', e.target.checked)
                            }
                          />
                          Rule is Active
                        </Label>
                      </Field>
                    </FieldGroup>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={addRuleRow}
                >
                  <Plus size={14} className="mr-1" /> Add Another Rule
                </Button>
              </div>
            )}

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <DialogFooter className="mt-5">
              {step === 0 ? (
                <>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading}>
                    {addRules
                      ? 'Next: Add Rules →'
                      : loading
                        ? 'Saving...'
                        : 'Save Benefit'}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(0)}
                    disabled={loading}
                  >
                    ← Back
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Benefit & Rules'}
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
