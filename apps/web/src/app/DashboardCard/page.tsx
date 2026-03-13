"use client"

import React, { useState, useEffect } from 'react';
import { Card, Header } from '../DashboardCard/_components';

const DashboardCard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      <Header isLoading={loading} />
      <Card isLoading={loading} />
    </div>
  );
};

export default DashboardCard;