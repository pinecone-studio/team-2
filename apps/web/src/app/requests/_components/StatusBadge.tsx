import type { RequestStatus } from "./types";

interface StatusBadgeProps {
  status: RequestStatus;
}

const statusStyles: Record<RequestStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const statusText: Record<RequestStatus, string> = {
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 text-sm rounded-md font-medium ${statusStyles[status]}`}
    >
      {statusText[status]}
    </span>
  );
}