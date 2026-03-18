import { regex } from './regex';
import type { FormErrors } from './regex';

function checkFirstName(v: string) {
  if (!v) return 'First name is required';
  if (!regex.name.test(v)) return 'Only letters, spaces and hyphens allowed';
  return '';
}
function checkLastName(v: string) {
  if (!v) return 'Last name is required';
  if (!regex.name.test(v)) return 'Only letters, spaces and hyphens allowed';
  return '';
}
function checkEmail(v: string) {
  if (!v) return 'Email is required';
  if (!regex.email.test(v)) return 'Enter a valid email address';
  return '';
}
function checkPhone(v: string) {
  if (!v) return 'Phone number is required';
  if (!regex.phone.test(v)) return 'Enter a valid phone number';
  return '';
}

function applyErrors(errors: FormErrors, fields: Record<string, string>) {
  Object.entries(fields).forEach(([key, val]) => {
    if (val) errors[key] = val;
  });
}

export function validatePersonal(
  form: Record<string, string>,
  errors: FormErrors,
) {
  applyErrors(errors, {
    firstName: checkFirstName(form.firstName),
    lastName: checkLastName(form.lastName),
    email: checkEmail(form.email),
    phone: checkPhone(form.phone),
  });
}
