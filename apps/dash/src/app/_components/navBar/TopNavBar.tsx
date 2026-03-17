'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/employees', label: 'Employees' },
  { path: '/benefitManagement', label: 'Benefits' },
  { path: '/requestManagement', label: 'Requests' },
  { path: '/contracts', label: 'Contracts' },
  { path: '/settings', label: 'Settings' },
];

export const TopNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const isActive = (path: string) => {
    if (path === '/dashboard')
      return pathname === '/' || pathname === '/dashboard';
    return pathname === path;
  };

  return (
    <nav className="w-screen bg-gray-50 sticky top-0 z-50 px-20 py-2">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Brand */}
        <div className="shrink-0">
          <h2 className="text-base font-semibold text-[#137FEC] leading-5">
            HR Management
          </h2>
          <p className="text-[11px] text-[#90A1B9] font-normal leading-4">
            System Dashboard
          </p>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1">
          {menuItems.map(({ path, label }) => (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive(path)
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* User */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-sm font-semibold leading-tight">
              {user?.firstName} {user?.lastName?.charAt(0)}.
            </p>
            <p className="text-xs text-[#475569]">user Position</p>
          </div>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-9 h-9',
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};
