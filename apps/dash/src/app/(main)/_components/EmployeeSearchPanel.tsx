'use client';

import { Search, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import {GetEmployeesDocument, type GetEmployeesQuery} from 'apps/dash/src/graphql/generated/graphql';
import {gqlRequest} from 'apps/dash/src/graphql/helpers/graphql-client';

type Employee = GetEmployeesQuery['employees'][number];

function formatEmployeeCode(id: number) {
  return `#EMP${String(id).padStart(6, '0')}`;
}

function formatDate(date?: string | null) {
  if (!date) return 'No date';

  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function getInitials(name?: string | null) {
  if (!name) return 'NA';

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function getStatusStyles(status?: string | null) {
  switch (status?.toUpperCase()) {
    case 'ACTIVE':
      return 'bg-[#EAF7EC] text-[#159947]';
    case 'LEAVE':
      return 'bg-[#FFF0E3] text-[#F17B2C]';
    case 'PROBATION':
      return 'bg-[#EEF4FF] text-[#4B7BFF]';
    case 'TERMINATED':
      return 'bg-[#FFE7EC] text-[#E11D48]';
    default:
      return 'bg-slate-100 text-slate-500';
  }
}

export function EmployeeSearchPanel() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);

      try {
        const data = await gqlRequest(GetEmployeesDocument);
        setEmployees(data.employees);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : 'Failed to load employees',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return employees;

    return employees.filter((employee) =>
      [
        employee.name,
        employee.email,
        employee.department,
        employee.employeeRole,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery)),
    );
  }, [employees, query]);

  return (
    <section className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[18px] font-semibold text-[#0F172A]">Employees</h2>
          <p className="text-sm text-[#64748B]">
            Search and scan your team at a glance
          </p>
        </div>

        <button
          onClick={() => router.push('./employees')}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#155DFC] px-4 text-sm font-semibold text-white transition hover:bg-[#1259F1]"
        >
          <Plus className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search employee, department, or role"
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#155DFC] focus:bg-white"
          />
        </label>

        <div className="grid grid-cols-[minmax(180px,2fr)_minmax(110px,1fr)_minmax(120px,1fr)_minmax(100px,0.9fr)] gap-4 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          <span>Employee</span>
          <span>ID</span>
          <span>Department</span>
          <span>Status</span>
        </div>

        <div className="flex flex-col">
          {loading ? (
            <div className="space-y-3 py-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-6 text-sm text-red-500">
              {error}
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
              No employees matched your search.
            </div>
          ) : (
            filteredEmployees.slice(0, 8).map((employee) => (
              <div
                key={employee.id}
                className="grid grid-cols-[minmax(180px,2fr)_minmax(110px,1fr)_minmax(120px,1fr)_minmax(100px,0.9fr)] items-center gap-4 border-t border-slate-100 px-2 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D8ECFF] text-sm font-semibold text-[#155DFC]">
                    {getInitials(employee.name)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0F172A]">
                      {employee.name ?? 'Unnamed employee'}
                    </p>
                    <p className="truncate text-sm text-[#64748B]">
                      {employee.employeeRole ?? formatDate(employee.hireDate)}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#475569]">
                  {formatEmployeeCode(employee.id)}
                </p>

                <div className="min-w-0">
                  <p className="truncate text-sm text-[#334155]">
                    {employee.department ?? 'No department'}
                  </p>
                  <p className="text-sm text-[#94A3B8]">
                    {formatDate(employee.hireDate)}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(employee.employmentStatus)}`}
                  >
                    {employee.employmentStatus?.toLowerCase() ?? 'unknown'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
