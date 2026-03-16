import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section({
  title,
  description,
  children,
}: SectionProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}