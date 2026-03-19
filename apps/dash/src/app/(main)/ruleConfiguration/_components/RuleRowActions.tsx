'use client';

import { Trash2, Plus } from 'lucide-react';
import { useCallback } from 'react';

interface RuleRowActionsProps {
  id?: number;
  isNew: boolean;
  onRemove: (index: number) => void;
  onAdd: () => void;
  index: number;
}

export function RuleRowActions({ id, isNew, onRemove, onAdd, index }: RuleRowActionsProps) {
  const handleRemove = useCallback(() => onRemove(index), [index, onRemove]);

  if (id != null || !isNew) {
    return (
      <button
        type="button"
        onClick={handleRemove}
        className="w-5 h-5 flex items-center justify-center text-red-600 hover:opacity-80"
        aria-label="Delete rule"
      >
        <Trash2 className="w-4 h-4" strokeWidth={2} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onAdd}
      className="w-6 h-6 flex items-center justify-center text-slate-900 hover:opacity-80"
      aria-label="Add rule"
    >
      <Plus className="w-4 h-4" strokeWidth={1.5} />
    </button>
  );
}
