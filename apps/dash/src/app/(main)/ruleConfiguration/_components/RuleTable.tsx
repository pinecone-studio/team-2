'use client';

import { RuleRow } from './RuleRow';
import type { RuleRow as RuleRowType } from '../hooks/useRuleConfiguration';
import { useCallback } from 'react';

interface RuleTableProps {
  rules: RuleRowType[];
  onUpdate: (index: number, field: keyof RuleRowType, value: string | boolean) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}

const HEADERS = [
  { label: 'Active', className: 'w-20 rounded-tl-lg' },
  { label: 'Rule type', className: 'w-72' },
  { label: 'Operator', className: 'w-56' },
  { label: 'Value', className: 'w-56' },
  { label: 'Error message', className: 'w-72' },
  { label: 'Priority', className: 'w-20' },
  { label: 'Actions', className: 'w-24 rounded-tr-lg' },
];

const CELL_WIDTHS = ['w-20', 'w-72', 'w-56', 'w-56', 'w-72', 'w-20', 'w-24'];

export function RuleTable({ rules, onUpdate, onRemove, onAdd }: RuleTableProps) {
  const handleUpdate = useCallback(
    (i: number, f: keyof RuleRowType, v: string | boolean) => onUpdate(i, f, v),
    [onUpdate]
  );
  const handleRemove = useCallback((i: number) => onRemove(i), [onRemove]);

  return (
    <div className="self-stretch flex flex-col justify-start items-start w-full">
      {/* Header row */}
      <div className="h-12 inline-flex justify-start items-start w-full">
        {HEADERS.map(({ label, className }) => (
          <div
            key={label}
            className={`self-stretch px-4 py-2 bg-white border-b border-slate-200 flex justify-center items-center gap-2.5 ${className}`}
          >
            <div className="justify-start text-slate-900 text-base font-bold font-['Inter'] leading-6">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Body rows */}
      <div className="w-full flex flex-col">
        {rules.map((rule, index) => (
          <RuleRow
            key={rule.id ?? `row-${index}`}
            rule={rule}
            index={index}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
            onAdd={onAdd}
            isNew={false}
            rowBg={index % 2 === 1 ? 'bg-slate-100' : 'bg-white'}
            cellWidths={CELL_WIDTHS}
          />
        ))}
        <RuleRow
          key="new-row"
          rule={{ ruleType: '', operator: '', value: '', errorMessage: '', isActive: false }}
          index={rules.length}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
          onAdd={onAdd}
          isNew
          rowBg="bg-white"
          cellWidths={CELL_WIDTHS}
        />
      </div>
    </div>
  );
}
