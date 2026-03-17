import React from 'react';
import {
  FileText,
  HelpCircle,
  CheckCircle2,
  Clock,
  CheckSquare,
  AlertCircle,
} from 'lucide-react'; // Lucide icons ашиглав

const QuickActions = () => {
  const timelineEvents = [
    {
      id: 1,
      title: 'Remote Work Approved',
      description: 'Your remote work request has been approved for 3 days.',
      time: '2 hours ago',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      bgColor: 'bg-emerald-50',
    },
    {
      id: 2,
      title: 'Travel Subsidy Pending',
      description: 'Awaiting manager pre-approval for conference travel.',
      time: '1 day ago',
      icon: <Clock className="w-4 h-4 text-amber-500" />,
      bgColor: 'bg-amber-50',
    },
    {
      id: 3,
      title: 'PineFit Contract Signed',
      description: 'You accepted the gym membership contract.',
      time: '3 days ago',
      icon: <CheckSquare className="w-4 h-4 text-indigo-500" />,
      bgColor: 'bg-indigo-50',
    },
    {
      id: 4,
      title: 'OKR Deadline Approaching',
      description: 'Q1 2025 OKR submission due in 5 days.',
      time: '5 days ago',
      icon: <AlertCircle className="w-4 h-4 text-pink-500" />,
      bgColor: 'bg-pink-50',
    },
  ];

  return (
    <div className="w-full max-w-[340px] flex flex-col gap-5">
      <h2 className="text-[18px] font-bold text-gray-800 ml-1">
        Quick Actions
      </h2>

      {/* Дээд талын 2 жижиг карт */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-start p-5 bg-white/70 backdrop-blur-md border border-white rounded-[24px] shadow-sm hover:shadow-md transition-all text-left group">
          <div className="p-2 bg-orange-50 rounded-lg mb-3 group-hover:bg-orange-100 transition-colors">
            <FileText className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-[14px] font-bold text-gray-800">
            View Contracts
          </span>
          <p className="text-[11px] text-gray-500 mt-1 leading-tight">
            Review your accepted contracts
          </p>
        </button>

        <button className="flex flex-col items-start p-5 bg-white/70 backdrop-blur-md border border-white rounded-[24px] shadow-sm hover:shadow-md transition-all text-left group">
          <div className="p-2 bg-pink-50 rounded-lg mb-3 group-hover:bg-pink-100 transition-colors">
            <HelpCircle className="w-5 h-5 text-pink-400" />
          </div>
          <span className="text-[14px] font-bold text-gray-800">Get Help</span>
          <p className="text-[11px] text-gray-500 mt-1 leading-tight">
            Contact HR support
          </p>
        </button>
      </div>

      {/* Timeline Карт */}
      <div className="bg-white/70 backdrop-blur-md border border-white rounded-[28px] p-6 shadow-sm">
        <div className="relative flex flex-col gap-8">
          {/* Босоо зураас */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-gray-100" />

          {timelineEvents.map((event) => (
            <div key={event.id} className="relative flex items-start pl-10">
              {/* Icon Circle */}
              <div
                className={`absolute left-0 p-2 rounded-full z-10 ${event.bgColor} ring-4 ring-white/50`}
              >
                {event.icon}
              </div>

              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-gray-800 leading-none">
                  {event.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                  {event.description}
                </p>
                <span className="text-[10px] text-gray-400 mt-1.5">
                  {event.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Доод талын Help & Support сурталчилгааны хэсэг */}
      <div className="mt-2 p-6 bg-gradient-to-br from-white/80 to-emerald-50/50 backdrop-blur-md border border-white rounded-[28px] relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-[13px] font-bold text-gray-800">
            Help & Support
          </h4>
          <p className="text-[11px] text-gray-500 mt-1 mb-4">
            Contact HR directly for enrollment questions.
          </p>
          <button className="w-full py-2.5 bg-white/90 border border-gray-100 rounded-xl text-[12px] font-semibold text-gray-700 hover:bg-white transition-colors shadow-sm">
            Contact HR
          </button>
        </div>
        {/* Чимэглэлийн гэрэлтсэн бөмбөлөг */}
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-200/30 blur-2xl rounded-full" />
      </div>
    </div>
  );
};

export default QuickActions;
