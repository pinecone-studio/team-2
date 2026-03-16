import { MapPin, Building, Hash } from 'lucide-react';
import { InputField } from './InputField';
import type { FormErrors } from './validation';

interface AddressInfo {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

interface Props {
  values: AddressInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

export function AddressInfoCard({ values, onChange, errors }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 mb-4">
      <h2 className="text-sm font-semibold text-gray-900">
        Address Information
      </h2>
      <p className="text-xs text-gray-500 mt-1 mb-5">
        Residential address details
      </p>
      <div className="flex flex-col gap-4">
        <InputField
          label="Street Address"
          name="streetAddress"
          value={values.streetAddress}
          onChange={onChange}
          placeholder="123 Main Street, Apartment 4B"
          Icon={MapPin}
          error={errors.streetAddress}
          required={false}
        />
        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="City"
            name="city"
            value={values.city}
            onChange={onChange}
            placeholder="New York"
            Icon={Building}
            error={errors.city}
            required={false}
          />
          <InputField
            label="State"
            name="state"
            value={values.state}
            onChange={onChange}
            placeholder="NY"
            Icon={Building}
            error={errors.state}
            required={false}
          />
          <InputField
            label="ZIP Code"
            name="zip"
            value={values.zip}
            onChange={onChange}
            placeholder="10001"
            Icon={Hash}
            error={errors.zip}
            required={false}
          />
        </div>
      </div>
    </div>
  );
}
