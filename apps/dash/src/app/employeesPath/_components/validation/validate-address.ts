import { regex } from './regex';
import type { FormErrors } from './regex';

function checkStreet(v: string) {
  return v && !regex.address.test(v) ? 'Enter a valid street address' : '';
}
function checkCity(v: string) {
  return v && !regex.cityState.test(v) ? 'Only letters and spaces allowed' : '';
}
function checkState(v: string) {
  return v && !regex.cityState.test(v) ? 'Only letters and spaces allowed' : '';
}
function checkZip(v: string) {
  return v && !regex.zip.test(v)
    ? 'ZIP code must be 5 digits (e.g. 10001)'
    : '';
}

function applyErrors(errors: FormErrors, fields: Record<string, string>) {
  Object.entries(fields).forEach(([key, val]) => {
    if (val) errors[key] = val;
  });
}

export function validateAddress(
  form: Record<string, string>,
  errors: FormErrors,
) {
  applyErrors(errors, {
    streetAddress: checkStreet(form.streetAddress),
    city: checkCity(form.city),
    state: checkState(form.state),
    zip: checkZip(form.zip),
  });
}
