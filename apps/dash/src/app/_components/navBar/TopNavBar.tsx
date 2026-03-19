'use client';

import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  GetBenefitRequestsDocument,
  GetBenefitsDocument,
  GetEmployeesDocument,
  RequestStatus,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import {
  NotificationBell,
  type PendingNotificationItem,
} from './NotificationBell';

const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/employees', label: 'Employees' },
  { path: '/benefitManagement', label: 'Benefits' },
  { path: '/requestManagement', label: 'Requests' },
  { path: '/contracts', label: 'Contracts' },
];

type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

export const TopNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [pendingItems, setPendingItems] = useState<PendingNotificationItem[]>(
    [],
  );
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState('');

  const isDashboardPage = pathname === '/' || pathname === '/dashboard';
  const inactiveHoverClass = isDashboardPage
    ? 'text-black hover:bg-white/60 hover:text-gray-900'
    : 'text-black hover:bg-gray-100 hover:text-gray-900 hover:shadow-[0_6px_18px_rgba(255,255,255,0.45)]';

  const isActive = (path: string) => {
    if (path === '/' || path === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname === path;
  };
  const fetchPendingRequests = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      if (fetchInFlightRef.current) return;
      fetchInFlightRef.current = true;

      if (!silent) {
        setNotifLoading(true);
        setNotifError('');
      }

      try {
        const [requestsData, benefitsData, employeesData] = await Promise.all([
          gqlRequest(GetBenefitRequestsDocument),
          gqlRequest(GetBenefitsDocument),
          gqlRequest(GetEmployeesDocument),
        ]);

        const benefits: Benefit[] = benefitsData.benefits;
        const employees: Employee[] = employeesData.employees;

        const pending = requestsData.benefitRequests
          .filter((r) => r.status === RequestStatus.Pending)
          .sort((a, b) => {
            const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bTime - aTime;
          })
          .map((r) => {
            const employee = employees.find((e) => e.id === r.employeeId);
            const benefit = benefits.find((b) => b.id === r.benefitId);

            return {
              id: r.id,
              createdAt: r.createdAt,
              employeeName: employee?.name ?? `Employee #${r.employeeId}`,
              benefitName: benefit?.name ?? `Benefit #${r.benefitId}`,
            };
          });

        setPendingItems(pending);
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
    [],
  );

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchPendingRequests({ silent: true });
      }
    }, 15000); // 15s
    return () => window.clearInterval(id);
  }, [fetchPendingRequests]);

  useEffect(() => {
    const onFocus = () => {
      fetchPendingRequests({ silent: true });
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchPendingRequests]);

  const handleToggleNotifications = async () => {
    const nextOpen = !isNotifOpen;
    setIsNotifOpen(nextOpen);

    if (nextOpen) {
      await fetchPendingRequests({ silent: false });
    }
  };

  const handleCloseNotifications = () => {
    setIsNotifOpen(false);
  };

  const handleRequestClick = (_id: number) => {
    setIsNotifOpen(false);
    router.push('/requestManagement');
  };
  const fetchInFlightRef = useRef(false);

  return (
    <>
      <nav className="w-screen bg-white/50 sticky top-0 z-50 px-20 py-2 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between px-6 h-14">
          <div className="flex items-center space-x-2 shrink-0">
            <Link href="/">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/pinecone.svg" alt="Logo" width={60} height={60} />
              </div>
            </Link>

            <div>
              <h1 className="text-xl font-bold text-black leading-tight">
                EBMS
              </h1>
            </div>
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

              <NotificationBell
                pendingItems={pendingItems}
                notifLoading={notifLoading}
                notifError={notifError}
                isNotifOpen={isNotifOpen}
                onToggle={handleToggleNotifications}
                onClose={handleCloseNotifications}
                onRequestClick={handleRequestClick}
              />
            </div>

            <div className="relative flex items-center justify-center w-8 h-8">
              <ClerkLoading>
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse border border-gray-100" />
              </ClerkLoading>

              <ClerkLoaded>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'w-8 h-8',
                    },
                  }}
                />
              </ClerkLoaded>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
