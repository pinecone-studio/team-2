import React from "react";
import { RequestCard } from "./RequestCard";

type Status = "Approved" | "Pending" | "Rejected";

export type RequestItem = {
  title: string;
  date: string;
  details: string;
  status: Status;
};

export const RequestsList: React.FC<{ data: RequestItem[] }> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <RequestCard key={index} {...item} />
      ))}
    </div>
  );
};