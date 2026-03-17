"use client";
import React from "react";
import { Button } from "../myRequests/_components/Button";
import type { RequestItem } from "../myRequests/_components/RequestList";
import { RequestsList } from "../myRequests/_components/RequestList";

export function Page() {
  const handleNewRequest = () => {
    alert("New Request Clicked");
  };

  const data: RequestItem[] = [
    {
      title: "Time Off Request",
      date: "March 10, 2026",
      details: "5 days",
      status: "Pending",
    },
    {
      title: "Equipment Request",
      date: "March 8, 2026",
      details: "MacBook Pro",
      status: "Approved",
    },
    {
      title: "Training Request",
      date: "March 5, 2026",
      details: "React Advanced",
      status: "Approved",
    },
    {
      title: "Remote Work Request",
      date: "March 1, 2026",
      details: "2 weeks",
      status: "Rejected",
    },
  ];

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Requests</h1>
          <p className="text-gray-500">View and manage your submitted requests</p>
        </div>
        <Button onClick={handleNewRequest}>New Request</Button>
      </div>

      <RequestsList data={data} />
    </div>
  );
}

export default Page;