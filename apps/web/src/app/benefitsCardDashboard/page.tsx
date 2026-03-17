// 'use client';

// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { BenefitCard, BenefitFilter } from './_components';
// import {
//   GetBenefitRequestsByEmployeeDocument,
//   GetBenefitRequestsByEmployeeQuery,
//   GetBenefitsDocument,
//   GetBenefitsQuery,
//   GetEligibilityRulesDocument,
//   GetEligibilityRulesQuery,
//   GetEmployeesDocument,
//   GetEmployeesQuery,
//   RequestStatus,
// } from 'apps/web/src/graphql/generated/graphql';
// import { checkEligibility } from 'apps/web/src/lib/check-eligibility';
// import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';
// import { BenefitsCardSkeleton } from './_components/skeletonComp/BenefitCardsSkeleton';

// type Employee = GetEmployeesQuery['employees'][number];
// type Benefit = GetBenefitsQuery['benefits'][number];
// type BenefitRequest =
//   GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];
// type EligibilityRule = GetEligibilityRulesQuery['eligibilityRules'][number];

// // 'All' нь зөвхөн Filter-ийн утга, Card-ны статус биш
// export type BenefitStatus = 'Active' | 'Pending' | 'Eligible' | 'Locked';

// export function deriveBenefitStatus(
//   benefit: Benefit,
//   request: BenefitRequest | undefined,
//   rules: EligibilityRule[],
//   employee: Employee,
// ): BenefitStatus {
//   // 1. Хэрэв хүсэлт илгээсэн байгаа бол хүсэлтийн төлөв давамгайлна
//   if (request) {
//     switch (request.status) {
//       case RequestStatus.Pending:
//         return 'Pending';
//       case RequestStatus.Approved:
//         return 'Active';
//       case RequestStatus.Rejected:
//       case RequestStatus.Cancelled:
//         return 'Locked';
//       default:
//         break;
//     }
//   }

//   // 2. Идэвхгүй benefit бол шууд Locked
//   if (!benefit.isActive) return 'Locked';

//   // 3. Эрхийн дүрмийг шалгах
//   const benefitRules = rules.filter((r) => r.benefitId === benefit.id);
//   const { eligible } = checkEligibility(employee, benefitRules);

//   return eligible ? 'Eligible' : 'Locked';
// }

// export default function BenefitsCardDashboard() {
//   const { user } = useUser();
//   const [filter, setFilter] = useState<string>('All'); // Filter string хэвээр үлдэнэ
//   const [data, setData] = useState<{
//     benefits: Benefit[];
//     employee: Employee | null;
//     requests: BenefitRequest[];
//     rules: EligibilityRule[];
//   }>({
//     benefits: [],
//     employee: null,
//     requests: [],
//     rules: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     async function fetchData() {
//       if (!user?.id) return;
//       setLoading(true);
//       setError('');
//       try {
//         const [benefitsData, employeesData, rulesData] = await Promise.all([
//           gqlRequest(GetBenefitsDocument),
//           gqlRequest(GetEmployeesDocument),
//           gqlRequest(GetEligibilityRulesDocument),
//         ]);

//         const matchedEmployee = employeesData.employees.find(
//           (e) => e.clerkUserId === user.id,
//         );

//         let employeeRequests: BenefitRequest[] = [];
//         if (matchedEmployee) {
//           const reqs = await gqlRequest(GetBenefitRequestsByEmployeeDocument, {
//             employeeId: matchedEmployee.id,
//           });
//           employeeRequests = reqs.benefitRequestsByEmployee;
//         }

//         setData({
//           benefits: benefitsData.benefits,
//           employee: matchedEmployee ?? null,
//           requests: employeeRequests,
//           rules: rulesData.eligibilityRules,
//         });
//       } catch (e: any) {
//         setError(e.message ?? 'Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [user?.id]);

//   function handleApplied(newRequest: BenefitRequest) {
//     setData((prev) => ({
//       ...prev,
//       requests: prev.requests.some((r) => r.benefitId === newRequest.benefitId)
//         ? prev.requests.map((r) =>
//             r.benefitId === newRequest.benefitId ? newRequest : r,
//           )
//         : [...prev.requests, newRequest],
//     }));
//   }

//   // Loading болон Error state
//   if (loading) return <BenefitsCardSkeleton />;
//   if (error) return <p className="p-6 text-red-500 font-medium">{error}</p>;
//   if (!data.employee)
//     return <p className="p-6 text-gray-500">Employee record not found.</p>;

//   // Статус тооцоолох
//   const benefitsWithStatus = data.benefits.map((benefit) => {
//     const request = data.requests.find((r) => r.benefitId === benefit.id);
//     const status = deriveBenefitStatus(
//       benefit,
//       request,
//       data.rules,
//       data.employee!,
//     );
//     return { benefit, request, status };
//   });

//   // Шүүлтүүр хэрэглэх
//   const filtered =
//     filter === 'All'
//       ? benefitsWithStatus
//       : benefitsWithStatus.filter((b) => b.status === filter);

//   return (
//     <div className="w-full mx-auto">
//       <BenefitFilter onChange={setFilter} />

