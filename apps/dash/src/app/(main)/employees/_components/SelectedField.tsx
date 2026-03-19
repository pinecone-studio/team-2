import type { LucideIcon } from 'lucide-react';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  Icon: LucideIcon;
  error?: string;
}

function getBorderClass(error?: string) {
  return error
    ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100'
    : 'border-transparent bg-gray-50 focus:border-indigo-400 focus:bg-white focus:ring-indigo-100';
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  Icon,
  error,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-800">
        {label} <span className="text-red-500 text-xs">*</span>
      </label>
      <div className="relative flex items-center">
        <Icon
          size={14}
          className="absolute left-3 text-gray-400 pointer-events-none z-10"
        />
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-9 pr-8 py-2.5 border rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${getBorderClass(error)}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 text-gray-400 pointer-events-none"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
