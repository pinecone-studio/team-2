// FormField.tsx
// Энэ файлд хоёр дахин ашиглагдах input, select component-ууд байна

import type { LucideIcon } from 'lucide-react';

// ─── InputField ───────────────────────────────────────────────────────────────
// Нэг мөр бичих талбар (текст, имэйл, утас гэх мэт)
// Props гэдэг нь component-д гаднаас дамжуулж өгдөг утгууд

interface InputFieldProps {
  label: string; // Талбарын гарчиг   — жишээ: "First Name"
  name: string; // form дахь нэр     — жишээ: "firstName"
  value: string; // Одоогийн утга      — useState-аас ирнэ
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Хэрэглэгч бичих үед дуудагдах функц
  placeholder?: string; // Дэлгэцэнд харагдах жишээ текст
  type?: string; // "text" | "email" | "tel" — заагаагүй бол "text" байна
  Icon: LucideIcon; // Зүүн талд харагдах lucide-react icon
}

export function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  Icon,
}: InputFieldProps) {
  return (
    // flex-col — label дээр, input доор байрлана
    <div className="flex flex-col gap-1.5">
      {/* Талбарын гарчиг + улаан одоор заавал бөглөх тэмдэг */}
      <label className="text-sm font-medium text-gray-800">
        {label} <span className="text-red-500 text-xs">*</span>
      </label>

      {/* relative — icon-г input дотор байрлуулахад хэрэгтэй */}
      <div className="relative flex items-center">
        {/* Icon — absolute left-3 гэдэг нь input-ийн зүүн талд 12px зайтай байрлана */}
        <Icon
          size={14}
          className="absolute left-3 text-gray-400 pointer-events-none"
        />

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          // pl-9  — icon давхцахгүйн тулд текст зүүнээс зай авна
          // focus — товших үед цэнхэр зах + цагаан дэвсгэр болно
          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
        />
      </div>
    </div>
  );
}

// ─── SelectField ──────────────────────────────────────────────────────────────
// Dropdown сонгох талбар — "Select Department" гэх мэт
// InputField-тэй ижил бүтэцтэй, зөвхөн <input>-ийн оронд <select> ашиглана

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // select-д зориулсан тусдаа onChange
  options: { value: string; label: string }[]; // dropdown-д харагдах жагсаалт
  Icon: LucideIcon;
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  Icon,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-800">
        {label} <span className="text-red-500 text-xs">*</span>
      </label>

      <div className="relative flex items-center">
        <Icon
          size={14}
          className="absolute left-3 text-gray-400 pointer-events-none z-10"
        />

        <select
          name={name}
          value={value}
          onChange={onChange}
          // appearance-none — браузерийн default сумыг нуугаад доор өөрийн svg сумыг тавина
          className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
        >
          {/* options массиваас map хийж <option>-уудыг дүрслэнэ */}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Доош харсан сум — appearance-none-оор нуусан учир гараар svg зурж тавьсан */}
        <svg
          className="absolute right-3 text-gray-400 pointer-events-none"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
