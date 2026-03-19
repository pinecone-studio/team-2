'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  GetEmployeesDocument,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import { getSearchableEmployeeValues } from './employeeDirectoryUtils';
import { EmployeesTable } from './_components/EmployeesTable';
import { AddEmployeeModal } from './_components/AddEmployeeModal';
import { Pagination } from './_components/Pagination';

type Employee = GetEmployeesQuery['employees'][number];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      setError('');

      try {
        const data = await gqlRequest(GetEmployeesDocument);
        setEmployees(data.employees);
      } catch (fetchError: unknown) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'Failed to load employees',
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
      getSearchableEmployeeValues(employee).some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [employees, query]);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  const handleEmployeeCreated = (employee: Employee) => {
    setEmployees((prev) => [employee, ...prev]);
    setShowAddEmployee(false);
  };

  return (
    <div className="min-h-screen  px-4 py-8 md:px-6">
      <div className="mx-auto flex max-w-[1215px] flex-col gap-6">
        {/* <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[#101828]">
            Employees
          </h1>
          <p className="text-sm text-[#667085]">
            View your employee directory and add new team members from one
            place.
          </p>
        </div> */}

        <section className="overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-3 border-b border-[#F0F2F5] px-[18px] pt-6 ">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg leading-6 tracking-[0.054px] font-medium text-[#101828]">
                  Employee
                </h2>
                {/* <p className="mt-1 text-xs text-[#4A5565]">
                  Showing {filteredEmployees.length} of {employees.length}
                  employees
                </p> */}
              </div>

              <button
                type="button"
                onClick={() => setShowAddEmployee(true)}
                className="inline-flex  items-center justify-center rounded-lg bg-[#FF9B45] p-2.5 text-sm font-[500] text-white transition hover:bg-[#F1882B]"
              >
                Add Employee
              </button>
            </div>

            <div className="flex flex-col gap-[6px] md:flex-row md:items-center mb-[19px]">
              <p className="text-xs text-[#4A5565]">Showing</p>
              <label className="relative block">
                {/* <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" /> */}
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search employees"
                  className="h-9 w-full min-w-[260px] rounded-xl border border-[#E4E7EC] bg-white pl-11 pr-4 text-sm text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#FDBA74] md:w-[320px]"
                />
              </label>

              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 ml-[6px] rounded-xl border border-[#E4E7EC] bg-white px-4 text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB]"
              >
                <SlidersHorizontal size={16} color="#616162" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-6 md:px-8">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, index) => (
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
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-12 text-center text-sm text-slate-500">
                No employees matched your search.
              </div>
            ) : (
              <>
                <EmployeesTable employees={paginatedEmployees} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </section>
      </div>

      <AddEmployeeModal
        open={showAddEmployee}
        onClose={() => setShowAddEmployee(false)}
        onSuccess={handleEmployeeCreated}
      />
    </div>
  );
}
