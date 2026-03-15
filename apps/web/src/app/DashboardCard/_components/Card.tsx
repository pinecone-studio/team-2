'use client';

import { Skeleton } from '@team/source-ui';
import { BadgeCheck } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

type Stat = {
  title: string;
  value: number;
  icon: IconType;
  color: string;
};

type CardProps = {
  isLoading?: boolean;
};

export function Card({ isLoading = false }: CardProps) {
  const stats: Stat[] = [
    {
      title: 'Active Benefits',
      value: 8,
      icon: BadgeCheck,
      color: 'bg-emerald-500',
    },
    { title: 'Eligible', value: 8, icon: BadgeCheck, color: 'bg-sky-600' },
    { title: 'Locked', value: 8, icon: BadgeCheck, color: 'bg-slate-400' },
    { title: 'Pending', value: 8, icon: BadgeCheck, color: 'bg-amber-500' },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm"
          >
            <Skeleton className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full" />

            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-10 rounded-full" />
            </div>

            <Skeleton className="h-3 w-24 rounded mt-4" />
            <Skeleton className="h-6 w-12 rounded mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="relative bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm"
          >
            <div
              className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${stat.color}`}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600">
                <Icon size={18} />
              </div>
              <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-[2px] rounded-full">
                +2%
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
