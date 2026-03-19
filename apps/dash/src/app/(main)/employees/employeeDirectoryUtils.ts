import type { GetEmployeesQuery } from 'apps/dash/src/graphql/generated/graphql';

type Employee = GetEmployeesQuery['employees'][number];

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: 'bg-[#EAF7EC] text-[#159947]',
  LEAVE: 'bg-[#FFF0E3] text-[#F17B2C]',
  PROBATION: 'bg-[#EEF4FF] text-[#4B7BFF]',
  TERMINATED: 'bg-[#FFE7EC] text-[#E11D48]',
};

export function formatEmployeeCode(id: number) {
  return `#EMP${String(id).padStart(6, '0')}`;
}

export function formatDate(date?: string | null) {
  if (!date) return 'No date';

  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function getInitials(name?: string | null) {
  if (!name) return 'NA';

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function getSearchableEmployeeValues(employee: Employee) {
  return [
    employee.name,
    employee.email,
    employee.department,
    employee.employeeRole,
    employee.employmentStatus,
  ].filter((value): value is string => Boolean(value));
}

export function getStatusStyles(status?: string | null) {
  return (
    STATUS_STYLES[status?.toUpperCase() ?? ''] ?? 'bg-slate-100 text-slate-500'
  );
}

export function getEmployeeName(employee: Employee) {
  return employee.name ?? 'Unnamed employee';
}

export function getEmployeeEmail(employee: Employee) {
  return employee.email ?? 'No email';
}

export function getEmployeeDepartment(employee: Employee) {
  return employee.department ?? 'No department';
}

export function getEmployeeRole(employee: Employee) {
  return employee.employeeRole ?? 'No role';
}

export function getEmployeeStatusLabel(employee: Employee) {
  return employee.employmentStatus?.toLowerCase() ?? 'unknown';
}
