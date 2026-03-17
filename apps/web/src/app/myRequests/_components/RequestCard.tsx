import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type Status = "Approved" | "Pending" | "Rejected";

type Props = {
  title: string;
  date: string;
  details: string;
  status: Status;
};

const getIcon = (status: Status) => {
  if (status === "Approved") return <CheckCircle className="text-green-500" />;
  if (status === "Rejected") return <XCircle className="text-red-500" />;
  return <Clock className="text-orange-500" />;
};

export const RequestCard: React.FC<Props> = ({ title, date, details, status }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-5 mb-4">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 p-3 rounded-xl">{getIcon(status)}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-gray-400 text-sm">Details</p>
          <p className="font-medium">{details}</p>
        </div>
        <StatusBadge status={status} />
      </div>
    </div>
  );
};