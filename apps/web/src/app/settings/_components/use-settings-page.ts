'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import {
  buildUpdateInput,
  fillUpdateFormFromEmployee,
  initialUpdateForm,
  type EmployeeUpdateInput,
  type SettingsPageState,
  type SettingsPageStatus,
} from './settings-form.helpers';
import { gqlRequest } from '../../../graphql/helpers/graphql-client';
import { UpdateEmployeeDocument } from '../../../graphql/generated/graphql';
import { findCurrentEmployee } from '../../userProfile/_components/employee/find-current-employee';

export function useSettingsPage(): SettingsPageState {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [status, setStatus] = useState<SettingsPageStatus>('loading-user');
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<EmployeeUpdateInput>(initialUpdateForm);

  useEffect(() => {
    void loadEmployee(
      isLoaded,
      user?.id,
      setStatus,
      setEmployeeId,
      setForm,
      setError,
    );
  }, [isLoaded, user?.id]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      setError('You must be signed in.');
      return;
    }

    if (!employeeId) {
      setError('Employee record not found.');
      return;
    }

    await saveSettings({
      employeeId,
      user,
      form,
      router,
      setLoading,
      setError,
      setSaved,
    });
  }

  function updateField<K extends keyof EmployeeUpdateInput>(
    key: K,
    value: EmployeeUpdateInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  return {
    status,
    form,
    loading,
    saved,
    error,
    onSubmit,
    updateField,
  };
}

async function loadEmployee(
  isLoaded: boolean,
  clerkUserId: string | undefined,
  setStatus: (value: SettingsPageStatus) => void,
  setEmployeeId: (value: string | null) => void,
  setForm: (value: EmployeeUpdateInput) => void,
  setError: (value: string) => void,
) {
  if (!isLoaded) return;

  if (!clerkUserId) {
    setStatus('signed-out');
    return;
  }

  setStatus('loading-employee');

  try {
    const employee = await findCurrentEmployee(clerkUserId);

    if (!employee) {
      setStatus('not-found');
      return;
    }

    setEmployeeId(employee.id);
    setForm(fillUpdateFormFromEmployee(employee as EmployeeUpdateInput));
    setStatus('ready');
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to load employee';
    setError(message);
    setStatus('ready');
  }
}

type SaveSettingsArgs = {
  employeeId: string;
  user: NonNullable<ReturnType<typeof import('@clerk/nextjs').useUser>['user']>;
  form: EmployeeUpdateInput;
  router: ReturnType<typeof useRouter>;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setSaved: (value: boolean) => void;
};

async function saveSettings({
  employeeId,
  user,
  form,
  setLoading,
  setError,
  setSaved,
}: SaveSettingsArgs) {
  setLoading(true);
  setError('');

  try {
    await gqlRequest(UpdateEmployeeDocument, {
      id: employeeId,
      input: buildUpdateInput(form, user),
    });

    setSaved(true);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Save failed';
    setError(message);
  } finally {
    setLoading(false);
  }
}
