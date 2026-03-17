'use client';
import { UserButton } from '@clerk/nextjs';
import { Gift, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/myBenefits', label: 'My Benefits' },
  { path: '/myRequests', label: 'My Requests' },
  { path: '/contracts', label: 'Contracts' },
];

export const TopNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard')
      return pathname === '/' || pathname === '/dashboard';
    return pathname === path;
  };

  return (
    <nav className="w-screen  sticky top-0 z-50 px-20 py-2">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="w-9 h-9 bg-[#324554] rounded-xl flex items-center justify-center shadow-md">
            <Gift className="text-white" size={18} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#1a2b3b] leading-tight">
              Employee Benefits
            </h1>
            <p className="text-[10px] text-gray-500 font-medium">
              Baatar Dorj • Engineering
            </p>
          </div>
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
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* User */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <Link href={'./settings'}>
              <div className="bg-[#D8D8D8] rounded-full px-1 py-1">
                <Settings size={20} />
              </div>
            </Link>
          </div>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-7 h-7',
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};
