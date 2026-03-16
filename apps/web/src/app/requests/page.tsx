"use client"

import React, { useState, useEffect } from "react";
import { Section } from "../requests/_components/Section";
import { RequestItem } from "../requests/_components/RequestItem";
import type { Request } from "../requests/_components/types";

const RequestsPage = () => {
  
  const [myRequests, setMyRequests] = useState<Request[]>([]);
  const [allRequests, setAllRequests] = useState<Request[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMyRequests([
        {
          id: "1",
          title: "Commuter Benefits",
          user: "Requested",
          date: "January 18, 2024",
          status: "pending",
        },
      ]);

      setAllRequests([
        {
          id: "2",
          title: "Gym Membership",
          user: "Emily Watson",
          date: "1/15/2024",
          status: "pending",
        },
        {
          id: "3",
          title: "Gym Membership",
          user: "Emily Watson",
          date: "1/15/2024",
          status: "pending",
        },
        {
          id: "4",
          title: "Gym Membership",
          user: "Emily Watson",
          date: "1/15/2024",
          status: "approved",
        },
        {
          id: "5",
          title: "Gym Membership",
          user: "Emily Watson",
          date: "1/15/2024",
          status: "rejected",
        },
      ]);

      
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Section
        title="My Requests"
        description="Track the status of your benefit requests."
        
      >
        {myRequests.map((req) => (
          <RequestItem key={req.id} request={req}  />
        ))}
      </Section>

      <Section
        title="All Requests"
        description="View all benefit requests across the organization."
        
      >
        {allRequests.map((req) => (
          <RequestItem key={req.id} request={req} />
        ))}
      </Section>
    </div>
  );
};

export default RequestsPage;