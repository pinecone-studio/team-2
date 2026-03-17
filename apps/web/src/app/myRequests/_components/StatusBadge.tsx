import React from "react";

type Status = "Approved" | "Pending" | "Rejected";

export const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const styles = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};