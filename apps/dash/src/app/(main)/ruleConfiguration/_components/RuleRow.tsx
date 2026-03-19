'use client';

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@team/source-ui';
import type { RuleRow as RuleRowType } from '../hooks/useRuleConfiguration';
import { useCallback } from 'react';
import { RULE_TYPES, OPERATORS } from './constants';
import { RuleRowActions } from './RuleRowActions';
import { RuleCell } from './RuleCell';

interface RuleRowProps {
  rule: RuleRowType;
  index: number;
  onUpdate: (index: number, field: keyof RuleRowType, value: string | boolean) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
  isNew?: boolean;
  rowBg: string;
  cellWidths: string[];
}

export function RuleRow({
  rule,
  index,
  onUpdate,
  onRemove,
  onAdd,
  isNew = false,
  rowBg,
  cellWidths,
}: RuleRowProps) {
  const update = useCallback(
    (f: keyof RuleRowType, v: string | boolean) => onUpdate(index, f, v === '__placeholder__' ? '' : v),
    [index, onUpdate]
  );

  const [wActive, wType, wOp, wVal, wErr, wPri, wAct] = cellWidths;
  const inputOutline = isNew ? 'outline-slate-300' : 'outline-slate-200';
  const placeholderClass = isNew ? 'text-slate-400' : 'text-slate-900';

  return (
    <div className={`inline-flex justify-start items-start w-full ${rowBg}`}>
      <RuleCell className={wActive} rowBg={rowBg}>
        <Switch
          checked={rule.isActive}
          onCheckedChange={(v: boolean) => update('isActive', v)}
          className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-zinc-100 h-5 w-9 rounded-[99px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]"
        />
      </RuleCell>

      <RuleCell className={wType} rowBg={rowBg}>
        <Select value={rule.ruleType || '__placeholder__'} onValueChange={(v: string) => update('ruleType', v)}>
          <SelectTrigger
            className={`h-10 w-64 rounded-2xl outline outline-1 outline-offset-[-1px] bg-white ${inputOutline} ${isNew ? placeholderClass : ''} text-sm font-normal font-['Inter']`}
          >
            <SelectValue placeholder="Select Type..." />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-200">
            <SelectItem value="__placeholder__" className="text-slate-400">Select Type...</SelectItem>
            {RULE_TYPES.map((o) => (
              <SelectItem key={o.value} value={o.value} className="font-['Inter']">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </RuleCell>

      <RuleCell className={wOp} rowBg={rowBg}>
        <Select value={rule.operator || '__placeholder__'} onValueChange={(v: string) => update('operator', v)}>
          <SelectTrigger
            className={`h-10 w-48 rounded-2xl outline outline-1 outline-offset-[-1px] bg-white ${inputOutline} text-sm font-normal font-['Inter']`}
          >
            <SelectValue placeholder="Operator..." />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-200">
            <SelectItem value="__placeholder__" className="text-slate-400">Operator...</SelectItem>
            {OPERATORS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="font-['Inter']">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </RuleCell>

      <RuleCell className={wVal} rowBg={rowBg}>
        <Input
          placeholder="Value..."
          value={rule.value}
          onChange={(e) => update('value', e.target.value)}
          className={`h-10 w-48 px-3 py-2.5 rounded-2xl outline outline-1 outline-offset-[-1px] bg-white ${inputOutline} text-slate-900 text-sm font-normal font-['Inter'] placeholder:text-slate-400 border-0`}
        />
      </RuleCell>

      <RuleCell className={wErr} rowBg={rowBg}>
        <Input
          placeholder="Custom error message..."
          value={rule.errorMessage}
          onChange={(e) => update('errorMessage', e.target.value)}
          className={`h-10 w-64 px-3 py-2.5 rounded-2xl outline outline-1 outline-offset-[-1px] bg-white ${inputOutline} text-slate-600 text-sm font-normal font-['Inter'] placeholder:text-slate-400 border-0`}
        />
      </RuleCell>

      <RuleCell className={wPri} rowBg={rowBg}>
        <div className="w-7 h-7 p-2.5 rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)] outline outline-1 outline-offset-[-1px] outline-zinc-950/20 inline-flex flex-col justify-center items-center gap-2.5">
          <span className="self-stretch text-black text-base font-bold font-['Inter'] leading-6 text-center">
            {index + 1}
          </span>
        </div>
      </RuleCell>

      <RuleCell className={wAct} rowBg={rowBg}>
        <RuleRowActions id={rule.id} isNew={isNew} onRemove={onRemove} onAdd={onAdd} index={index} />
      </RuleCell>
    </div>
  );
}
