'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { findCurrentEmployee } from './employee/find-current-employee';
import {
  buildEmployeeInput,
  fillFormFromUser,
  initialForm,
  type EmployeeInput,
  type PageStatus,
  type UserProfilePageState,
} from './profile-form.helpers';

import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';
import { CreateEmployeeDocument } from 'apps/web/src/graphql/generated/graphql';

export function useUserProfilePage(): UserProfilePageState {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [status, setStatus] = useState<PageStatus>('loading-user');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<EmployeeInput>(initialForm);

  useEffect(() => {
    if (!isLoaded || !user) return;
    setForm((prev) => fillFormFromUser(prev, user));
  }, [isLoaded, user]);

  useEffect(() => {
    void handlePageAccess(isLoaded, user?.id, router, setStatus, setError);
  }, [isLoaded, user?.id, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitUser = user;
    if (!submitUser) {
      setError('You must be signed in.');
      return;
    }

    await submitProfile({
      clerkUserId: submitUser.id,
      user: submitUser,
      form,
      router,
      setLoading,
      setError,
      setCreated,
    });
  }

  function updateField<K extends keyof EmployeeInput>(
    key: K,
    value: EmployeeInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return {
    status,
    form,
    loading,
    created,
    error,
    onSubmit,
    updateField,
  };
}

async function handlePageAccess(
  isLoaded: boolean,
  clerkUserId: string | undefined,
  router: ReturnType<typeof useRouter>,
  setStatus: (value: PageStatus) => void,
  setError: (value: string) => void,
) {
  if (!isLoaded) return;

  if (!clerkUserId) {
    setStatus('signed-out');
    return;
  }

  setStatus('checking');
  await routeByEmployee(clerkUserId, router, setStatus, setError);
}

async function routeByEmployee(
  clerkUserId: string,
  router: ReturnType<typeof useRouter>,
  setStatus: (value: PageStatus) => void,
  setError: (value: string) => void,
) {
  try {
    const employee = await findCurrentEmployee(clerkUserId);

    if (employee) {
      router.replace('/dashboard');
      return;
    }

    setStatus('ready');
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to check employee';
    setError(message);
    setStatus('ready');
  }
}

type SubmitProfileArgs = {
  clerkUserId: string;
  user: NonNullable<ReturnType<typeof useUser>['user']>;
  form: EmployeeInput;
  router: ReturnType<typeof useRouter>;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setCreated: (value: boolean) => void;
};

async function submitProfile({
  clerkUserId,
  user,
  form,
  router,
  setLoading,
  setError,
  setCreated,
}: SubmitProfileArgs) {
  setLoading(true);
  setError('');

  try {
    const existingEmployee = await findCurrentEmployee(clerkUserId);

    if (existingEmployee) {
      router.replace('/');
      return;
    }

    await gqlRequest(CreateEmployeeDocument, {
      input: buildEmployeeInput(form, user),
    });

    setCreated(true);

    setTimeout(() => {
      router.replace('/');
    }, 2000);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Create failed';
    setError(message);
  } finally {
    setLoading(false);
  }
}