//       <div className="mt-10">
//         {filtered.length === 0 ? (
//           <div className="bg-gray-50 rounded-2xl p-12 text-center border border-dashed border-gray-200">
//             <p className="text-lg font-semibold text-[#0F172A]">
//               No {filter === 'All' ? '' : filter} Benefits Found
//             </p>
//             <p className="text-sm text-[#64748B] mt-2">
//               {filter === 'Pending' &&
//                 "You don't have any requests waiting for approval."}
//               {filter === 'Active' && "You haven't activated any benefits yet."}
//               {filter === 'Eligible' &&
//                 'There are no new benefits you can apply for right now.'}
//               {filter === 'Locked' &&
//                 'All benefits are currently available or pending.'}
//               {filter === 'All' && 'The benefit list is currently empty.'}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
//             {filtered.map(({ benefit, request, status }) => (
//               <BenefitCard
//                 key={benefit.id}
//                 benefit={benefit}
//                 employee={data.employee!}
//                 request={request ?? null}
//                 status={status}
//                 onApplied={handleApplied}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { BenefitCard, BenefitFilter } from './_components';
import {
  GetBenefitRequestsByEmployeeDocument,
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitsDocument,
  GetBenefitsQuery,
  GetEligibilityRulesDocument,
  GetEligibilityRulesQuery,
  GetEmployeesDocument,
  GetEmployeesQuery,
  RequestStatus,
} from 'apps/web/src/graphql/generated/graphql';
import { checkEligibility } from 'apps/web/src/lib/check-eligibility';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';
import { BenefitsCardSkeleton } from './_components/skeletonComp/BenefitCardsSkeleton';
import QuickActions from './_components/QuickActions';

// Types (Таны өмнөх кодноос хэвээр үлдсэн)
type Employee = GetEmployeesQuery['employees'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type BenefitRequest =
  GetBenefitRequestsByEmployeeQuery['benefitRequestsByEmployee'][number];
type EligibilityRule = GetEligibilityRulesQuery['eligibilityRules'][number];
export type BenefitStatus = 'Active' | 'Pending' | 'Eligible' | 'Locked';

export function deriveBenefitStatus(
  benefit: Benefit,
  request: BenefitRequest | undefined,
  rules: EligibilityRule[],
  employee: Employee,
): BenefitStatus {
  if (request) {
    switch (request.status) {
      case RequestStatus.Pending:
        return 'Pending';
      case RequestStatus.Approved:
        return 'Active';
      case RequestStatus.Rejected:
      case RequestStatus.Cancelled:
        return 'Locked';
      default:
        break;
    }
  }
  if (!benefit.isActive) return 'Locked';
  const benefitRules = rules.filter((r) => r.benefitId === benefit.id);
  const { eligible } = checkEligibility(employee, benefitRules);
  return eligible ? 'Eligible' : 'Locked';
}

export default function BenefitsCardDashboard() {
  const { user } = useUser();
  const [filter, setFilter] = useState<string>('All');
  const [data, setData] = useState<{
    benefits: Benefit[];
    employee: Employee | null;
    requests: BenefitRequest[];
    rules: EligibilityRule[];
  }>({ benefits: [], employee: null, requests: [], rules: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;
      setLoading(true);
      setError('');
      try {
        const [benefitsData, employeesData, rulesData] = await Promise.all([
          gqlRequest(GetBenefitsDocument),
          gqlRequest(GetEmployeesDocument),
          gqlRequest(GetEligibilityRulesDocument),
        ]);
        const matchedEmployee = employeesData.employees.find(
          (e) => e.clerkUserId === user.id,
        );
        let employeeRequests: BenefitRequest[] = [];
        if (matchedEmployee) {
          const reqs = await gqlRequest(GetBenefitRequestsByEmployeeDocument, {
            employeeId: matchedEmployee.id,
          });
          employeeRequests = reqs.benefitRequestsByEmployee;
        }
        setData({
          benefits: benefitsData.benefits,
          employee: matchedEmployee ?? null,
          requests: employeeRequests,
          rules: rulesData.eligibilityRules,
        });
      } catch (e: any) {
        setError(e.message ?? 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user?.id]);

  const handleApplied = (newRequest: BenefitRequest) => {
    setData((prev) => ({
      ...prev,
      requests: prev.requests.some((r) => r.benefitId === newRequest.benefitId)
        ? prev.requests.map((r) =>
            r.benefitId === newRequest.benefitId ? newRequest : r,
          )
        : [...prev.requests, newRequest],
    }));
  };

  if (loading) return <BenefitsCardSkeleton />;
  if (error) return <p className="p-6 text-red-500 font-medium">{error}</p>;
  if (!data.employee)
    return <p className="p-6 text-gray-500">Employee record not found.</p>;

  const benefitsWithStatus = data.benefits.map((benefit) => {
    const request = data.requests.find((r) => r.benefitId === benefit.id);
    const status = deriveBenefitStatus(
      benefit,
      request,
      data.rules,
      data.employee!,
    );
    return { benefit, request, status };
  });

  const filtered =
    filter === 'All'
      ? benefitsWithStatus
      : benefitsWithStatus.filter((b) => b.status === filter);

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start py-4">
      {/* LEFT SIDE: Benefits List */}
      <div className="flex-1 w-full order-2 lg:order-1">
        <BenefitFilter onChange={setFilter} />

        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-20 text-center border border-dashed border-gray-200">
              <p className="text-[18px] font-bold text-[#0F172A]">
                No {filter === 'All' ? '' : filter} Benefits Found
              </p>
              <p className="text-sm text-[#64748B] mt-2 italic">
                Nothing to show here right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
              {filtered.map(({ benefit, request, status }) => (
                <BenefitCard
                  key={benefit.id}
                  benefit={benefit}
                  employee={data.employee!}
                  request={request ?? null}
                  status={status}
                  onApplied={handleApplied}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Quick Actions */}
      <aside className="w-full lg:w-[360px] lg:sticky lg:top-8 order-1 lg:order-2">
        <QuickActions />
      </aside>
    </div>
  );
}
