'use client';

import React, { useEffect, useState } from 'react';
import { Gift } from 'lucide-react';
import { NavItem } from './_components/NavItem';
import { SidebarFooter } from './_components/SidebarFooter';
import { MenuItems } from './_components/MenuItems';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-72 bg-white border-r border-gray-100 flex flex-col h-screen">
      <div className="p-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#324554] rounded-xl flex items-center justify-center shadow-lg">
            <Gift className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1a2b3b] leading-tight">
              Employee Benefits
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Baatar Dorj • Engineering
            </p>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-gray-200 rounded-full mx-6 mb-6" />

      <nav className="flex-1 px-6 space-y-1.5">
        {MenuItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isActive={pathname === item.path}
          />
        ))}
      </nav>

      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
