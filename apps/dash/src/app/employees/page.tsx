'use client';

import { useEffect, useState } from 'react';
import { gqlRequest } from '../../graphql/helpers/graphql-client';
import { CreateEmployeeDocument } from '../../graphql/generated/graphql';
import { EmployeeForm } from './_components/EmployeeForm';
import type { EmployeeFormData } from './_components/EmployeeForm';
import { SuccessDialog } from './_components/SuccessDialog';

const INITIAL_FORM: EmployeeFormData = {
  email: '',
  name: '',
  employeeRole: '',
  department: '',
  responsibilityLevel: '',
  employmentStatus: '',
  hireDate: '',
  okrSubmitted: false,
  lateArrivalCount: 0,
  clerkUserId: '',
};

const DEMO_FORM: EmployeeFormData = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  employeeRole: 'Software Engineer',
  department: 'Engineering',
  responsibilityLevel: 'senior',
  employmentStatus: 'active',
  hireDate: '2024-03-14',
  okrSubmitted: true,
  lateArrivalCount: 2,
  clerkUserId: 'demo-user-id',
};

export default function Employees() {
  const [form, setForm] = useState<EmployeeFormData>(INITIAL_FORM);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    let finalValue: string | number | boolean = value;
    if (type === 'checkbox')
      finalValue = (e.target as HTMLInputElement).checked;
    else if (type === 'number') finalValue = parseInt(value) || 0;

    setForm((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleDemo = () => setForm(DEMO_FORM);

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setAvatarSrc(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await gqlRequest(CreateEmployeeDocument, {
        input: {
          ...form,
          createdAt: new Date().toISOString(),
        },
      });
      handleReset();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] px-5 py-10">
      <SuccessDialog open={success} onClose={() => setSuccess(false)} />
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all active:scale-95"
          >
            Demo Button
          </button>
        </header>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {!mounted ? null : (
          <form onSubmit={handleSubmit}>
            <EmployeeForm
              form={form}
              avatarSrc={avatarSrc}
              onPhotoChange={setAvatarSrc}
              onChange={handleChange}
              onReset={handleReset}
              submitting={submitting}
            />
          </form>
        )}
      </div>
    </div>
  );
}
