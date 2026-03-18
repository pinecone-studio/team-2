import { regex } from './regex';
import type { FormErrors } from './regex';

function checkEmployeeId(v: string) {
  if (!v) return 'Employee ID is required';
  if (!regex.employeeId.test(v)) return 'Format must be EMP-001';
  return '';
}
function checkDepartmentEmail(v: string) {
  if (!v) return 'Date of joining is required';
  if (!regex.email.test(v)) return 'Enter a valid email address';
  return '';
}
function checkRequired(v: string, msg: string) {
  return !v ? msg : '';
}
function applyErrors(errors: FormErrors, fields: Record<string, string>) {
  Object.entries(fields).forEach(([key, val]) => {
    if (val) errors[key] = val;
  });
}

export function validateEmployment(
  form: Record<string, string>,
  errors: FormErrors,
) {
  applyErrors(errors, {
    employeeId: checkEmployeeId(form.employeeId),
    position: checkRequired(form.position, 'Position is required'),
    department: checkRequired(form.department, 'Department is required'),
    departmentEmail: checkDepartmentEmail(form.departmentEmail),
  });
}
