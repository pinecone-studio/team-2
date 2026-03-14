import { User, Mail, Phone } from 'lucide-react';
import { InputField } from './InputField';
import type { FormErrors } from './validation';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Props {
  values: PersonalInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

export function PersonalInfoCard({ values, onChange, errors }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 mb-4">
      <h2 className="text-sm font-semibold text-gray-900">
        Personal Information
      </h2>
      <p className="text-xs text-gray-500 mt-1 mb-5">
        Basic employee details and contact information
      </p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        <InputField
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={onChange}
          placeholder="John"
          Icon={User}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={onChange}
          placeholder="Doe"
          Icon={User}
          error={errors.lastName}
        />
        <InputField
          label="Email Address"
          name="email"
          value={values.email}
          onChange={onChange}
          placeholder="john.doe@company.com"
          type="email"
          Icon={Mail}
          error={errors.email}
        />
        <InputField
          label="Phone Number"
          name="phone"
          value={values.phone}
          onChange={onChange}
          placeholder="+1 (555) 000-0000"
          type="tel"
          Icon={Phone}
          error={errors.phone}
        />
      </div>
    </div>
  );
}
