'use client';

import { useState } from 'react';
import {
  CreateEmployeeDocument,
  type CreateEmployeeMutationVariables,
  EmploymentStatus,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import { EmployeeForm, EmployeeFormData } from './EmployeeForm';

export type Employee = GetEmployeesQuery['employees'][number];

const INITIAL_FORM: EmployeeFormData = {
  email: '',
  name: '',
  employeeRole: '',
  department: '',
  responsibilityLevel: '',
  employmentStatus: EmploymentStatus.Active,
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
  responsibilityLevel: '3',
  employmentStatus: EmploymentStatus.Active,
  hireDate: '2024-03-14',
  okrSubmitted: true,
  lateArrivalCount: 2,
  clerkUserId: 'demo-user-id',
};

type Props = {
  onSuccess?: (employee: Employee) => void;
  onCancel?: () => void;
};

function normalizeCreateEmployeeInput(
  form: EmployeeFormData,
): CreateEmployeeMutationVariables['input'] {
  const email = form.email.trim();
  const name = form.name.trim();

  return {
    email,
    name,
    employeeRole: form.employeeRole.trim() || undefined,
    department: form.department.trim() || undefined,
    responsibilityLevel: form.responsibilityLevel.trim() || undefined,
    employmentStatus:
      (form.employmentStatus as EmploymentStatus | '') || undefined,
    hireDate: form.hireDate.trim() || undefined,
    okrSubmitted: form.okrSubmitted,
    lateArrivalCount: form.lateArrivalCount,
    clerkUserId: form.clerkUserId.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
}

export function EmployeeCreatePanel({ onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<EmployeeFormData>(INITIAL_FORM);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    let finalValue: string | number | boolean = value;
    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = parseInt(value, 10) || 0;
    }

    setForm((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleDemo = () => setForm(DEMO_FORM);

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setAvatarSrc(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const data = await gqlRequest(CreateEmployeeDocument, {
        input: normalizeCreateEmployeeInput(form),
      });

      handleReset();
      onSuccess?.(data.createEmployee);
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error ? submitError.message : 'Create failed',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <div className="flex flex-col gap-6">

    <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl leading-10 font-bold tracking-[0.396px] text-[#101828]">
            Add New Employee
          </h2>
          <p className="mt-1 text-sm text-[#667085]">
            Fill in the employee details to add them to your organization
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDemo}
            disabled={isSubmitting}
            className="rounded-xl border border-[#E4E7EC] bg-white px-4 py-2 text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Demo Data
          </button>

          {/* {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-transparent px-2 py-2 text-sm font-medium text-[#667085] transition hover:text-[#101828]"
            >
              Close
            </button>
          ) : null} */}
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <EmployeeForm
          form={form}
          avatarSrc={avatarSrc}
          onPhotoChange={setAvatarSrc}
          onChange={handleChange}
          onReset={handleReset}
        />
      </form>

      {isSubmitting ? (
        <p className="text-sm text-[#667085]">Saving employee...</p>
      ) : null}

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
