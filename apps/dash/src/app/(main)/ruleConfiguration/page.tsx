'use client';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@team/source-ui';
import { useRuleConfiguration } from './hooks/useRuleConfiguration';
import { RuleTable } from './_components/RuleTable';
import { useCallback } from 'react';

type FooterProps = {
  hasChanges: boolean;
  publishing: boolean;
  onDiscard: () => void;
  onPublish: () => void;
};

const Footer = ({ hasChanges, publishing, onDiscard, onPublish }: FooterProps) => (
  <div className="self-stretch px-6 py-4 bg-white rounded-bl-lg rounded-br-lg border-t border-slate-200 inline-flex justify-between items-center">
    <div className="justify-center text-slate-500 text-sm font-normal font-['Montserrat']">
      Pro Tip: Priority level determines execution order when multiple rules conflict.
    </div>
    <div className="flex justify-start items-start gap-3">
      <button
        type="button"
        onClick={onDiscard}
        disabled={!hasChanges}
        className="px-4 py-2 inline-flex flex-col justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
      >
        <span className="w-28 h-5 text-center justify-center text-slate-600 text-sm font-semibold font-['Inter'] leading-5">
          Discard Changes
        </span>
      </button>
      <Button
        onClick={onPublish}
        disabled={!hasChanges || publishing}
        className="px-6 py-2 bg-blue-600 rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] inline-flex flex-col justify-center items-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="w-24 h-5 text-center justify-center text-white text-sm font-bold font-['Inter'] leading-5">
          {publishing ? 'Publishing...' : 'Publish Rules'}
        </span>
      </Button>
    </div>
  </div>
);

const HelpSection = () => (
  <div className="w-[1272px] p-4 bg-slate-100 rounded-lg inline-flex flex-col justify-start items-start gap-2.5">
    <div className="self-stretch justify-start text-slate-900 text-base font-bold font-['Inter'] leading-6">How Rules Work</div>
    <div className="self-stretch h-10 justify-start text-gray-600 text-sm font-normal font-['Lato'] leading-6 tracking-tight">Eligibility rules are evaluated for each employee when they request a benefit. All enabled rules must pass for an employee to be eligible. Rules are evaluated in priority order, with lower numbers evaluated first. If any rule fails, the corresponding error message is shown to the employee.</div>
</div>
);

export default function RuleConfigurationPage() {
  const {
    benefits,
    selectedId,
    setSelectedId,
    rules,
    loading,
    publishing,
    hasChanges,
    updateRule,
    addRow,
    removeRow,
    discard,
    publish,
  } = useRuleConfiguration();

  const handleBenefitChange = useCallback(
    (v: string) => setSelectedId(v ? Number(v) : null),
    [setSelectedId]
  );

  return (
    <div className="w-full flex shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)] flex-col justify-start items-start gap-6">
      <div className="w-full max-w-[1272px] flex flex-col justify-start items-start gap-1">
        <div className="self-stretch justify-start text-gray-900 text-2xl font-bold font-['Montserrat']">
          Rule Configuration
        </div>
        <div className="self-stretch justify-start text-gray-500 text-base font-normal font-['Montserrat']">
          Configure eligibility rules for benefits
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-slate-700 text-sm font-semibold font-['Inter']">Benefit</span>
        <Select
          value={selectedId ? String(selectedId) : ''}
          onValueChange={(v: string) => handleBenefitChange(v)}
        >
          <SelectTrigger className="w-[280px] h-10 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-['Inter']">
            <SelectValue placeholder="Select benefit..." />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-200 bg-white">
            {benefits.map((b) => (
              <SelectItem key={b.id} value={String(b.id)} className="font-['Inter']">
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full max-w-[1272px] flex flex-col justify-center items-start">
        {loading ? (
          <div className="w-full py-16 text-center text-slate-500 text-sm font-['Inter']">
            Loading...
          </div>
        ) : (
          <>
            <div className="self-stretch flex flex-col rounded-lg border border-slate-200 bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)] overflow-hidden">
              <RuleTable rules={rules} onUpdate={updateRule} onRemove={removeRow} onAdd={addRow} />
              <Footer
                hasChanges={hasChanges}
                publishing={publishing}
                onDiscard={discard}
                onPublish={publish}
              />
            </div>
            <HelpSection />
          </>
        )}
      </div>
    </div>
  );
}
