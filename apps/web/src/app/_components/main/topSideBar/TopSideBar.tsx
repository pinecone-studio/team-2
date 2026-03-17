'use client';
import { UserButton } from '@clerk/nextjs';
import { Bell, Settings } from 'lucide-react';
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
    <nav className="w-screen bg-white sticky top-0 z-50 px-20 py-2">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/pinecone.svg" alt="Logo" width={60} height={60} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-black leading-tight">EBMS</h1>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-3">
          {menuItems.map(({ path, label }) => (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex items-center gap-4 px-4 py-2 rounded-[8px] text-sm font-medium transition-all duration-200 ${
                isActive(path)
                  ? 'bg-[#FB923C] text-white shadow-sm'
                  : 'text-black hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* User */}
        <div className="flex items-center gap-10 shrink-0">
          <div className="text-right flex items-center">
            <Link href={'./settings'}>
              <div className="text-sm font-medium px-2 py-2 rounded-xl text-black hover:bg-gray-200 hover:text-gray-900">
                <Settings></Settings>
              </div>
            </Link>

            <div className="text-sm font-medium px-2 py-2 rounded-xl text-black hover:bg-gray-200 hover:text-gray-900">
              <Bell />
            </div>
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
