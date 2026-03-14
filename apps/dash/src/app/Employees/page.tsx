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
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // form — бүх input талбарын утгуудыг нэг объектод хадгална
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

  const handlePhotoChange = (src: string, file?: File) => {
    setAvatarSrc(src);
    if (file) setAvatarFile(file);
  };

  // Upload avatar to API; returns URL or null if no file.
  const uploadAvatar = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:8787/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload image');
    const data = await res.json();
    return `http://localhost:8787${data.url}`;
  };

  // "Add Employee" дарахад — одоогоор API дуудлага болгож file-г хуулна
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const uploadedUrl = avatarFile ? await uploadAvatar(avatarFile) : null;
      console.log('Employee data:', { avatar: uploadedUrl, ...form });
      alert('Employee added successfully! Check console for data.');
      handleCancel();
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : 'An error occurred during employee creation.';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
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
    setAvatarFile(null);
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

        {/* 3 card дараалан — state-г props-оор дамжуулна */}
        <ProfilePhotoCard avatarSrc={avatarSrc} onPhotoChange={handlePhotoChange} />

        <PersonalInfoCard values={form} onChange={handleInputChange} />

        <EmploymentDetailsCard
          values={form}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
<!--         <ProfilePhotoCard avatarSrc={avatarSrc} onPhotoChange={setAvatarSrc} />
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
        /> -->
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
