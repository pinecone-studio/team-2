import { Clock3 } from 'lucide-react';
import React from 'react';

type RequestStatus = 'Pending Review' | 'Approved' | 'Rejected';

type BenefitRequest = {
  id: string | number;
  title: string;
  userName?: string;
  date: string;
  status: RequestStatus;
};

const getStatusStyles = (status: RequestStatus) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-50 text-green-500 ';
    case 'Rejected':
      return 'bg-rose-100 text-rose-700';
    case 'Pending Review':
    default:
      return 'bg-orange-50 text-slate-900 ';
  }
};

const MyRequests = () => {
  const allRequests: BenefitRequest[] = [
    {
      id: 1,
      title: 'Gym Membership',
      userName: 'Emily Watson',
      date: '1/15/2024',
      status: 'Pending Review',
    },
    {
      id: 2,
      title: 'Health insurance',
      userName: 'Jason Lee',
      date: '3/15/2026',
      status: 'Approved',
    },
    {
      id: 3,
      title: 'Commuter Benefits',
      userName: 'Jason Lee',
      date: '3/15/2026',
      status: 'Rejected',
    },
  ];

  const latestRequest: BenefitRequest = {
    id: 0,
    title: 'Commuter Benefits',
    date: 'January 18, 2024',
    status: 'Pending Review',
  };

  return (
    <div className="bg-neutral-50 flex flex-col gap-7 p-6">
      <div className="w-full inline-flex flex-col justify-start items-start gap-1">
        <h1 className="self-stretch text-gray-900 text-3xl font-bold">
          My Requests
        </h1>
        <p className="self-stretch text-gray-500 text-base">
          Track the status of your benefit requests.
        </p>
      </div>

      <div className="w-full h-28 p-4 bg-white rounded-[5px] border border-gray-200 inline-flex justify-between items-center overflow-hidden">
        <div className="flex justify-start items-center gap-3.5">
          <div className="w-6 h-6 text-gray-400">
            <Clock3 size={24} />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-black text-base font-medium leading-4">
              {latestRequest.title}
            </div>
            <div className="text-black/50 text-sm font-medium leading-4">
              Requested on {latestRequest.date}
            </div>
          </div>
        </div>
        <StatusBadge status={latestRequest.status} />
      </div>

      <div className="w-full p-4 bg-white rounded-lg inline-flex flex-col gap-4">
        <div className="px-4">
          <h2 className="text-gray-900 text-xl font-bold leading-10">
            All Requests
          </h2>
          <p className="text-gray-500 text-sm font-normal leading-8">
            View all benefit requests across the organization.
          </p>
        </div>

        <div className="self-stretch flex flex-col gap-3">
          {allRequests.map((request) => (
            <div
              key={request.id}
              className="self-stretch p-4 rounded-lg border border-black/10 inline-flex justify-between items-center"
            >
              <div className="inline-flex flex-col">
                <div className="text-black text-base font-semibold leading-5">
                  {request.title}
                </div>
                <div className="text-gray-500 text-sm font-semibold leading-5">
                  {request.userName} - {request.date}
                </div>
              </div>
              <StatusBadge status={request.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: RequestStatus }) => (
  <div
    className={`px-2.5 py-1 rounded-lg flex justify-center items-center gap-1 ${getStatusStyles(status)}`}
  >
    <span className="text-xs font-semibold leading-5 tracking-tight whitespace-nowrap">
      {status}
    </span>
  </div>
);

export default MyRequests;
