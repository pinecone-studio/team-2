'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
  GetEmployeesDocument,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';

// change this import path to your real shadcn path
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@team/source-ui';

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

function getStatusDisplay(status?: string | null) {
  const normalized = status?.toUpperCase() ?? '';
  switch (normalized) {
    case 'ACTIVE':
      return { label: 'Active', classes: 'bg-green-50 text-green-700' };
    case 'LEAVE':
      return { label: 'On Leave', classes: 'bg-orange-400/20 text-orange-400' };
    case 'REMOTE':
      return { label: 'Remote', classes: 'bg-blue-100/40 text-indigo-500' };
    case 'PROBATION':
      return { label: 'Remote', classes: 'bg-blue-100/40 text-indigo-500' };
    case 'TERMINATED':
    case 'INACTIVE':
      return { label: 'Inactive', classes: 'bg-red-100 text-rose-500' };
    default:
      return { label: status || 'Unknown', classes: 'bg-slate-100 text-slate-500' };
  }
}

export function EmployeeSearchPanel() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [query, setQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      setError('');

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

    void fetchEmployees();
  }, []);

  const departments = useMemo(() => {
    return [
      ...new Set(
        employees
          .map((employee) => employee.department?.trim())
          .filter((department): department is string => Boolean(department)),
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesDepartment =
        selectedDepartment === 'all' ||
        employee.department?.trim() === selectedDepartment;

      const matchesSearch =
        !normalizedQuery ||
        [
          employee.name,
          employee.email,
          employee.department,
          employee.employeeRole,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery));

      return matchesDepartment && matchesSearch;
    });
  }, [employees, query, selectedDepartment]);

  return (
    <section className="flex w-full flex-col self-stretch rounded-lg bg-white py-6 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)]">
      <div className="mb-4 flex w-full items-center justify-between px-6">
        <div className="flex h-8 w-64 items-center justify-start gap-2 rounded-lg bg-zinc-100 px-4 py-2 outline outline-1 outline-offset-[-1px] outline-black/10">
          <Search size={14} className="text-black/60" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-xs text-black outline-none placeholder:text-black"
          />
        </div>

        <Select
          value={selectedDepartment}
          onValueChange={setSelectedDepartment}
        >
          <SelectTrigger className="flex h-8 w-max items-center justify-start gap-2 rounded-lg border-none bg-zinc-100 px-4 py-2 text-xs text-black outline outline-1 outline-offset-[-1px] outline-black/10 shadow-none hover:bg-zinc-200 focus:ring-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-zinc-600" />
              <SelectValue placeholder="Departments" />
            </div>
          </SelectTrigger>

          <SelectContent className="bg-white">
            <SelectItem value="all">All departments</SelectItem>

            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex min-h-[500px] w-full flex-col">
        {loading ? (
          <div className="space-y-3 px-6 py-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mx-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-6 text-sm text-red-500">
            {error}
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="mx-6 rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
            No employees matched your search.
          </div>
        ) : (
          filteredEmployees.slice(0, 8).map((employee) => {
            const statusDisplay = getStatusDisplay(employee.employmentStatus);
            return (
              <div
                key={employee.id}
                className="grid h-14 w-full grid-cols-[2fr_1.5fr_1.5fr_1fr_80px] items-center gap-4 border-b-[0.77px] border-gray-100 px-6"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {getInitials(employee.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold leading-5 text-black">
                      {employee.name ?? 'Unnamed employee'}
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs leading-4 text-gray-600">
                    {formatEmployeeCode(employee.id)}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs leading-4 text-gray-900">
                    {employee.department ?? 'No department'}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs leading-4 text-gray-600">
                    {formatDate(employee.hireDate)}
                  </p>
                </div>

                <div className="flex justify-end pr-2">
                  <div className={`flex items-center justify-center gap-2.5 rounded-2xl px-2.5 py-[5px] ${statusDisplay.classes}`}>
                    <span className="whitespace-nowrap text-[10px] leading-3">
                      {statusDisplay.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
