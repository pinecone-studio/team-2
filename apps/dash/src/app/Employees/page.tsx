'use client';

import { useState } from 'react';
import { ProfilePhotoCard } from './_components/ProfilePhotoCard';
import { PersonalInfoCard } from './_components/PersonalInfoCard';
import { EmploymentDetailsCard } from './_components/EmploymentDetailsCard';
import { AddressInfoCard } from './_components/AddressInfoCard';
import { EmergencyContactCard } from './_components/EmergencyContactCard';
import { AdditionalNotesCard } from './_components/AdditionalNotesCard';

import type { FormErrors } from './_components/validation';
import { validateForm } from './_components/validation/validate-form';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  employeeId: '',
  position: '',
  department: '',
  departmentEmail: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  emergencyName: '',
  emergencyPhone: '',
  notes: '',
};

export default function Employees() {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    console.log('Employee data:', { avatar: avatarSrc, ...form });
    alert('Employee added successfully!');
  };

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setAvatarSrc(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10">
      <div className="max-w-[800px] mx-auto">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Add New Employee
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the employee details to add them to your organization
          </p>
        </div>
        <ProfilePhotoCard avatarSrc={avatarSrc} onPhotoChange={setAvatarSrc} />
        <PersonalInfoCard
          values={form}
          onChange={handleInput}
          errors={errors}
        />
        <EmploymentDetailsCard
          values={form}
          onInputChange={handleInput}
          onSelectChange={handleSelect}
          errors={errors}
        />
        <AddressInfoCard values={form} onChange={handleInput} errors={errors} />
        <EmergencyContactCard
          values={form}
          onChange={handleInput}
          errors={errors}
        />
        <AdditionalNotesCard value={form.notes} onChange={handleInput} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-6 py-4 flex justify-end gap-3 z-50">
        <button
          onClick={handleCancel}
          className="px-5 py-2.5 text-sm font-medium text-gray-500 bg-transparent border border-gray-200 rounded-lg hover:border-gray-300 hover:text-gray-700 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 shadow-md shadow-indigo-200 hover:-translate-y-px transition-all"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
}
