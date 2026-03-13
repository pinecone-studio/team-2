// EmploymentDetailsCard.tsx
// Ажилтны ажлын мэдээлэл — ID, албан тушаал, хэлтэс

import { Briefcase, Building2, Mail } from 'lucide-react';
import { InputField, SelectField } from './FormField';

// Dropdown-д харагдах хэлтсүүдийн жагсаалт
// value — кодонд хэрэглэгдэх, label — хэрэглэгчид харагдах
const DEPARTMENTS = [
  { value: '', label: 'Select Department' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'HR' },
  { value: 'finance', label: 'Finance' },
];

interface EmploymentInfo {
  employeeId: string;
  position: string;
  department: string;
  departmentEmail: string;
}

interface Props {
  values: EmploymentInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // <input> өөрчлөгдөхөд
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // <select> өөрчлөгдөхөд
  onSubmit: () => void; // "Add Employee" дарахад
  onCancel: () => void; // "Cancel" дарахад
  isSubmitting?: boolean;
}

export function EmploymentDetailsCard({
  values,
  onInputChange,
  onSelectChange,
  onSubmit,
  onCancel,
  isSubmitting,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 mb-4">
      <h2 className="text-sm font-semibold text-gray-900">
        Employment Details
      </h2>
      <p className="text-xs text-gray-500 mt-1 mb-5">
        Job position, department, and work-related information
      </p>

      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        {/* 1-р талбар: Ажилтны дугаар */}
        <InputField
          label="Employee ID"
          name="employeeId"
          value={values.employeeId}
          onChange={onInputChange}
          placeholder="EMP-001"
          Icon={Briefcase}
        />

        {/* 2-р талбар: Албан тушаал */}
        <InputField
          label="Position"
          name="position"
          value={values.position}
          onChange={onInputChange}
          placeholder="Software Engineer"
          Icon={Briefcase}
        />

        {/* 3-р талбар: Хэлтэс — dropdown */}
        <SelectField
          label="Department"
          name="department"
          value={values.department}
          onChange={onSelectChange}
          options={DEPARTMENTS}
          Icon={Building2}
        />

        {/* 4-р талбар: Дизайны дагуу "Department" label + имэйл placeholder */}
        <InputField
          label="Department"
          name="departmentEmail"
          type="email"
          value={values.departmentEmail}
          onChange={onInputChange}
          placeholder="john.doe@company.com"
          Icon={Mail}
        />
      </div>

      {/* Доод товчнууд — border-t нь дээрх grid-ийг тусгаарлана */}
      <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
        {/* Cancel — форм цэвэрлэнэ */}
        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-medium text-gray-500 bg-transparent border border-gray-200 rounded-lg hover:border-gray-300 hover:text-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>

        {/* Add Employee — submit хийнэ */}
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 shadow-md shadow-indigo-200 hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Employee'}
        </button>
      </div>
    </div>
  );
}
