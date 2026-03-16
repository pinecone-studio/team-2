'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import {
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from '@team/source-ui';
import {
  FileCheck,
  FileInput,
  FileText,
  Gift,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/benefitManagement', label: 'Benefits', icon: Gift },
  { path: '/requestManagement', label: 'Requests', icon: FileInput },
  { path: '/contracts', label: 'Contracts', icon: FileText },
  { path: '/rules', label: 'Rules', icon: FileCheck },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const SideBarDash = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const isActive = (path: string) => {
    if (path === '/dashboard')
      return pathname === '/' || pathname === '/dashboard';
    return pathname === path;
  };

  return (
    <div>
      <Sidebar className="w-content">
        <SidebarHeader className="py-6 px-8 flex flex-column gap-0">
          <h2 className="text-[20px] font-semibold text-[#137FEC] leading-7">
            HR Management
          </h2>
          <p className="text-[14px] text-[#90A1B9] font-normal leading-5 -mt-2">
            System Dashboard
          </p>
        </SidebarHeader>
        <Separator />
        <SidebarContent className="p-4">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <SidebarMenuButton
              key={path}
              onClick={() => router.push(path)}
              className={`w-full flex items-center gap-2 px-4 py-5 rounded-xl transition-all duration-200 group ${
                isActive(path)
                  ? 'bg-[#3b82f6] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} />
              {label}
            </SidebarMenuButton>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <Separator />
          <div className="flex items-center gap-3 py-5 px-5">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-9 h-9',
                },
              }}
            />
            <div className="">
              <p className="text-lg leading-6 font-medium text-[#137FEC] ">
                {user?.firstName} {user?.lastName?.charAt(0)}.
              </p>
              <p className="text-sm leading-5 font-normal text-[#475569]">
                user Position
              </p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};
