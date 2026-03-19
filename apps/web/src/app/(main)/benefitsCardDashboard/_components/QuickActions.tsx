'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  Clock,
  CircleSlash,
  ListTodo,
  XCircle,
  Mail,
  MessageCircleMore,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@team/source-ui';
import {
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitsQuery,
  RequestStatus,
} from 'apps/web/src/graphql/generated/graphql';

type Benefit = GetBenefitsQuery['benefits'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];

type QuickActionsProps = {
  benefits: Benefit[];
  requests: BenefitRequest[];
  counts: Record<string, number>;
};

type TimelineEvent = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  bgColor: string;
};

const hrContact = {
  email: 'hr@company.com',
  subject: 'Benefits Enrollment Support',
  body: `Hello HR team,

I need help with my employee benefits enrollment.

My question:

Thank you.`,
};

function formatRelativeTime(dateStr?: string | null) {
  if (!dateStr) return 'Recently';

  const timestamp = new Date(dateStr).getTime();
  if (Number.isNaN(timestamp)) return 'Recently';

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }

  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getTimelineMeta(status?: RequestStatus | null) {
  switch (status) {
    case RequestStatus.Approved:
      return {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        bgColor: 'bg-emerald-50',
        statusLabel: 'Approved',
        description: 'Your request is now active in the system.',
      };
    case RequestStatus.Pending:
      return {
        icon: <Clock className="w-5 h-5 text-amber-500" />,
        bgColor: 'bg-amber-50',
        statusLabel: 'Pending',
        description: 'Submitted and waiting for review.',
      };
    case RequestStatus.Rejected:
      return {
        icon: <XCircle className="w-5 h-5 text-rose-500" />,
        bgColor: 'bg-rose-50',
        statusLabel: 'Rejected',
        description: 'Reviewed and not approved this time.',
      };
    case RequestStatus.Cancelled:
      return {
        icon: <CircleSlash className="w-5 h-5 text-slate-500" />,
        bgColor: 'bg-slate-100',
        statusLabel: 'Cancelled',
        description: 'This request is no longer active.',
      };
    default:
      return {
        icon: <Clock className="w-5 h-5 text-slate-400" />,
        bgColor: 'bg-slate-100',
        statusLabel: 'Updated',
        description: 'There is a recent update on your request.',
      };
  }
}

function buildHrMailtoLink() {
  const params = new URLSearchParams({
    subject: hrContact.subject,
    body: hrContact.body,
  });

  return `mailto:${hrContact.email}?${params.toString()}`;
}

