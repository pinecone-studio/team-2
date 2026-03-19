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
    <section className="rounded-lg border border-white/70 bg-white/85 p-5 shadow-[0_4px_6px_0_rgba(0,0,0,0.09)] backdrop-blur-md">
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00000099]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="h-8 w-70 rounded-lg border border-[#0000001A] bg-[#F3F3F5] pl-11 pr-4 text-xs text-slate-900 outline-none transition placeholder:text-[#00000080] focus:border-[#155DFC] focus:bg-white"
            />
          </label>

          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="h-8 w-[170px] rounded-lg border border-[#0000001A] bg-[#F3F3F5] px-3 text-xs font-[400] text-[#616162] shadow-none">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal size={16} color="#616162" />
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
                className="grid grid-cols-[minmax(180px,2fr)_repeat(4,minmax(100px,1fr))] items-center gap-4 border-b border-slate-100 px-2 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D8ECFF] text-xs font-semibold text-[#155DFC]">
                    {getInitials(employee.name)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-[500] leading-5 text-[#000000]">
                      {employee.name ?? 'Unnamed employee'}
                    </p>
                  </div>
                </div>

                <p className="text-xs leading-4 text-[#4A5565]">
                  {formatEmployeeCode(employee.id)}
                </p>

                <div className="min-w-0">
                  <p className="truncate text-xs leading-4 text-[#101828]">
                    {employee.department ?? 'No department'}
                  </p>
                </div>

                <div>
                  <p className="text-xs leading-4 text-[#4A5565]">
                    {formatDate(employee.hireDate)}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-normal ${getStatusStyles(employee.employmentStatus)}`}
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
