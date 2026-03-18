export type FormErrors = Record<string, string>;

export const regex = {
  name: /^[a-zA-Z\s\-']{2,50}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[\d\s\-(]{7,20}$/,
  employeeId: /^[A-Z]{2,5}-?\d{3,6}$/,
  zip: /^\d{5}(-\d{4})?$/,
  cityState: /^[a-zA-Z\s]{2,50}$/,
  address: /^[a-zA-Z0-9\s,.#-]{5,100}$/,
};
