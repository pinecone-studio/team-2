import {
  LayoutDashboard,
  Gift,
  ClipboardList,
  FileText,
  Settings,
} from 'lucide-react';
import React from 'react';

export const MenuItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: React.createElement(LayoutDashboard, { size: 18 }),
  },
  {
    name: 'My Benefits',
    path: '/myBenefits',
    icon: React.createElement(Gift, { size: 18 }),
  },
  {
    name: 'My Requests',
    path: '/myRequests',
    icon: React.createElement(ClipboardList, { size: 18 }),
  },
  {
    name: 'Contracts',
    path: '/contracts',
    icon: React.createElement(FileText, { size: 18 }),
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: React.createElement(Settings, { size: 18 }),
  },
];

export type MenuItem = (typeof MenuItems)[number];
