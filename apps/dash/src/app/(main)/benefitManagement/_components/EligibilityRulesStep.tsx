'use client';

import { Button, Field, FieldGroup, Input, Label } from '@team/source-ui';

import { Plus, Trash2 } from 'lucide-react';
import { CreateEligibilityRuleInput } from 'apps/dash/src/graphql/generated/graphql';

export type RuleForm = Omit<CreateEligibilityRuleInput, 'benefitId'>;

type Props = {
  rules: RuleForm[];
  onRuleChange: <K extends keyof RuleForm>(
    index: number,
    key: K,
    value: RuleForm[K],
  ) => void;
  onAddRule: () => void;
  onRemoveRule: (index: number) => void;
};

export const EligibilityRulesStep = ({
  rules,
  onRuleChange,
  onAddRule,
  onRemoveRule,
}: Props) => {
  return (
    <div className="mt-4 space-y-4">
      <p className="text-xs text-gray-500">
        Define rules that determine which employees are eligible for this
        benefit. All fields are optional per rule.
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
                onClick={() => onRemoveRule(i)}
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
                onChange={(e) => onRuleChange(i, 'ruleType', e.target.value)}
              />
            </Field>
            <Field>
              <Label>Operator</Label>
              <Input
                placeholder="e.g. equals, gte, lte"
                value={rule.operator ?? ''}
                onChange={(e) => onRuleChange(i, 'operator', e.target.value)}
              />
            </Field>
            <Field>
              <Label>Value</Label>
              <Input
                placeholder="e.g. Engineering, L3"
                value={rule.value ?? ''}
                onChange={(e) => onRuleChange(i, 'value', e.target.value)}
              />
            </Field>
            <Field>
              <Label>Error Message</Label>
              <Input
                placeholder="Shown when rule fails"
                value={rule.errorMessage ?? ''}
                onChange={(e) =>
                  onRuleChange(i, 'errorMessage', e.target.value)
                }
              />
            </Field>
          </FieldGroup>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed"
        onClick={onAddRule}
      >
        <Plus size={14} className="mr-1" /> Add Another Rule
      </Button>
    </div>
  );
};
