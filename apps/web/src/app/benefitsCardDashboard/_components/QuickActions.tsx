'use client';

import React from 'react';
import {
  FileText,
  HelpCircle,
  CheckCircle2,
  Clock,
  CheckSquare,
  AlertCircle,
} from 'lucide-react';

const QuickActions = () => {
  const timelineEvents = [
    {
      id: 1,
      title: 'Remote Work Approved',
      description: 'Your remote work request has been approved for 3 days.',
      time: '2 hours ago',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      bgColor: 'bg-emerald-50',
    },
    {
      id: 2,
      title: 'Travel Subsidy Pending',
      description: 'Awaiting manager pre-approval for conference travel.',
      time: '1 day ago',
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      bgColor: 'bg-amber-50',
    },
    {
      id: 3,
      title: 'PineFit Contract Signed',
      description: 'You accepted the gym membership contract.',
      time: '3 days ago',
      icon: <CheckSquare className="w-5 h-5 text-indigo-500" />,
      bgColor: 'bg-indigo-50',
    },
    {
      id: 4,
      title: 'OKR Deadline Approaching',
      description: 'Q1 2025 OKR submission due in 5 days.',
      time: '5 days ago',
      icon: <AlertCircle className="w-5 h-5 text-pink-500" />,
      bgColor: 'bg-pink-50',
    },
  ];

  return (
    <div className="w-full max-w-[400px] flex flex-col gap-6">
      {/* Header - Montserrat 18px */}
      <h2 className="text-[#000] font-montserrat text-[18px] font-semibold leading-normal ml-1">
        Quick Actions
      </h2>

      {/* Action Buttons Grid - Томруулсан хувилбар */}
      <div className="grid grid-cols-2 gap-5">
        <button className="flex flex-col items-start p-7 bg-white/70 backdrop-blur-md border border-[rgba(217,217,217,0)] rounded-[16px] shadow-[0_4px_6px_0_rgba(0,0,0,0.09)] hover:shadow-md transition-all text-left group min-h-[170px]">
          <div className="p-3 bg-orange-50 rounded-xl mb-4 group-hover:bg-orange-100 transition-colors">
            <FileText className="w-6 h-6 text-orange-500" />
          </div>
          <span className="text-[#000] font-montserrat text-[15px] font-semibold leading-normal">
            View Contracts
          </span>
          <p className="text-[#717182] font-montserrat text-[12px] font-semibold leading-normal mt-2">
            Review your accepted contracts
          </p>
        </button>

        <button className="flex flex-col items-start p-7 bg-white/70 backdrop-blur-md border border-[rgba(217,217,217,0)] rounded-[16px] shadow-[0_4px_6px_0_rgba(0,0,0,0.09)] hover:shadow-md transition-all text-left group min-h-[170px]">
          <div className="p-3 bg-pink-50 rounded-xl mb-4 group-hover:bg-pink-100 transition-colors">
            <HelpCircle className="w-6 h-6 text-pink-400" />
          </div>
          <span className="text-[#000] font-montserrat text-[15px] font-semibold leading-normal">
            Get Help
          </span>
          <p className="text-[#717182] font-montserrat text-[12px] font-semibold leading-normal mt-2">
            Contact HR support
          </p>
        </button>
      </div>

      {/* Timeline Card - Илүү уудам padding-тай */}
      <div className="bg-white/70 backdrop-blur-md border border-[rgba(217,217,217,0)] rounded-[16px] p-8 shadow-[0_4px_6px_0_rgba(0,0,0,0.09)]">
        <div className="relative flex flex-col gap-9">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-gray-100/80" />

          {timelineEvents.map((event) => (
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
          ))}
        </div>
      </div>

      {/* Support Promo Section */}
      <div className="p-8 bg-gradient-to-br from-white/90 to-emerald-50/50 backdrop-blur-md border border-[rgba(217,217,217,0)] rounded-[16px] shadow-[0_4px_6px_0_rgba(0,0,0,0.09)] relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-[#000] font-montserrat text-[15px] font-semibold leading-normal">
            Help & Support
          </h4>
          <p className="text-[#717182] font-montserrat text-[12px] font-semibold mt-2 mb-6 leading-relaxed">
            Contact HR directly for enrollment questions.
          </p>
          <button className="w-full py-3.5 bg-white/95 border border-gray-100 rounded-xl text-[13px] font-bold text-gray-700 hover:bg-white transition-all shadow-sm active:scale-[0.98]">
            Contact HR
          </button>
        </div>
        {/* Decorative Blur Effect */}
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-200/30 blur-3xl rounded-full" />
      </div>
    </div>
  );
};

export default QuickActions;
