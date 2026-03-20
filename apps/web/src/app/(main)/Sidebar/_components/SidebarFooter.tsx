'use client';

import React from 'react';
import { AccountMenu } from '../../../_components/main/AccountMenu';
import { UserInfo } from './UserInfo';

const SidebarFooter = () => (
  <div className="p-6 mt-auto border-t border-gray-200">
    <div className="flex items-center justify-between mb-4 px-2">
      <div className="flex items-center space-x-3 overflow-hidden">
        <AccountMenu avatarClassName="h-10 w-10" />
        <UserInfo />
      </div>
    </div>
  </div>
);

export { SidebarFooter };
