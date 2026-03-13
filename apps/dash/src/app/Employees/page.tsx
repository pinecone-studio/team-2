// page.tsx  (src/app/Employees/page.tsx)
// Энэ бол үндсэн хуудас — state барьж, component-уудыг нэгтгэнэ
// "use client" — useState ашиглаж байгаа учир заавал бичнэ (Next.js шаардлага)

'use client';

import { useState } from 'react';
import { ProfilePhotoCard } from './_components/ProfilePhotoCard';
import { PersonalInfoCard } from './_components/PersonalInfoCard';
import { EmploymentDetailsCard } from './_components/EmploymentDetailsCard';

// Form-ийн анхны хоосон утгууд — cancel дарах үед энд буцана
const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  employeeId: '',
  position: '',
  department: '',
  departmentEmail: '',
};

export default function Employees() {
  // avatarSrc — зургийн base64 URL, null бол зураг байхгүй гэсэн үг
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // form — бүх input талбарын утгуудыг нэг объектод хадгална
  const [form, setForm] = useState(INITIAL_FORM);

  // Аль ч <input> өөрчлөгдөхөд e.target.name-г ашиглаж зөв талбарыг шинэчилнэ
  // жишээ: firstName талбар өөрчлөгдвөл → { ...form, firstName: "John" }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // <select> өөр event төрөлтэй учир тусдаа handler хэрэгтэй
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
  };

  // "Cancel" дарахад — бүх утгыг хоосон болгоно
  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setAvatarSrc(null);
    setAvatarFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10">
      <div className="max-w-[800px] mx-auto">
        {/* Хуудасны гарчиг */}
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
        />
      </div>
    </div>
  );
}
