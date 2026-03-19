'use client';

import { X } from 'lucide-react';
import { Employee, EmployeeCreatePanel } from './EmployeeCreatePanel';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (employee: Employee) => void;
};

export function AddEmployeeModal({ open, onClose, onSuccess }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 top-[72px] z-50 flex items-center justify-center bg-[#101828]/55 px-4 py-6">
      <div className="max-h-[calc(100dvh-72px-3rem)] w-full max-w-[820px] overflow-y-auto rounded-[28px] bg-[#FCFCFD] p-5 shadow-2xl md:p-6">
        <div className="mb-6 flex items-end justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#EAECF0] p-2 text-[#667085] transition hover:bg-white hover:text-[#101828]"
            aria-label="Close add employee dialog"
          >
            <X size={18} />
          </button>
        </div>

        <EmployeeCreatePanel onSuccess={onSuccess} onCancel={onClose} />
      </div>
    </div>
  );
}
