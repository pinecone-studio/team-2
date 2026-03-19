'use client';

type BrandLoaderProps = {
  label?: string;
  className?: string;
};

export function BrandLoader({
  label = 'Loading your workspace',
  className = '',
}: BrandLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex w-full items-center justify-center bg-[#FAFAFAB2] backdrop-blur-sm ${className}`}
    >
      <div className="pointer-events-none flex h-[184px] w-[184px] flex-col items-center justify-center rounded-[28px] border-[3px] border-white bg-[#D3D3D3]/95 shadow-[0_18px_42px_rgba(15,23,42,0.22)]">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="h-[62px] w-[62px] animate-spin rounded-full border-[7px] border-[#EEF8EB] border-r-[#A2D89A] border-t-[#67BC5B]" />
        </div>

        <div className="mt-2 text-center">
          <p className="text-[22px] font-medium leading-none text-white">
            Loading
          </p>
          <p className="mt-2 max-w-[132px] text-center text-[10px] font-medium leading-[1.35] text-white/80">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
