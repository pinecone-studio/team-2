import { regex } from './regex';
import type { FormErrors } from './regex';

function checkName(v: string) {
  return v && !regex.name.test(v)
    ? 'Only letters, spaces and hyphens allowed'
    : '';
}
function checkPhone(v: string) {
  return v && !regex.phone.test(v) ? 'Enter a valid phone number' : '';
}

export function validateEmergency(
  form: Record<string, string>,
  errors: FormErrors,
) {
  const name = checkName(form.emergencyName);
  const phone = checkPhone(form.emergencyPhone);
  if (name) errors.emergencyName = name;
  if (phone) errors.emergencyPhone = phone;
}
