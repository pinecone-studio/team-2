import type { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  Icon: LucideIcon;
  error?: string;
  required?: boolean;
}

function getBorderClass(error?: string) {
  return error
    ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100'
    : 'border-transparent bg-gray-50 focus:border-indigo-400 focus:bg-white focus:ring-indigo-100';
}

function RequiredMark() {
  return <span className="text-red-500 text-xs ml-0.5">*</span>;
}

function FieldError({ error }: { error?: string }) {
  return error ? <p className="text-xs text-red-500">{error}</p> : null;
}

export function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  Icon,
  error,
  required = true,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-800">
        {label}
        {required && <RequiredMark />}
      </label>
      <div className="relative flex items-center">
        <Icon
          size={14}
          className="absolute left-3 text-gray-400 pointer-events-none"
        />
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${getBorderClass(error)}`}
        />
      </div>
      <FieldError error={error} />
    </div>
  );
}
