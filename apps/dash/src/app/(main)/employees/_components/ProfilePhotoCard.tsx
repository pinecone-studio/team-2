import { UploadCloud } from 'lucide-react';
import { useRef } from 'react';
interface Props {
  avatarSrc: string | null; // Сонгогдсон зургийн base64 URL — null бол зураг байхгүй
  onPhotoChange: (src: string, file?: File) => void; // Зураг сонгоход page.tsx-д мэдэгдэх функц
}
export function ProfilePhotoCard({ avatarSrc, onPhotoChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPhotoChange(ev.target?.result as string, file);
    reader.readAsDataURL(file);
  };
  return (
    <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm p-5 mb-4">
      <h2 className="text-sm font-semibold text-gray-900">Profile Photo</h2>
      <p className="text-xs text-gray-500 mt-1 mb-5">
        Upload a professional photo for the employee profile
      </p>
      <div className="flex items-center gap-5">
        <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="text-gray-400"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <UploadCloud size={14} />
            Upload Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <span className="text-xs text-gray-400">
            JPG, PNG or GIF. Max 5MB
          </span>
        </div>
      </div>
    </div>
  );
}
