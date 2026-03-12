'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { MenuItem } from './MenuItems';

type NavItemProps = {
  item: MenuItem;
  isActive: boolean;
};

const NavItem = ({ item, isActive }: NavItemProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(item.path)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? 'bg-[#eef5ff] text-[#3b82f6] shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span
          className={
            isActive
              ? 'text-[#3b82f6]'
              : 'text-gray-600 group-hover:text-gray-600'
          }
        >
          {item.icon}
        </span>
        <span className="text-[14px] font-semibold">{item.name}</span>
      </div>
      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />}
    </button>
  );
};

export { NavItem };
