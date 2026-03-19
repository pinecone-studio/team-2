import { EmployeeFormFields } from './EmployeeFormField';
import { ProfilePhotoCard } from './ProfilePhotoCard';

export interface EmployeeFormData {
  email: string;
  name: string;
  employeeRole: string;
  department: string;
  responsibilityLevel: string;
  employmentStatus: string;
  hireDate: string;
  okrSubmitted: boolean;
  lateArrivalCount: number;
  clerkUserId: string;
}

interface Props {
  form: EmployeeFormData;
  avatarSrc: string | null;
  onPhotoChange: (src: string) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onReset: () => void;
}

export function EmployeeForm({
  form,
  avatarSrc,
  onPhotoChange,
  onChange,
  onReset,
}: Props) {
  return (
    <>
      <ProfilePhotoCard avatarSrc={avatarSrc} onPhotoChange={onPhotoChange} />

      <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden mt-6">
        <EmployeeFormFields form={form} onChange={onChange} />

        <div className="bg-gray-50/80 px-7 py-5 border-t border-gray-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onReset}
            className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-all"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
          >
            Add Employee
          </button>
        </div>
      </div>
    </>
  );
}
