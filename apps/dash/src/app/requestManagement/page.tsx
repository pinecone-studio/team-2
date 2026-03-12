import React from 'react';
import { ActiveRequests, ProcessedRequests } from './_components';

const requestManagementPage = () => {
  return (
    <div className="flex flex-col justify-start items-start ">
      <div className="flex flex-col p-5">
        <div className="self-stretch justify-start text-gray-900 text-3xl font-bold  leading-10 tracking-tight">
          Request Management
        </div>
        <div className="self-stretch justify-start text-gray-500 text-base font-normal  leading-8 tracking-tight">
          Review and process employee benefit requests
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        <ActiveRequests />
        <ProcessedRequests />
      </div>
    </div>
  );
};

export default requestManagementPage;
