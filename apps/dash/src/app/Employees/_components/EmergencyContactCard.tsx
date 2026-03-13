import { User, Phone } from 'lucide-react';
import { InputField } from './InputField';
import type { FormErrors } from './validation';

interface EmergencyContact {
  emergencyName: string;
  emergencyPhone: string;
}

interface Props {
  values: EmergencyContact;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

export function EmergencyContactCard({ values, onChange, errors }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 mb-4">
      <h2 className="text-sm font-semibold text-gray-900">Emergency Contact</h2>
      <p className="text-xs text-gray-500 mt-1 mb-5">
        Contact Information for emergencies
      </p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        <InputField
          label="Contact Name"
          name="emergencyName"
          value={values.emergencyName}
          onChange={onChange}
          placeholder="Jane Doe"
          Icon={User}
          error={errors.emergencyName}
          required={false}
        />
        <InputField
          label="Contact Phone"
          name="emergencyPhone"
          value={values.emergencyPhone}
          onChange={onChange}
          placeholder="+1 (555) 000-0000"
          type="tel"
          Icon={Phone}
          error={errors.emergencyPhone}
          required={false}
        />
      </div>
    </div>
  );
}
