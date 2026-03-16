'use client';

import { useState } from 'react';
import { gqlRequest } from '../../graphql/helpers/graphql-client';
import {
  CreateEmployeeDocument,
  GetEmployeesDocument,
  type CreateEmployeeMutationVariables,
  type GetEmployeesQuery,
  EmploymentStatus,
} from '../../graphql/generated/graphql';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState<GetEmployeesQuery['employees']>(
    [],
  );

  const [form, setForm] = useState<CreateEmployeeMutationVariables['input']>({
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
  });

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function loadEmployees() {
    setLoading(true);
    setError('');
    try {
      const data = await gqlRequest(GetEmployeesDocument);
      setEmployees(data.employees);
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await gqlRequest(CreateEmployeeDocument, {
        input: {
          ...form,
          createdAt: new Date().toISOString(),
        },
      });

      // хүсвэл list-д локал нэмнэ (GET дуудахгүй)
      setEmployees((prev) => [data.createEmployee, ...prev]);
    } catch (e: any) {
      setError(e.message ?? 'Create failed');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      style={{ maxWidth: 700, margin: '24px auto', fontFamily: 'sans-serif' }}
    >
      <h2>Employee Create (Codegen)</h2>

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
          placeholder="Employee Role"
          value={form.employeeRole ?? ''}
          onChange={(e) => update('employeeRole', e.target.value)}
        />
        <input
          placeholder="Department"
          value={form.department ?? ''}
          onChange={(e) => update('department', e.target.value)}
        />
        <input
          placeholder="Responsibility Level"
          value={form.responsibilityLevel ?? ''}
          onChange={(e) => update('responsibilityLevel', e.target.value)}
        />
        <input
          placeholder="Employment Status"
          value={form.employmentStatus ?? ''}
          onChange={(e) =>
            update('employmentStatus', e.target.value as EmploymentStatus)
          }
        />
        <input
          placeholder="Hire Date (YYYY-MM-DD)"
          value={form.hireDate ?? ''}
          onChange={(e) => update('hireDate', e.target.value)}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
          placeholder="Clerk User ID"
          value={form.clerkUserId ?? ''}
          onChange={(e) => update('clerkUserId', e.target.value)}
        />

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Create Employee'}
          </button>
          <button type="button" onClick={loadEmployees} disabled={loading}>
            Refresh Employees
          </button>
        </div>
      </form>

      {error ? <p style={{ color: 'red' }}>{error}</p> : null}

      <pre
        style={{
          marginTop: 16,
          background: '#f5f5f5',
          padding: 12,
          borderRadius: 8,
        }}
      >
        {JSON.stringify(employees, null, 2)}
      </pre>
    </div>
  );
}