function ContactHRDialog() {
  const mailtoHref = buildHrMailtoLink();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full rounded-xl border border-gray-100 bg-white/95 py-3.5 text-[13px] font-bold text-gray-700 shadow-sm transition-all hover:bg-white active:scale-[0.98]">
          Contact HR
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-bold text-[#17233C]">
            Contact HR
          </DialogTitle>
          <DialogDescription className="text-sm text-[#6F7C91]">
            Reach out directly for enrollment questions, benefit eligibility, or
            contract support.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-[18px] border border-[#E7ECF3] bg-[#F8FAFC] p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-emerald-100 p-2">
                <Mail className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7A8195]">
                  HR Email
                </p>
                <p className="mt-1 text-sm font-semibold text-[#17233C]">
                  {hrContact.email}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#E7ECF3] bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <MessageCircleMore className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7A8195]">
                  Suggested subject
                </p>
                <p className="mt-1 text-sm font-semibold text-[#17233C]">
                  {hrContact.subject}
                </p>
              </div>
            </div>
          </div>

          <a
            href={mailtoHref}
            className="flex w-full items-center justify-center rounded-xl bg-[#137FEC] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0F6FD0]"
          >
            Open Email App
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const QuickActions = ({ benefits, requests, counts }: QuickActionsProps) => {
  const requestsWithBenefits = requests
    .map((request) => ({
      request,
      benefit: benefits.find((benefit) => benefit.id === request.benefitId),
    }))
    .filter((entry): entry is { request: BenefitRequest; benefit: Benefit } =>
      Boolean(entry.benefit),
    );

  const timelineEvents: TimelineEvent[] = requestsWithBenefits
    .sort((a, b) => {
      const aTime = new Date(a.request.createdAt ?? 0).getTime();
      const bTime = new Date(b.request.createdAt ?? 0).getTime();
      return bTime - aTime;
    })
    .slice(0, 4)
    .map(({ request, benefit }) => {
      const meta = getTimelineMeta(request.status);

      return {
        id: request.id,
        title: `${benefit.name} request`,
        description: `Current status: ${meta.statusLabel}. ${meta.description} Submitted for ${benefit.vendorName ?? benefit.category ?? 'this benefit'}.`,
        time: formatRelativeTime(request.createdAt),
        icon: meta.icon,
        bgColor: meta.bgColor,
      };
    });

  const contractCount = requestsWithBenefits.filter(
    ({ benefit }) => benefit.requiresContract || Boolean(benefit.r2ObjectKey),
  ).length;
  const pendingCount = requests.filter(
    (request) => request.status === RequestStatus.Pending,
  ).length;
  const activeCount = counts.Active || 0;

  return (
    <div className="w-full max-w-[400px]">
      <div className="ml-1 flex min-h-7 mt-3 items-center">
        <h2 className="text-[#000] font-montserrat text-[18px] font-semibold leading-normal">
          Quick Actions
        </h2>
      </div>

      <div className="mt-3 flex flex-col gap-6">
        {/* Action Buttons Grid - Томруулсан хувилбар */}
        <div className="grid grid-cols-2 gap-5">
          <Link
            href="/contracts"
            className="flex min-h-[170px] flex-col items-start rounded-[16px] border border-[rgba(217,217,217,0)] bg-white/70 p-5 text-left shadow-[0_4px_6px_0_rgba(0,0,0,0.09)] transition-all hover:shadow-md group backdrop-blur-md"
          >
            <div className="p-3 bg-orange-50 rounded-xl mb-1 group-hover:bg-orange-100 transition-colors">
              <FileText className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-[#000] font-montserrat text-[15px] font-semibold leading-normal">
              View Contracts
            </span>
            <p className="mt-1 font-montserrat text-[14px] font-medium leading-normal tracking-[0.01em] text-[#717182]">
              {contractCount > 0
                ? `${contractCount} request${contractCount === 1 ? '' : 's'} have contract details ready to review`
                : 'No contract-backed requests yet'}
            </p>
          </Link>

          <Link
            href="/myRequests"
            className="flex min-h-[170px] flex-col items-start rounded-[16px] border border-[rgba(217,217,217,0)] bg-white/70 p-5 text-left shadow-[0_4px_6px_0_rgba(0,0,0,0.09)] transition-all hover:shadow-md group backdrop-blur-md"
          >
            <div className="p-3 bg-pink-50 rounded-xl mb-1 group-hover:bg-pink-100 transition-colors">
              <ListTodo className="w-6 h-6 text-pink-400" />
            </div>
            <span className="text-[#000] font-montserrat text-[15px] font-semibold leading-normal">
              My Requests
            </span>
            <p className="mt-1 font-montserrat text-[14px] font-medium leading-normal tracking-[0.01em] text-[#717182]">
              {pendingCount > 0
                ? `${pendingCount} pending request${pendingCount === 1 ? '' : 's'} and ${activeCount} active benefit${activeCount === 1 ? '' : 's'}`
                : `${requests.length} total request${requests.length === 1 ? '' : 's'} tracked so far`}
            </p>
          </Link>
        </div>

        {/* Timeline Card - Илүү уудам padding-тай */}
        <div className="bg-white/70 backdrop-blur-md border border-[rgba(217,217,217,0)] rounded-[16px] p-8 shadow-[0_4px_6px_0_rgba(0,0,0,0.09)]">
          <div className="relative flex flex-col gap-9">
            {/* Vertical Line */}
            {timelineEvents.length > 0 && (
              <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-gray-100/80" />
            )}

            {timelineEvents.length === 0 ? (
              <div className="pl-12 text-sm text-[rgba(0,0,0,0.60)]">
                No requests yet. Once you apply for a benefit, updates will show
                up here.
              </div>
            ) : (
              timelineEvents.map((event) => (
                <div key={event.id} className="relative flex items-start pl-12">
                  {/* Icon Circle */}
                  <div
                    className={`absolute left-0 p-2.5 rounded-full z-10 ${event.bgColor} shadow-sm`}
                  >
                    {event.icon}
                  </div>

                  <div className="flex flex-col pt-0.5">
                    <h4 className="text-[#000] font-montserrat text-[14px] font-semibold leading-normal">
                      {event.title}
                    </h4>
                    <p className="text-[rgba(0,0,0,0.60)] font-montserrat text-[12px] font-medium leading-normal">
                      {event.description}
                    </p>
                    <span className="text-[rgba(0,0,0,0.60)] font-montserrat text-[12px] font-normal leading-normal">
                      {event.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Support Promo Section */}
        <div className="relative overflow-hidden rounded-[16px] border border-[rgba(217,217,217,0)] bg-gradient-to-br from-white/90 to-emerald-50/50 p-8 shadow-[0_4px_6px_0_rgba(0,0,0,0.09)] backdrop-blur-md">
          <div className="relative z-10">
            <h4 className="text-[#000] font-montserrat text-[15px] font-semibold leading-normal">
              Help & Support
            </h4>
            <p className="text-[#717182] font-montserrat text-[12px] font-semibold mt-2 mb-6 leading-relaxed">
              Contact HR directly for enrollment questions.
            </p>
            <ContactHRDialog />
          </div>
          {/* Decorative Blur Effect */}
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-200/30 blur-3xl rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
