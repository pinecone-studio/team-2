// 'use client';

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Sidebar from './Sidebar/page';
// import Dashboard from './Dashboard/page';
// import MyBenefits from './MyBenefits/page';
// import Requests from './Requests/page';
// import Contracts from './Contracts/page';
// import Settings from './Settings/page';

// export default function Page() {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return null;
//   }

//   return (
//     <BrowserRouter>
//       <div className="flex h-screen bg-gray-50">
//         <Sidebar />

//         <main className="flex-1 overflow-y-auto p-8 text-gray-900">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/my-benefits" element={<MyBenefits />} />
//             <Route path="/requests" element={<Requests />} />
//             <Route path="/contracts" element={<Contracts />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

import React from 'react';
// import Sidebar from './Sidebar/page';
import Dashboard from './dashboard/page';

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}
      <main className="flex-1 overflow-y-auto p-8 text-gray-900">
        <Dashboard />
      </main>
    </div>
  );
}
