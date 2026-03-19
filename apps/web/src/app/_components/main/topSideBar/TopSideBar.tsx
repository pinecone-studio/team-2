'use client';

import { UserButton, ClerkLoading, ClerkLoaded, useUser } from '@clerk/nextjs';
import { Skeleton } from '@team/source-ui';
import { Bell, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  GetBenefitRequestsByEmployeeDocument,
  GetBenefitsDocument,
  GetEmployeesDocument,
  RequestStatus,
} from 'apps/web/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';

const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/myBenefits', label: 'My Benefits' },
  { path: '/myRequests', label: 'My Requests' },
  { path: '/contracts', label: 'Contracts' },
];

type DecisionNotification = {
  id: number;
  benefitName: string;
  createdAt?: string | null;
  status: RequestStatus.Approved | RequestStatus.Rejected;
};

export const TopNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<DecisionNotification[]>(
    [],
  );
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState('');

  const isDashboardPage = pathname === '/' || pathname === '/dashboard';
  const inactiveHoverClass = isDashboardPage
    ? 'text-black hover:bg-white/60 hover:text-gray-900'
    : 'text-black hover:bg-gray-100 hover:text-gray-900 hover:shadow-[0_6px_18px_rgba(255,255,255,0.45)]';

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === '/dashboard';
    return pathname === path;
  };

  const fetchDecisionNotifications = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      if (!user?.id) return;
      if (fetchInFlightRef.current) return;
      fetchInFlightRef.current = true;

      if (!silent) {
        setNotifLoading(true);
        setNotifError('');
      }

      try {
        const [employeesData, benefitsData] = await Promise.all([
          gqlRequest(GetEmployeesDocument),
          gqlRequest(GetBenefitsDocument),
        ]);

        const me = employeesData.employees.find(
          (e) => e.clerkUserId === user.id,
        );

        if (!me) {
          setNotifications([]);
          return;
        }

        const requestsData = await gqlRequest(
          GetBenefitRequestsByEmployeeDocument,
          {
            employeeId: Number(me.id),
          },
        );

        const decisionItems: DecisionNotification[] =
          requestsData.benefitRequestsByEmployee
            .filter(
              (r) =>
                r.status === RequestStatus.Approved ||
                r.status === RequestStatus.Rejected,
            )
            .sort((a, b) => {
              const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return bTime - aTime;
            })
            .map((r) => {
              const benefit = benefitsData.benefits.find(
                (b) => b.id === r.benefitId,
              );

              return {
                id: r.id,
                benefitName: benefit?.name ?? `Benefit #${r.benefitId}`,
                createdAt: r.createdAt,
                status:
                  r.status === RequestStatus.Approved
                    ? RequestStatus.Approved
                    : RequestStatus.Rejected,
              };
            });

        setNotifications(decisionItems);
      } catch (e: unknown) {
        if (!silent) {
          setNotifError(
            e instanceof Error ? e.message : 'Failed to load notifications',
          );
        }
      } finally {
        if (!silent) {
          setNotifLoading(false);
        }
        fetchInFlightRef.current = false;
      }
    },
    [user?.id],
  );

  useEffect(() => {
    fetchDecisionNotifications();
  }, [fetchDecisionNotifications]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchDecisionNotifications({ silent: true });
      }
    }, 15000); // 15s
    return () => window.clearInterval(id);
  }, [fetchDecisionNotifications]);

  useEffect(() => {
    const onFocus = () => {
      fetchDecisionNotifications({ silent: true });
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchDecisionNotifications]);

  const handleToggleNotifications = async () => {
    const next = !isNotifOpen;
    setIsNotifOpen(next);

    if (next) {
      await fetchDecisionNotifications({ silent: false });
    }
  };

  const handleNotificationClick = () => {
    setIsNotifOpen(false);
    router.push('/myRequests');
  };

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
  const fetchInFlightRef = useRef(false);

  return (
    <nav className="w-screen bg-[#FAFAFAB2] sticky top-0 z-50 px-20  backdrop-blur-sm border-b border-white/20">
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center space-x-2 shrink-0">
          <Link href="/">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/pinecone.svg" alt="Logo" width={60} height={60} />
            </div>
          </Link>

          <Link href="/">
            <div>
              <h1 className="text-xl font-bold text-black leading-tight">
                EBMS
              </h1>
            </div>
          </Link>
        </div>

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

        <div className="flex items-center gap-10 shrink-0">
          <div className="text-right flex items-center">
            <Link href="/settings">
              <div className="text-sm font-medium px-2 py-2 rounded-xl text-black hover:bg-gray-200 hover:text-gray-900 transition-colors">
                <Settings size={20} />
              </div>
            </Link>

            {notifLoading && !isNotifOpen ? (
              <BellSkeleton />
            ) : (
              <button
                type="button"
                onClick={handleToggleNotifications}
                className="relative text-sm font-medium px-2 py-2 rounded-xl text-black hover:bg-gray-200 hover:text-gray-900 transition-colors"
                aria-label="Open notifications"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>
            )}
          </div>

          <div className="relative flex items-center justify-center w-8 h-8">
            <ClerkLoading>
              <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse border border-gray-100" />
            </ClerkLoading>

            <ClerkLoaded>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-7 h-7', // Skeleton-той ижил хэмжээтэй байх
                  },
                }}
              />
            </ClerkLoaded>
          </div>
        </div>
      </div>

      {isNotifOpen && (
        <div
          className="fixed inset-0 z-[60]"
          onClick={() => setIsNotifOpen(false)}
        >
          <div
            className="absolute right-6 top-16 w-[380px] rounded-2xl border border-gray-200 bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                My notifications
              </h3>
              <button
                type="button"
                onClick={() => setIsNotifOpen(false)}
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
            ) : notifications.length === 0 ? (
              <p className="py-3 text-sm text-gray-500">
                No new decision notifications
              </p>
            ) : (
              <div className="max-h-72 space-y-2 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {notifications.map((item) => {
                  const approved = item.status === RequestStatus.Approved;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={handleNotificationClick}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-left transition-colors hover:bg-gray-50"
                    >
                      <p
                        className={`text-sm font-semibold ${
                          approved ? 'text-green-600' : 'text-rose-600'
                        }`}
                      >
                        {approved
                          ? 'Таны хүсэлт амжилттай зөвшөөрөгдлөө'
                          : 'Таны хүсэлтийг татгалзлаа'}
                      </p>
                      <p className="text-xs text-gray-700">
                        {item.benefitName}
                      </p>
                      <p className="mt-1 text-[11px] text-gray-400">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString()
                          : 'No date'}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
