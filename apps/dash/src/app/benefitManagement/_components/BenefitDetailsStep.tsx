'use client';

import { UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { CreateBenefitMutationVariables } from 'apps/dash/src/graphql/generated/graphql';

type BenefitForm = CreateBenefitMutationVariables['input'];

type Props = {
  form: BenefitForm;
  addRules: boolean;
  contractFile: File | null;
  onFormChange: <K extends keyof BenefitForm>(
    key: K,
    value: BenefitForm[K],
  ) => void;
  onAddRulesChange: (value: boolean) => void;
  onContractFileChange: (file: File | null) => void;
};

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition';

const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5';

export const BenefitDetailsStep = ({
  form,
  addRules,
  contractFile,
  onFormChange,
  onAddRulesChange,
  onContractFileChange,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) onContractFileChange(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    onContractFileChange(file);
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Benefit Title */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Benefit Title
        </label>
        <input
          id="name"
          className={inputClass}
          placeholder="e.g., Health Insurance"
          value={form.name}
          onChange={(e) => onFormChange('name', e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Describe the benefit..."
          value={form.description ?? ''}
          onChange={(e) => onFormChange('description', e.target.value)}
        />
      </div>

      {/* Category + Contract Expiry (2-col) */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <input
            id="category"
            className={inputClass}
            value={form.category ?? ''}
            onChange={(e) => onFormChange('category', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contractExpiryDate" className={labelClass}>
            Contract Expiry
          </label>
          <input
            id="contractExpiryDate"
            type="date"
            className={inputClass}
            value={form.contractExpiryDate ?? ''}
            onChange={(e) => onFormChange('contractExpiryDate', e.target.value)}
          />
        </div>
      </div>

      {/* Subsidy + Vendor (2-col) */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="subsidyPercent" className={labelClass}>
            Subsidy
          </label>
          <div className="relative">
            <input
              id="subsidyPercent"
              type="number"
              min={0}
              max={100}
              className={`${inputClass} pr-8`}
              placeholder="0–100"
              value={form.subsidyPercent ?? 0}
              onChange={(e) =>
                onFormChange('subsidyPercent', Number(e.target.value))
              }
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
              %
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="vendorName" className={labelClass}>
            Vendor
          </label>
          <input
            id="vendorName"
            className={inputClass}
            value={form.vendorName ?? ''}
            onChange={(e) => onFormChange('vendorName', e.target.value)}
          />
        </div>
      </div>

      {/* Attachments */}
      <div>
        <label className={labelClass}>Contract</label>
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 cursor-pointer transition-colors ${
            dragging
              ? 'border-orange-400 bg-orange-50'
              : 'border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          <UploadCloud size={28} className="text-gray-400" />
          {contractFile ? (
            <span className="text-sm font-medium text-gray-700">
              {contractFile.name}
            </span>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-400">
                PDF, DOC, XLS (max. 10MB)
              </span>
            </>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Eligibility rules toggle */}
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={addRules}
          onChange={(e) => onAddRulesChange(e.target.checked)}
          className="h-4 w-4"
        />
        Add eligibility rules to this benefit
      </label>
    </div>
  );
};
