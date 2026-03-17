// import {
//   User,
//   Mail,
//   Briefcase,
//   Calendar,
//   ShieldCheck,
//   Clock,
//   IdCard,
// } from 'lucide-react';
// import { InputField } from './InputField';
// import { SelectField } from './SelectedField';
// import type { EmployeeFormData } from './EmployeeForm';

// const RESPONSIBILITY_OPTIONS = [
//   { value: '', label: '-- Select Grade --' },
//   { value: 'junior', label: 'Junior Level' },
//   { value: 'mid', label: 'Mid Level' },
//   { value: 'senior', label: 'Senior Level' },
// ];

// const STATUS_OPTIONS = [
//   { value: '', label: '-- Select Status --' },
//   { value: 'active', label: 'Full-time' },
//   { value: 'probation', label: 'On Probation' },
//   { value: 'contract', label: 'Contractor' },
// ];

// interface Props {
//   form: EmployeeFormData;
//   onChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => void;
// }

// export function EmployeeFormFields({ form, onChange }: Props) {
//   return (
//     <div className="p-7 space-y-6">
//       <div className="grid grid-cols-2 gap-5">
//         <InputField
//           label="Full Name"
//           name="name"
//           value={form.name}
//           onChange={onChange}
//           Icon={User}
//           placeholder="Enter legal name"
//         />
//         <InputField
//           label="Email Address"
//           name="email"
//           value={form.email}
//           onChange={onChange}
//           Icon={Mail}
//           placeholder="email@example.com"
//           type="email"
//         />
//       </div>

//       <hr className="border-gray-100" />

//       <div className="grid grid-cols-2 gap-5">
//         <InputField
//           label="Employee Role"
//           name="employeeRole"
//           value={form.employeeRole}
//           onChange={onChange}
//           Icon={Briefcase}
//           placeholder="e.g. Project Manager"
//         />
//         <InputField
//           label="Department"
//           name="department"
//           value={form.department}
//           onChange={onChange}
//           Icon={ShieldCheck}
//           placeholder="e.g. Marketing"
//         />
//         <SelectField
//           label="Responsibility Level"
//           name="responsibilityLevel"
//           value={form.responsibilityLevel}
//           onChange={onChange}
//           Icon={ShieldCheck}
//           options={RESPONSIBILITY_OPTIONS}
//         />
//         <SelectField
//           label="Employment Status"
//           name="employmentStatus"
//           value={form.employmentStatus}
//           onChange={onChange}
//           Icon={IdCard}
//           options={STATUS_OPTIONS}
//         />
//       </div>

//       <hr className="border-gray-100" />

//       <div className="grid grid-cols-3 gap-5">
//         <InputField
//           label="Hire Date"
//           name="hireDate"
//           type="date"
//           value={form.hireDate}
//           onChange={onChange}
//           Icon={Calendar}
//         />
//         <InputField
//           label="Late Arrivals"
//           name="lateArrivalCount"
//           type="number"
//           value={String(form.lateArrivalCount)}
//           onChange={onChange}
//           Icon={Clock}
//           placeholder="0"
//         />
//         <InputField
//           label="ID"
//           name="clerkUserId"
//           value={form.clerkUserId}
//           onChange={onChange}
//           Icon={IdCard}
//           placeholder="id"
//           required={false}
//         />
//       </div>

//       <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
//         <input
//           type="checkbox"
//           id="okrSubmitted"
//           name="okrSubmitted"
//           checked={form.okrSubmitted}
//           onChange={onChange}
//           className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
//         />
//         <label
//           htmlFor="okrSubmitted"
//           className="text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer select-none"
//         >
//           Current quarter OKRs submitted?
//         </label>
//       </div>
//     </div>
//   );
// }

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
import { EmploymentStatus } from '../../../graphql/generated/graphql';
import type { EmployeeFormData } from '../page';
import { SelectField } from './SelectedField';

const RESPONSIBILITY_OPTIONS = [
  { value: '', label: '-- Select Grade --' },
  { value: 'junior', label: 'Junior Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
];

const STATUS_OPTIONS = [
  { value: EmploymentStatus.Active, label: 'Active' },
  { value: EmploymentStatus.Probation, label: 'On Probation' },
  { value: EmploymentStatus.Leave, label: 'On Leave' },
  { value: EmploymentStatus.Terminated, label: 'Terminated' },
];

interface Props {
  form: EmployeeFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export function EmployeeFormFields({ form, onChange }: Props) {
  return (
    <div className="p-7 space-y-6">
      <div className="grid grid-cols-2 gap-5">
        <InputField
          label="Full Name"
          name="name"
          value={form.name ?? ''}
          onChange={onChange}
          Icon={User}
          placeholder="Enter legal name"
        />
        <InputField
          label="Email Address"
          name="email"
          value={form.email ?? ''}
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
          value={form.employeeRole ?? ''}
          onChange={onChange}
          Icon={Briefcase}
          placeholder="e.g. Project Manager"
        />
        <InputField
          label="Department"
          name="department"
          value={form.department ?? ''}
          onChange={onChange}
          Icon={ShieldCheck}
          placeholder="e.g. Marketing"
        />
        <SelectField
          label="Responsibility Level"
          name="responsibilityLevel"
          value={form.responsibilityLevel ?? ''}
          onChange={onChange}
          Icon={ShieldCheck}
          options={RESPONSIBILITY_OPTIONS}
        />
        <SelectField
          label="Employment Status"
          name="employmentStatus"
          value={form.employmentStatus ?? EmploymentStatus.Active}
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
          value={form.hireDate ?? ''}
          onChange={onChange}
          Icon={Calendar}
        />
        <InputField
          label="Late Arrivals"
          name="lateArrivalCount"
          type="number"
          value={String(form.lateArrivalCount ?? 0)}
          onChange={onChange}
          Icon={Clock}
          placeholder="0"
        />
        <InputField
          label="Clerk User ID"
          name="clerkUserId"
          value={form.clerkUserId ?? ''}
          onChange={onChange}
          Icon={IdCard}
          placeholder="user_..."
          required={false}
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
        <input
          type="checkbox"
          id="okrSubmitted"
          name="okrSubmitted"
          checked={Boolean(form.okrSubmitted)}
          onChange={onChange}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
        />
        <label
          htmlFor="okrSubmitted"
          className="text-sm font-medium text-gray-700 cursor-pointer select-none"
        >
          Current quarter OKRs submitted?
        </label>
      </div>
    </div>
  );
}
