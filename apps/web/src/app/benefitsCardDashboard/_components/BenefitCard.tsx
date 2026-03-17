'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
  Button,
  Badge,
} from '@team/source-ui';
import {
  Dumbbell,
  CheckCircle2,
  Lock,
  Clock,
  Home,
  LucideIcon,
  Ban,
} from 'lucide-react';
import { EmployeeBenefitDetailsDialog } from './EmployeeBenefitDetailsDialog';

import type { BenefitStatus } from '../page';
import {
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitsQuery,
  GetEmployeesQuery,
} from 'apps/web/src/graphql/generated/graphql';

type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];

// 1. Статус бүрт тохирох иконууд
const statusIcons: Record<BenefitStatus, LucideIcon> = {
  Active: CheckCircle2,
  Eligible: Home,
  Pending: Clock,
  Locked: Lock,
  Rejected: Ban,
};

// 2. Иконы арын хайрцаг болон өнгө
const statusIconStyles: Record<BenefitStatus, { bg: string; text: string }> = {
  Active: { bg: 'bg-[#D1FAE5]', text: 'text-[#047857]' },
  Eligible: { bg: 'bg-[#EBF2FF]', text: 'text-[#3B82F6]' },
  Pending: { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
  Locked: { bg: 'bg-gray-100', text: 'text-gray-400' },
  Rejected: { bg: 'bg-red-100', text: 'text-red-400' },
};

// 3. Бадге (Status Badge) стиль
const badgeStyles: Record<BenefitStatus, string> = {
  Active:
    '!bg-green-100 !text-green-700 !rounded-full border-none px-4 font-semibold',
  Eligible:
    '!bg-blue-100 !text-blue-700 !rounded-full border-none px-4 font-semibold',
  Pending:
    '!bg-[#FFEDD5] !text-[#9A3412] !rounded-full border-none px-4 font-semibold',
  Locked:
    '!bg-gray-100 !text-gray-500 !rounded-full border-none px-4 font-semibold',
  Rejected:
    '!bg-red-100 !text-red-500 !rounded-full border-none px-4 font-semibold',
};

// 4. Товчны Gradient стиль - Rejected хэсгийг шинэчлэв
const statusButtonStyles: Record<BenefitStatus, string> = {
  Active:
    '![background:linear-gradient(180deg,#3ABD6A_0%,#87DBA6_100%)] !rounded-[12px] shadow-sm',
  Eligible:
    '![background:linear-gradient(180deg,#137FEC_0%,#60A5FA_100%)] !rounded-[12px] shadow-sm',
  Pending:
    '![background:linear-gradient(180deg,#F59E0B_0%,#FCD34D_100%)] !rounded-[12px] shadow-sm',
  Locked: '!bg-gray-400 !rounded-[12px] cursor-not-allowed',
  // Rejected товчийг Улаан Gradient-тай болгов
  Rejected:
    '![background:linear-gradient(180deg,#EF4444_0%,#FCA5A5_100%)] !rounded-[12px] shadow-sm',
};

// 5. Картны стиль - Rejected хэсгийг бусадтай ижил уусалттай болгов
const statusCardStyles: Record<BenefitStatus, string> = {
  Active: 'bg-gradient-to-b from-[#ECFDF5] via-white to-white',
  Eligible: 'bg-gradient-to-b from-[#EFF6FF] via-white to-white',
  Pending: 'bg-gradient-to-b from-[#FFF7ED] via-white to-white',
  Locked: 'bg-gradient-to-b from-[#F8FAFC] via-white to-white',
  Rejected: 'bg-gradient-to-b from-[#FEF2F2] via-white to-white',
};

export function BenefitCard({
  benefit,
  employee,
  request,
  status,
  onApplied,
}: {
  benefit: Benefit;
  employee: Employee;
  request: BenefitRequest | null;
  status: BenefitStatus;
  onApplied: (request: BenefitRequest) => void;
}) {
  const StatusIcon = statusIcons[status] || Dumbbell;
  const iconStyle = statusIconStyles[status] || statusIconStyles.Eligible;
  const buttonStyle = statusButtonStyles[status] || statusButtonStyles.Eligible;
  const cardGradient = statusCardStyles[status] || 'bg-white';

  return (
    <Card
      className={`w-full max-w-[320px] rounded-[12px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between overflow-hidden transition-all duration-300 ${cardGradient}`}
    >
      <CardHeader className="pt-8 px-6 pb-4">
        <div className="flex flex-row justify-between items-start">
          <div
            className={`w-14 h-14 rounded-2xl ${iconStyle.bg} flex items-center justify-center transition-colors`}
          >
            <StatusIcon
              className={iconStyle.text}
              size={28}
              strokeWidth={1.5}
            />
          </div>
          <div className="flex items-start shadow-none">
            <Badge className={badgeStyles[status]}>{status}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 space-y-4 flex flex-col justify-between flex-1">
        <div className="space-y-2">
          <h3
            className="text-[#000] font-semibold text-[20px] leading-normal font-lato truncate"
            title={benefit.name}
          >
            {benefit.name}
          </h3>
          <div className="h-10">
            <p className="text-[#717182] text-[12px] leading-[20px] font-normal font-family: 'Inter', sans-serif line-clamp-2">
              {benefit.description}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#64748B] font-inter text-[12px] font-normal leading-[16px]">
              Subsidy
            </span>
            <span className="text-[#000] font-inter text-[12px] font-bold leading-[16px]">
              {benefit.subsidyPercent ?? 0}%
            </span>
          </div>
          <Separator className="my-3 bg-[#F1F5F9]" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#64748B] font-inter text-[12px] font-normal leading-[16px]">
              Vendor
            </span>
            <span className="text-[#000] font-inter text-[12px] font-bold leading-[16px]">
              {benefit.vendorName ?? '—'}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-8 pt-4">
        <EmployeeBenefitDetailsDialog
          benefit={benefit}
          employee={employee}
          existingRequest={request}
          onApplied={onApplied}
        >
          <Button
            className={`w-full !h-12 text-white font-bold transition-all active:scale-[0.98] ${buttonStyle}`}
          >
            View Details
          </Button>
        </EmployeeBenefitDetailsDialog>
      </CardFooter>
    </Card>
  );
}
