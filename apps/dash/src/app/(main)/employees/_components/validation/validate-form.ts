import type { FormErrors } from './regex';
import { validateAddress } from './validate-address';
import { validateEmergency } from './validate-emergency';
import { validateEmployment } from './validate-employment';
import { validatePersonal } from './validate-personal';

export function validateForm(form: Record<string, string>): FormErrors {
  const errors: FormErrors = {};
  validatePersonal(form, errors);
  validateEmployment(form, errors);
  validateAddress(form, errors);
  validateEmergency(form, errors);
  return errors;
}
