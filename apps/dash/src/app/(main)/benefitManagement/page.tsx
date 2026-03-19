'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
  Button,
  Calendar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from '@team/source-ui';
import {
  CalendarIcon,
  Clock3,
  Ellipsis,
  Filter,
  Plus,
  Search,
} from 'lucide-react';
import { AddBenefitDialog } from './_components/AddBenefitDialog';
import { BenefitDetailsDialog } from './_components/BenefitDetailsDialog';
import { DeleteBenefitDialog } from './_components/DeleteBenefitDialog';
import { BenefitsManagementSkeleton } from './_components/skeletonComp/BenefitsManagementSkeleton';
import {
  DeleteBenefitDocument,
  GetBenefitsDocument,
  GetBenefitsQuery,
  UpdateBenefitDocument,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';

type Benefit = GetBenefitsQuery['benefits'][number];

const ARCHIVE_RETENTION_DAYS = 12;
const ARCHIVE_STORAGE_KEY = 'benefit-management-archive-dates';
const DAY_IN_MS = 24 * 60 * 60 * 1000;

type ArchiveDateMap = Record<string, string>;

function sortBenefitsNewestFirst(benefits: Benefit[]) {
  return [...benefits].sort((first, second) => second.id - first.id);
}

function formatToolbarDate(value: Date) {
  return value.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getArchiveDatesFromStorage(): ArchiveDateMap {
  if (typeof window === 'undefined') return {};

  try {
    const rawValue = window.localStorage.getItem(ARCHIVE_STORAGE_KEY);
    if (!rawValue) return {};

    const parsed = JSON.parse(rawValue);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveArchiveDates(nextValue: ArchiveDateMap) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(nextValue));
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  return error instanceof Error ? error.message : fallbackMessage;
}

function matchesSelectedDate(
  dateString: string | null | undefined,
  selectedDate: Date,
) {
  if (!dateString) return false;

  const dateValue = new Date(dateString);
  if (Number.isNaN(dateValue.getTime())) return false;

  return dateValue.toDateString() === selectedDate.toDateString();
}

function getDaysLeftForDeletion(
  benefitId: number,
  archiveDates: ArchiveDateMap,
) {
  const archivedAt = archiveDates[String(benefitId)];
  if (!archivedAt) return ARCHIVE_RETENTION_DAYS;

  const archivedDate = new Date(archivedAt);
  if (Number.isNaN(archivedDate.getTime())) return ARCHIVE_RETENTION_DAYS;

  const elapsedDays = Math.floor(
    (Date.now() - archivedDate.getTime()) / DAY_IN_MS,
  );
  return Math.max(0, ARCHIVE_RETENTION_DAYS - elapsedDays);
}

export default function BenefitsManagement() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [archiveDates, setArchiveDates] = useState<ArchiveDateMap>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [applyDateFilter, setApplyDateFilter] = useState(false);

  useEffect(() => {
    setArchiveDates(getArchiveDatesFromStorage());
  }, []);

  useEffect(() => {
    async function fetchBenefits() {
      setLoading(true);
      setError('');

      try {
        const data = await gqlRequest(GetBenefitsDocument);
        setBenefits(sortBenefitsNewestFirst(data.benefits));
      } catch (error: unknown) {
        setError(getErrorMessage(error, 'Failed to fetch benefits'));
      } finally {
        setLoading(false);
      }
    }

    fetchBenefits();
  }, []);

  useEffect(() => {
    if (loading || benefits.length === 0) return;

    const expiredBenefits = benefits.filter((benefit) => {
      if (benefit.isActive !== false) return false;
      return getDaysLeftForDeletion(benefit.id, archiveDates) <= 0;
    });

    if (expiredBenefits.length === 0) return;

    let cancelled = false;

    async function removeExpiredBenefits() {
      for (const benefit of expiredBenefits) {
        try {
          const data = await gqlRequest(DeleteBenefitDocument, {
            id: benefit.id,
          });

          if (!cancelled && data.deleteBenefit) {
            setBenefits((prev) =>
              prev.filter((item) => item.id !== benefit.id),
            );
            setArchiveDates((prev) => {
              const nextValue = { ...prev };
              delete nextValue[String(benefit.id)];
              saveArchiveDates(nextValue);
              return nextValue;
            });
          }
        } catch {
          // Keep the card visible if backend deletion fails.
        }
      }
    }

    removeExpiredBenefits();

    return () => {
      cancelled = true;
    };
  }, [archiveDates, benefits, loading]);

  const filteredBenefits = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return benefits.filter((benefit) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          benefit.name,
          benefit.description,
          benefit.category,
          benefit.vendorName,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedSearch));

      const matchesDate =
        !applyDateFilter ||
        matchesSelectedDate(benefit.contractExpiryDate, selectedDate);

      return matchesSearch && matchesDate;
    });
  }, [applyDateFilter, benefits, searchTerm, selectedDate]);

  const activeBenefits = filteredBenefits.filter(
    (benefit) => benefit.isActive !== false,
  );
  const archivedBenefits = filteredBenefits.filter(
    (benefit) => benefit.isActive === false,
  );

  async function updateBenefitStatus(benefit: Benefit, isActive: boolean) {
    const data = await gqlRequest(UpdateBenefitDocument, {
      id: benefit.id,
      input: {
        name: benefit.name,
        category: benefit.category ?? '',
        description: benefit.description ?? '',
        vendorName: benefit.vendorName ?? '',
        subsidyPercent: benefit.subsidyPercent ?? 0,
        isActive,
        requiresContract: benefit.requiresContract ?? false,
        contractExpiryDate: benefit.contractExpiryDate ?? '',
        r2ObjectKey: benefit.r2ObjectKey ?? '',
      },
    });

    setBenefits((prev) =>
      sortBenefitsNewestFirst(
        prev.map((item) => (item.id === benefit.id ? data.updateBenefit : item)),
      ),
    );
  }

  function handleCreated(benefit: Benefit) {
    setBenefits((prev) => sortBenefitsNewestFirst([...prev, benefit]));
  }

  function handleDeleted(id: number) {
    setBenefits((prev) => prev.filter((benefit) => benefit.id !== id));
    setArchiveDates((prev) => {
      const nextValue = { ...prev };
      delete nextValue[String(id)];
      saveArchiveDates(nextValue);
      return nextValue;
    });
  }

  async function handleArchive(benefit: Benefit) {
    try {
      await updateBenefitStatus(benefit, false);
      setArchiveDates((prev) => {
        const nextValue = {
          ...prev,
          [String(benefit.id)]: new Date().toISOString(),
        };
        saveArchiveDates(nextValue);
        return nextValue;
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to archive benefit'));
    }
  }

  async function handleRecover(benefit: Benefit) {
    try {
      await updateBenefitStatus(benefit, true);
      setArchiveDates((prev) => {
        const nextValue = { ...prev };
        delete nextValue[String(benefit.id)];
        saveArchiveDates(nextValue);
        return nextValue;
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Failed to recover benefit'));
    }
  }

  if (loading) return <BenefitsManagementSkeleton />;

  return (
    <div className="min-h-screen w-full  px-4 py-8">
      <div className="mx-auto max-w-[1215px]">
        <div className="mb-6">
          <h1 className="text-3xl leading-10 font-bold tracking-[0.396px] text-[#101828]">
            Benefits Management
          </h1>
          <p className="mt-1 text-base leading-7 text-[#717182]">
            Configure and manage company benefits
          </p>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_152px_152px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00000099]" />
            <Input
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search Benefits"
              className=" rounded-[8px] border-[#0000001A] bg-white pl-12 text-xs text-[#000000] leading-normal shadow-sm shadow-[#F1F5F9]"
            />
          </div>

          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'h-14 justify-start rounded-2xl border-[#E5E7EB] bg-white px-4 text-xs font-medium text-[#374151] shadow-sm',
                  !selectedDate && 'text-[#9CA3AF]',
                )}
              >
                <span className="flex -gap-1">
                  <CalendarIcon
                    className="mr-2 h-4 w-4 text-[#6B7280]"
                    strokeWidth={2.5}
                  />
                  {formatToolbarDate(selectedDate)}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-white p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date: Date | undefined) => {
                  if (!date) return;
                  setSelectedDate(date);
                  setCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            onClick={() => setApplyDateFilter((prev) => !prev)}
            className={cn(
              'h-14 rounded-2xl border-[#D8E9FF] bg-[#F9FCFF] px-4 text-xs font-normal leading-normal text-[#008CFF] shadow-sm',
              applyDateFilter && 'border-[#2481F7] bg-[#EAF3FF]',
            )}
          >
            <Filter className="h-4 w-4" />
            {applyDateFilter ? 'Filter On' : 'Apply Filter'}
          </Button>
        </div>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <div className="mb-3 flex items-center justify-between rounded-t-[18px] bg-[#0000001A] px-2.5 py-3">
              <h2 className="text-sm font-medium text-[#0A0A0A]">
                Active Benefits
              </h2>
              <Ellipsis className="h-5 w-5 text-[#9CA3AF]" />
            </div>

            <div className="space-y-3">
              <AddBenefitDialog
                onCreated={handleCreated}
                trigger={
                  <button
                    type="button"
                    className="flex py-3 px-4 w-full items-center justify-center rounded-lg border-2 border-dashed border-[#00000099] text-[#14213D] transition-colors hover:border-[#F4A261] hover:text-[#F4A261]"
                  >
                    <Plus className="h-4.5 w-4.5 text-[#0F172A]" />
                  </button>
                }
              />

              {activeBenefits.length === 0 && (
                <EmptyColumnMessage message="No active benefits found." />
              )}

              {activeBenefits.map((benefit) => (
                <BenefitCard
                  key={benefit.id}
                  benefit={benefit}
                  actionLabel="Archive"
                  onAction={() => handleArchive(benefit)}
                  onDeleted={handleDeleted}
                  footerText="Active now"
                  accent="active"
                />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between rounded-t-[18px] bg-[#0000001A] px-2.5 py-3">
              <h2 className="text-sm font-medium text-[#0A0A0A]">Archived</h2>
              <Ellipsis className="h-5 w-5 text-[#9CA3AF]" />
            </div>

            <div className="space-y-3">
              {archivedBenefits.length === 0 && (
                <EmptyColumnMessage message="No archived benefits right now." />
              )}

              {archivedBenefits.map((benefit) => (
                <BenefitCard
                  key={benefit.id}
                  benefit={benefit}
                  actionLabel="Recover"
                  onAction={() => handleRecover(benefit)}
                  onDeleted={handleDeleted}
                  footerText={`${getDaysLeftForDeletion(benefit.id, archiveDates)} Days`}
                  accent="archived"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

type BenefitCardProps = {
  benefit: Benefit;
  actionLabel: 'Archive' | 'Recover';
  onAction: () => void;
  onDeleted: (id: number) => void;
  footerText: string;
  accent: 'active' | 'archived';
};

function BenefitCard({
  benefit,
  actionLabel,
  onAction,
  onDeleted,
  footerText,
  accent,
}: BenefitCardProps) {
  return (
    <article className="rounded-lg border border-[#E5E7EB] bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md">
      <BenefitDetailsDialog
        benefit={benefit}
        trigger={
          <button
            type="button"
            className="mb-2.5 flex cursor-pointer flex-col items-start gap-[5px] rounded-md text-left outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#2481F7] focus-visible:ring-offset-2"
          >
            <h3 className="text-sm font-normal leading-normal text-[#0A0A0A]">
              {benefit.name}
            </h3>
            <p className="text-xs leading-normal text-[#6A7282]">
              {benefit.description ||
                'No description provided for this benefit yet.'}
            </p>
          </button>
        }
      />

      {benefit.category && (
        <div className="mb-2.5">
          <span
            className={cn(
              'inline-flex rounded-lg px-3 py-1 text-[9px] font-[400]',
              accent === 'active'
                ? 'bg-[#FEF3C7] text-[#F0B100]'
                : 'bg-[#FB2C3626] text-[#E7000B]',
            )}
          >
            {benefit.category}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-1.5">
        <div className="flex items-center gap-[5px] text-xs font-normal text-[#6A7282]">
          <Clock3 className="h-4 w-4" strokeWidth={2.5} />
          <span>{footerText}</span>
        </div>

        <div className="flex shrink-0 items-center gap-[5px]">
          <CardActionMenu actionLabel={actionLabel} onAction={onAction} />
          <DeleteBenefitDialog benefit={benefit} onDeleted={onDeleted} />
        </div>
      </div>
    </article>
  );
}

type CardActionMenuProps = {
  actionLabel: 'Archive' | 'Recover';
  onAction: () => void;
};

function CardActionMenu({ actionLabel, onAction }: CardActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#4B5563]"
        >
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36 bg-white">
        <DropdownMenuItem
          onClick={onAction}
          className="cursor-pointer text-sm font-medium text-[#111827]"
        >
          {actionLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EmptyColumnMessage({ message }: { message: string }) {
  return (
    <div className="rounded-[18px] border border-dashed border-[#D1D5DB] bg-white px-4 py-8 text-center text-sm text-[#9CA3AF]">
      {message}
    </div>
  );
}
