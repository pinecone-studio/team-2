'use client';

import React from 'react';

interface RuleCellProps {
  className?: string;
  rowBg: string;
  children: React.ReactNode;
}

export function RuleCell({ className, rowBg, children }: RuleCellProps) {
  return (
    <div
      className={`h-20 px-4 py-2 border-b border-slate-200 flex justify-center items-center gap-2.5 ${className} ${rowBg}`}
    >
      {children}
    </div>
  );
}
