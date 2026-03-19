import {
  User,
  Mail,
  Briefcase,
  Calendar,
  ShieldCheck,
  Clock,
  IdCard,
} from 'lucide-react';
import { InputField } from './InputField';
import { SelectField } from './SelectedField';
import type { EmployeeFormData } from './EmployeeForm';

const RESPONSIBILITY_OPTIONS = [
  { value: '', label: '-- Select Grade --' },
  { value: '1', label: 'Junior Level' },
  { value: '2', label: 'Mid Level' },
  { value: '3', label: 'Senior Level' },
];

const STATUS_OPTIONS = [
  { value: '', label: '-- Select Status --' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PROBATION', label: 'Probation' },
  { value: 'LEAVE', label: 'Leave' },
  { value: 'TERMINATED', label: 'Terminated' },
];

interface Props {
  form: EmployeeFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export function EmployeeFormFields({ form, onChange }: Props) {
  return (
    <div className="p-5 space-y-6">
      <div className="grid grid-cols-2 gap-5">
        <InputField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={onChange}
          Icon={User}
          placeholder="Enter legal name"
        />
        <InputField
          label="Email Address"
          name="email"
          value={form.email}
          onChange={onChange}
          Icon={Mail}
          placeholder="email@example.com"
          type="email"
        />
      </div>

      <hr className="border-gray-100" />

      <div className="grid grid-cols-2 gap-5">
        <InputField
          label="Employee Role"
          name="employeeRole"
          value={form.employeeRole}
          onChange={onChange}
          Icon={Briefcase}
          placeholder="e.g. Project Manager"
        />
        <InputField
          label="Department"
          name="department"
          value={form.department}
          onChange={onChange}
          Icon={ShieldCheck}
          placeholder="e.g. Marketing"
        />
        <SelectField
          label="Responsibility Level"
          name="responsibilityLevel"
          value={form.responsibilityLevel}
          onChange={onChange}
          Icon={ShieldCheck}
          options={RESPONSIBILITY_OPTIONS}
        />
        <SelectField
          label="Employment Status"
          name="employmentStatus"
          value={form.employmentStatus}
          onChange={onChange}
          Icon={IdCard}
          options={STATUS_OPTIONS}
        />
      </div>

      <hr className="border-gray-100" />

      <div className="grid grid-cols-3 gap-5">
        <InputField
          label="Hire Date"
          name="hireDate"
          type="date"
          value={form.hireDate}
          onChange={onChange}
          Icon={Calendar}
        />
        <InputField
          label="Late Arrivals"
          name="lateArrivalCount"
          type="number"
          value={String(form.lateArrivalCount)}
          onChange={onChange}
          Icon={Clock}
          placeholder="0"
        />
        <InputField
          label="ID"
          name="clerkUserId"
          value={form.clerkUserId}
          onChange={onChange}
          Icon={IdCard}
          placeholder="id"
          required={false}
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
        <input
          type="checkbox"
          id="okrSubmitted"
          name="okrSubmitted"
          checked={form.okrSubmitted}
          onChange={onChange}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
        />
        <label
          htmlFor="okrSubmitted"
          className="text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer select-none"
        >
          Current quarter OKRs submitted?
        </label>
      </div>
    </div>
  );
}
