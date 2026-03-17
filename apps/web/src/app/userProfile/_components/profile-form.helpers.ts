import type React from 'react';
import type { useUser } from '@clerk/nextjs';
import {
  EmploymentStatus,
  type CreateEmployeeMutationVariables,
} from '../../../graphql/generated/graphql';

export type EmployeeInput = CreateEmployeeMutationVariables['input'];

export const initialForm: EmployeeInput = {
  email: '',
  name: '',
  employeeRole: '',
  department: '',
  responsibilityLevel: 'L1',
  employmentStatus: EmploymentStatus.Active,
  hireDate: '',
  okrSubmitted: false,
  lateArrivalCount: 0,
  clerkUserId: '',
  createdAt: '',
};

export type PageStatus = 'loading-user' | 'signed-out' | 'checking' | 'ready';

export type UserProfilePageState = {
  status: PageStatus;
  form: EmployeeInput;
  loading: boolean;
  created: boolean;
  error: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  updateField: <K extends keyof EmployeeInput>(
    key: K,
    value: EmployeeInput[K],
  ) => void;
};

type ClerkUser = NonNullable<ReturnType<typeof useUser>['user']>;

export function fillFormFromUser(
  prev: EmployeeInput,
  user: ClerkUser,
): EmployeeInput {
  return {
    ...prev,
    email: user.primaryEmailAddress?.emailAddress ?? '',
    name: user.fullName ?? '',
    clerkUserId: user.id,
  };
}

export function buildEmployeeInput(
  form: EmployeeInput,
  user: ClerkUser,
): EmployeeInput {
  return {
    ...form,
    email: user.primaryEmailAddress?.emailAddress ?? form.email,
    name: user.fullName ?? form.name,
    clerkUserId: user.id,
    createdAt: new Date().toISOString(),
  };
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

export function getSubmitLabel(loading: boolean, created: boolean): string {
  if (loading) return 'Creating...';
  if (created) return 'Created';
  return 'Create Employee Profile';
}
