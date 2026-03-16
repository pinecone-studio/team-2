import { CheckCircle } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SuccessDialog({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl px-8 py-8 flex flex-col items-center gap-4 w-[320px] animate-in fade-in zoom-in duration-200">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={36} className="text-green-500" />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Employee Added!
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            The new employee has been successfully registered.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
}
