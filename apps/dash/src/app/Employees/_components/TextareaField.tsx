interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
}
export function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-500 text-xs ml-0.5">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100 transition-all resize-none"
      />
    </div>
  );
}
