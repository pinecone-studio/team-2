import { Briefcase, Building2, Mail } from 'lucide-react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import type { FormErrors } from './validation';

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
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: FormErrors;
}

export function EmploymentDetailsCard({
  values,
  onInputChange,
  onSelectChange,
  errors,
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
        <InputField
          label="Employee ID"
          name="employeeId"
          value={values.employeeId}
          onChange={onInputChange}
          placeholder="EMP-001"
          Icon={Briefcase}
          error={errors.employeeId}
        />
        <InputField
          label="Position"
          name="position"
          value={values.position}
          onChange={onInputChange}
          placeholder="Software Engineer"
          Icon={Briefcase}
          error={errors.position}
        />
        <SelectField
          label="Department"
          name="department"
          value={values.department}
          onChange={onSelectChange}
          options={DEPARTMENTS}
          Icon={Building2}
          error={errors.department}
        />
        <InputField
          label="Department"
          name="departmentEmail"
          value={values.departmentEmail}
          onChange={onInputChange}
          placeholder="john.doe@company.com"
          type="email"
          Icon={Mail}
          error={errors.departmentEmail}
        />
      </div>
    </div>
  );
}
