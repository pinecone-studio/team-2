'use client';

import type { GetEmployeesQuery } from 'apps/dash/src/graphql/generated/graphql';
import {
  formatDate,
  formatEmployeeCode,
  getEmployeeDepartment,
  getEmployeeName,
  getEmployeeRole,
  getEmployeeStatusLabel,
  getInitials,
  getStatusStyles,
} from '../employeeDirectoryUtils';
import { ChevronDown } from 'lucide-react';

type Employee = GetEmployeesQuery['employees'][number];

type Props = {
  employees: Employee[];
};

type RowProps = {
  employee: Employee;
};

function EmployeeTableRow({ employee }: RowProps) {
  const employeeName = getEmployeeName(employee);
  // const employeeEmail = getEmployeeEmail(employee);
  const employeeDepartment = getEmployeeDepartment(employee);
  const employeeRole = getEmployeeRole(employee);
  const employeeStatusLabel = getEmployeeStatusLabel(employee);

  return (
    <tr
      key={employee.id}
      className="border-b border-[#F2F4F7] text-xs leading-[12.384px] text-[#344054]"
    >
      <td className="border-b border-[#F2F4F7] px-6 py-[7px]">
        <div className="flex items-center gap-[9px]">
          <div className="flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-full bg-[#D8ECFF] text-xs font-semibold text-[#155DFC]">
            {getInitials(employee.name)}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-xs leading-5 text-[#101828]">
              {employeeName}
            </p>
            {/* <p className="truncate text-xs text-[#667085]">{employeeEmail}</p> */}
          </div>
        </div>
      </td>

      <td className="border-b border-[#F2F4F7] text-xs px-6 py-[7px] text-[#667085]">
        {formatEmployeeCode(employee.id)}
      </td>

      <td className="border-b border-[#F2F4F7] px-6 py-[7px] tracking-[ -0.116px]">
        {employeeDepartment}
      </td>

      <td className="border-b border-[#F2F4F7] px-6 py-[7px]">
        {employeeRole}
      </td>

      <td className="border-b border-[#F2F4F7] px-6 py-[7px] text-[#667085]">
        {formatDate(employee.hireDate)}
      </td>

      <td className="border-b border-[#F2F4F7] px-6 py-[7px]">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(employee.employmentStatus)}`}
        >
          {employeeStatusLabel}
        </span>
      </td>

      <td className="border-b border-[#F2F4F7] px-6 py-[7px] text-center">
        <button
          type="button"
          className="text-xl leading-none text-[#98A2B3] transition hover:text-[#344054]"
          aria-label={`Actions for ${employeeName}`}
        >
          ...
        </button>
      </td>
    </tr>
  );
}

export function EmployeesTable({ employees }: Props) {
  return (
    <table className="min-w-full border-separate border-spacing-0">
      <thead>
        <tr className="bg-[#F8FAFC] text-left text-xs font-[400] leading-normal text-[#6A7282]">
          <th className=" pl-[19px] py-3">
            <p className="flex items-center gap-2">
              Employee Name
              <span>
                <ChevronDown size={14} color="#6A7282" />
              </span>
            </p>
          </th>
          <th className="pl-[19px] py-3">
            <p className="flex items-center gap-2">
              Employee ID
              <span>
                <ChevronDown size={14} color="#6A7282" />
              </span>
            </p>
          </th>
          <th className="pl-[19px] py-3">
            <p className="flex items-center gap-2">
              Department
              <span>
                <ChevronDown size={14} color="#6A7282" />
              </span>
            </p>
          </th>
          <th className="pl-[19px] py-3">
            <p className="flex items-center gap-2">
              Position
              <span>
                <ChevronDown size={14} color="#6A7282" />
              </span>
            </p>
          </th>
          <th className="pl-[19px] py-3">
            <p className="flex items-center gap-2">
              Join Date
              <span>
                <ChevronDown size={14} color="#6A7282" />
              </span>
            </p>
          </th>
          <th className="pl-[19px] py-3">
            <p className="flex items-center gap-2">
              Status
              <span>
                <ChevronDown size={14} color="#6A7282" />
              </span>
            </p>
          </th>
          <th className=" pl-[19px] py-3 text-center">
            <p className="flex items-center gap-2">
              Action
              <span>
                <ChevronDown size={14} color="#6A7282" />
              </span>
            </p>
          </th>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee) => (
          <EmployeeTableRow key={employee.id} employee={employee} />
        ))}
      </tbody>
    </table>
  );
}
