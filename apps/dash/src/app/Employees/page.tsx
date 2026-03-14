'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Briefcase,
  Calendar,
  ShieldCheck,
  Clock,
  IdCard,
  CheckSquare,
  Zap,
} from 'lucide-react';
import { InputField } from './_components/InputField';
import { SelectField } from './_components/SelectField';
import { ProfilePhotoCard } from './_components/ProfilePhotoCard';

const INITIAL_FORM = {
  email: '',
  name: '',
  employee_role: '',
  department: '',
  responsibility_level: '',
  employment_status: '',
  hire_date: '',
  okr_submitted: false,
  late_arrival_count: 0,
  clerk_user_id: '',
};

export default function Employees() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | boolean = value;

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = parseInt(value) || 0;
    }

    setForm((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleDemo = () => {
    setForm({
      name: 'John Doe',
      email: 'john.doe@company.com',
      employee_role: 'Software Engineer',
      department: 'Engineering',
      responsibility_level: 'senior',
      employment_status: 'active',
      hire_date: '2024-03-14',
      okr_submitted: true,
      late_arrival_count: 2,
      clerk_user_id: 'user_2fG9kLp8nQ1zR4m',
    });
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setAvatarSrc(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      ...form,
      profile_photo: avatarSrc,
    };

    console.log('Employee Data:', submissionData);

    alert('Success!');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Add New Employee
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Complete the form below to register a new staff member.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDemo}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm active:scale-95"
          >
            <Zap size={14} className="fill-indigo-500" />
            Try Demo
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <ProfilePhotoCard
            avatarSrc={avatarSrc}
            onPhotoChange={setAvatarSrc}
          />

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
            <div className="p-7 space-y-6">
              {/* Identity Section */}
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                  Icon={User}
                  placeholder="Enter legal name"
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInput}
                  Icon={Mail}
                  placeholder="email@example.com"
                />
              </div>

              <hr className="border-gray-100" />

              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Employee Role"
                  name="employee_role"
                  value={form.employee_role}
                  onChange={handleInput}
                  Icon={Briefcase}
                  placeholder="e.g. Project Manager"
                />
                <InputField
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={handleInput}
                  Icon={ShieldCheck}
                  placeholder="e.g. Marketing"
                />

                <SelectField
                  label="Responsibility Level"
                  name="responsibility_level"
                  value={form.responsibility_level}
                  onChange={handleInput}
                  Icon={ShieldCheck}
                  options={[
                    { value: '', label: '-- Select Grade --' },
                    { value: 'junior', label: 'Junior Level' },
                    { value: 'mid', label: 'Mid Level' },
                    { value: 'senior', label: 'Senior Level' },
                  ]}
                />
                <SelectField
                  label="Employment Status"
                  name="employment_status"
                  value={form.employment_status}
                  onChange={handleInput}
                  Icon={IdCard}
                  options={[
                    { value: '', label: '-- Select Status --' },
                    { value: 'active', label: 'Full-time' },
                    { value: 'probation', label: 'On Probation' },
                    { value: 'contract', label: 'Contractor' },
                  ]}
                />
              </div>

              <hr className="border-gray-100" />

              <div className="grid grid-cols-3 gap-5">
                <InputField
                  label="Hire Date"
                  name="hire_date"
                  type="date"
                  value={form.hire_date}
                  onChange={handleInput}
                  Icon={Calendar}
                />
                <InputField
                  label="Late Arrivals"
                  name="late_arrival_count"
                  type="number"
                  value={String(form.late_arrival_count)}
                  onChange={handleInput}
                  Icon={Clock}
                  placeholder="0"
                />
                <InputField
                  label="Clerk User ID"
                  name="clerk_user_id"
                  value={form.clerk_user_id}
                  onChange={handleInput}
                  Icon={IdCard}
                  placeholder="clerk_id_here"
                  required={false}
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <input
                  type="checkbox"
                  id="okr_submitted"
                  name="okr_submitted"
                  checked={form.okr_submitted}
                  onChange={handleInput}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <label
                  htmlFor="okr_submitted"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer select-none"
                >
                  <CheckSquare size={16} className="text-indigo-400" />
                  Current quarter OKRs submitted?
                </label>
              </div>
            </div>

            <div className="bg-gray-50/80 px-7 py-5 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-all"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
              >
                Add Employee Record
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
