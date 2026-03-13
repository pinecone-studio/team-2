'use client';

import { useState } from 'react';

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  'https://team-service.nbhishgee22.workers.dev/api/graphql';

type CreateEmployeeInput = {
  email?: string;
  name?: string;
  employeeRole?: string;
  department?: string;
  responsibilityLevel?: string;
  employmentStatus?: string;
  hireDate?: string;
  okrSubmitted?: boolean;
  lateArrivalCount?: number;
  createdAt?: string;
  clerkUserId?: string;
};

const CREATE_EMPLOYEE_MUTATION = `
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
      email
      name
      employeeRole
      department
      responsibilityLevel
      employmentStatus
      hireDate
      okrSubmitted
      lateArrivalCount
      createdAt
      clerkUserId
    }
  }
`;

export default function EmployeeCreateForm() {
  const [form, setForm] = useState<CreateEmployeeInput>({
    email: '',
    name: '',
    employeeRole: '',
    department: '',
    responsibilityLevel: 'L1',
    employmentStatus: 'active',
    hireDate: '',
    okrSubmitted: false,
    lateArrivalCount: 0,
    clerkUserId: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  function update<K extends keyof CreateEmployeeInput>(
    key: K,
    value: CreateEmployeeInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const input: CreateEmployeeInput = {
        ...form,
        lateArrivalCount: Number(form.lateArrivalCount ?? 0),
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: CREATE_EMPLOYEE_MUTATION,
          variables: { input },
        }),
      });

      const json = await res.json();

      if (!res.ok || json.errors?.length) {
        throw new Error(json.errors?.[0]?.message ?? 'Create employee failed');
      }

      setResult(json.data.createEmployee);
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ maxWidth: 520, margin: '24px auto', fontFamily: 'sans-serif' }}
    >
      <h2>Create Employee</h2>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        <input
          placeholder="Email"
          value={form.email ?? ''}
          onChange={(e) => update('email', e.target.value)}
          required
        />
        <input
          placeholder="Name"
          value={form.name ?? ''}
          onChange={(e) => update('name', e.target.value)}
          required
        />
        <input
          placeholder="Role (employeeRole)"
          value={form.employeeRole ?? ''}
          onChange={(e) => update('employeeRole', e.target.value)}
        />
        <input
          placeholder="Department"
          value={form.department ?? ''}
          onChange={(e) => update('department', e.target.value)}
        />
        <input
          placeholder="Responsibility Level (e.g. L1)"
          value={form.responsibilityLevel ?? ''}
          onChange={(e) => update('responsibilityLevel', e.target.value)}
        />
        <input
          placeholder="Employment Status"
          value={form.employmentStatus ?? ''}
          onChange={(e) => update('employmentStatus', e.target.value)}
        />
        <input
          placeholder="Hire Date (YYYY-MM-DD)"
          value={form.hireDate ?? ''}
          onChange={(e) => update('hireDate', e.target.value)}
        />
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={Boolean(form.okrSubmitted)}
            onChange={(e) => update('okrSubmitted', e.target.checked)}
          />
          OKR Submitted
        </label>
        <input
          type="number"
          placeholder="Late Arrival Count"
          value={form.lateArrivalCount ?? 0}
          onChange={(e) => update('lateArrivalCount', Number(e.target.value))}
        />
        <input
          placeholder="Clerk User Id"
          value={form.clerkUserId ?? ''}
          onChange={(e) => update('clerkUserId', e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Employee'}
        </button>
      </form>

      {error ? (
        <p style={{ color: 'red', marginTop: 12 }}>Error: {error}</p>
      ) : null}

      {result ? (
        <pre
          style={{
            marginTop: 12,
            background: '#f5f5f5',
            padding: 12,
            borderRadius: 8,
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
