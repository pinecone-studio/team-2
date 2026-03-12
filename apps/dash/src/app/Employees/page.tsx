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

  // "Add Employee" дарахад — одоогоор console + alert, та API дуудлага болгож болно
  const handleSubmit = () => {
    console.log('Employee data:', { avatar: avatarSrc, ...form });
    alert('Employee added successfully!');
  };

  // "Cancel" дарахад — бүх утгыг хоосон болгоно
  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setAvatarSrc(null);
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
        <ProfilePhotoCard avatarSrc={avatarSrc} onPhotoChange={setAvatarSrc} />

        <PersonalInfoCard values={form} onChange={handleInputChange} />

        <EmploymentDetailsCard
          values={form}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
