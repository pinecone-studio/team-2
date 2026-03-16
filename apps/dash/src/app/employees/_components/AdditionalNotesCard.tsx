import { TextareaField } from './TextareaField';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export function AdditionalNotesCard({ value, onChange }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 mb-4">
      <h2 className="text-sm font-semibold text-gray-900">Additional Notes</h2>
      <p className="text-xs text-gray-500 mt-1 mb-5">
        Any additional information or special requirements
      </p>
      <TextareaField
        label=""
        name="notes"
        value={value}
        onChange={onChange}
        placeholder="Add any additional notes about the employee"
      />
    </div>
  );
}
