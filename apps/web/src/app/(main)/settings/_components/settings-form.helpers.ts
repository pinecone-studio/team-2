import type React from 'react';
import type { useUser } from '@clerk/nextjs';
import type { UpdateEmployeeMutationVariables } from 'apps/web/src/graphql/generated/graphql';
import { EmploymentStatus } from 'apps/web/src/graphql/generated/graphql';

export type EmployeeUpdateInput = UpdateEmployeeMutationVariables['input'];

export const initialUpdateForm: EmployeeUpdateInput = {
  employeeRole: '',
  department: '',
  responsibilityLevel: '',
  employmentStatus: EmploymentStatus.Active,
  hireDate: '',
  okrSubmitted: false,
  lateArrivalCount: 0,
};

export type SettingsPageStatus =
  | 'loading-user'
  | 'signed-out'
  | 'loading-employee'
  | 'not-found'
  | 'ready';

export type SettingsPageState = {
  status: SettingsPageStatus;
  form: EmployeeUpdateInput;
  loading: boolean;
  saved: boolean;
  error: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  updateField: <K extends keyof EmployeeUpdateInput>(
    key: K,
    value: EmployeeUpdateInput[K],
  ) => void;
};

type ClerkUser = NonNullable<ReturnType<typeof useUser>['user']>;

export function fillUpdateFormFromEmployee(
  employee: EmployeeUpdateInput,
): EmployeeUpdateInput {
  return {
    employeeRole: employee.employeeRole ?? '',
    department: employee.department ?? '',
    responsibilityLevel: employee.responsibilityLevel ?? '',
    employmentStatus: employee.employmentStatus ?? EmploymentStatus.Active,
    hireDate: employee.hireDate ?? '',
    okrSubmitted: employee.okrSubmitted ?? false,
    lateArrivalCount: employee.lateArrivalCount ?? 0,
  };
}

export function buildUpdateInput(
  form: EmployeeUpdateInput,
  _user: ClerkUser,
): EmployeeUpdateInput {
  return { ...form };
}

export function asText(value: string | null | undefined): string {
  return value ?? '';
}

export function asNumber(value: number | null | undefined): number {
  return value ?? 0;
}

export function asChecked(value: boolean | null | undefined): boolean {
  return Boolean(value);
}

export function getSaveLabel(loading: boolean, saved: boolean): string {
  if (loading) return 'Saving...';
  if (saved) return 'Saved!';
  return 'Save Changes';
}
