'use client';

import { Skeleton } from '@team/source-ui';
import { Bell, X } from 'lucide-react';
import React from 'react';

export type PendingNotificationItem = {
  id: number;
  createdAt?: string | null;
  employeeName: string;
  benefitName: string;
};

type NotificationBellProps = {
  pendingItems: PendingNotificationItem[];
  notifLoading: boolean;
  notifError: string;
  isNotifOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onRequestClick: (id: number) => void;
};

export const NotificationBell = ({
  pendingItems,
  notifLoading,
  notifError,
  isNotifOpen,
  onToggle,
  onClose,
  onRequestClick,
}: NotificationBellProps) => {
  const BellSkeleton = () => (
    <div className="px-2 py-2">
      <Skeleton className="h-5 w-5 rounded-md" />
    </div>
  );

  const NotificationItemSkeleton = () => (
    <div className="w-full rounded-xl border border-gray-200 px-3 py-2">
      <Skeleton className="h-4 w-44" />
      <Skeleton className="mt-2 h-3 w-32" />
      <Skeleton className="mt-2 h-3 w-24" />
    </div>
  );

  return (
    <>
      {notifLoading && !isNotifOpen ? (
        <BellSkeleton />
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className="relative text-sm font-medium px-2 py-2 rounded-xl text-black hover:bg-gray-200 hover:text-gray-900 transition-colors"
          aria-label="Open notifications"
        >
          <Bell size={20} />
          {pendingItems.length > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      )}

      {isNotifOpen && (
        <div className="fixed inset-0 z-[60]" onClick={onClose}>
          <div
            className="absolute right-6 top-16 w-[380px] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Pending requests
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close notifications"
              >
                <X size={16} />
              </button>
            </div>

            {notifLoading ? (
              <div className="space-y-2 py-1">
                <NotificationItemSkeleton />
                <NotificationItemSkeleton />
              </div>
            ) : notifError ? (
              <p className="py-3 text-sm text-red-500">{notifError}</p>
            ) : pendingItems.length === 0 ? (
              <p className="py-3 text-sm text-gray-500">No pending requests</p>
            ) : (
              <div className="max-h-72 space-y-2 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {pendingItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onRequestClick(item.id)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-left transition-colors hover:bg-gray-50"
                  >
                    <p className="text-sm font-semibold text-gray-900">
                      {item.employeeName}
                    </p>
                    <p className="text-xs text-gray-600">{item.benefitName}</p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : 'No date'}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
