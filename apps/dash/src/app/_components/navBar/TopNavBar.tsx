'use client';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/employees', label: 'Add Employees' },
  { path: '/benefitManagement', label: 'Benefits' },
  { path: '/requestManagement', label: 'Requests' },
  { path: '/contracts', label: 'Contracts' },
];

export const TopNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage = pathname === '/' || pathname === '/dashboard';
  const inactiveHoverClass = isDashboardPage
    ? 'text-black hover:bg-white/60 hover:text-gray-900'
    : 'text-black hover:bg-gray-100 hover:text-gray-900 hover:shadow-[0_6px_18px_rgba(255,255,255,0.45)]';

  const isActive = (path: string) => {
    if (path === '/dashboard')
      return pathname === '/' || pathname === '/dashboard';
    return pathname === path;
  };

  return (
    <nav className="w-screen bg-white/50 sticky top-0 z-50 px-20 py-2 backdrop-blur-sm border-b border-white/20">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Brand */}
        <div className="flex items-center space-x-2 shrink-0">
          <Link href={'/'}>
            {' '}
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/pinecone.svg" alt="Logo" width={60} height={60} />
            </div>
          </Link>

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
                  : inactiveHoverClass
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* User */}
        <div className="flex items-center gap-10 shrink-0">
          <div className="text-right flex items-center">
            <Link href={'/settings'}>
              <div className="text-sm font-medium px-2 py-2 rounded-xl text-black hover:bg-gray-200 hover:text-gray-900 transition-colors">
                <Settings size={20} />
              </div>
            </Link>

            <div className="text-sm font-medium px-2 py-2 rounded-xl text-black hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer">
              <Bell size={20} />
            </div>
          </div>

          {/* Clerk User Button with Skeleton */}
          <div className="relative flex items-center justify-center w-8 h-8">
            {/* Ачаалж байх үед харагдах Skeleton */}
            <ClerkLoading>
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse border border-gray-100" />
            </ClerkLoading>

            {/* Ачаалж дууссаны дараа харагдах товчлуур */}
            <ClerkLoaded>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-8 h-8', // Skeleton-той ижил хэмжээтэй байх
                  },
                }}
              />
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </nav>
  );
};
