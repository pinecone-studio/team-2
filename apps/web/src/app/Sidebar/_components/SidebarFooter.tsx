import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { UserInfo } from './UserInfo';

const SidebarFooter = () => (
  <div className="p-6 mt-auto border-t border-gray-200">
    <div className="flex items-center justify-between mb-4 px-2">
      <div className="flex items-center space-x-3 overflow-hidden">
        <UserButton
          appearance={{ elements: { userButtonAvatarBox: 'w-10 h-10' } }}
        />
        <UserInfo />
      </div>
    </div>
  </div>
);

export { SidebarFooter };
