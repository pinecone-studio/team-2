'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@team/source-ui';
import { AddBenefitDialog } from './_components/AddBenefitDialog';
import { EditBenefitDialog } from './_components/EditBenefitDialog';
import { DeleteBenefitDialog } from './_components/DeleteBenefitDialog';
import { BenefitDetailsDialog } from './_components/BenefitDetailsDialog';
import {
  GetBenefitsDocument,
  GetBenefitsQuery,
} from '../../graphql/generated/graphql';
import { gqlRequest } from '../../graphql/helpers/graphql-client';

type Benefit = GetBenefitsQuery['benefits'][number];

export default function BenefitsManagement() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBenefits() {
      setLoading(true);
      setError('');
      try {
        const data = await gqlRequest(GetBenefitsDocument);
        setBenefits(data.benefits);
      } catch (e: any) {
        setError(e.message ?? 'Failed to fetch benefits');
      } finally {
        setLoading(false);
      }
    }
    fetchBenefits();
  }, []);

  function handleCreated(benefit: Benefit) {
    setBenefits((prev) => [benefit, ...prev]);
  }

  function handleUpdated(updated: Benefit) {
    setBenefits((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }

  function handleDeleted(id: number) {
    setBenefits((prev) => prev.filter((b) => b.id !== id));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] p-12">
      {/* Header */}
      <div className="max-w-[1215px] mx-auto flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[#0F172A] text-2xl font-bold tracking-tight">
            Benefits Management
          </h1>
          <p className="text-[#64748B] text-sm mt-1">
            Configure and manage company benefits
          </p>
        </div>
        <AddBenefitDialog onCreated={handleCreated} />
      </div>

      {/* Table */}
      <div className="max-w-[1215px] mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs tracking-wider">
                Name
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs tracking-wider">
                Category
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs tracking-wider">
                Vendor
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs tracking-wider">
                Subsidy
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs tracking-wider">
                Status
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {benefits.map((benefit) => (
              <tr
                key={benefit.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="p-4">
                  <div className="font-semibold text-sm text-[#0F172A]">
                    {benefit.name}
                  </div>
                  <div className="text-xs text-[#64748B] max-w-xs mt-0.5">
                    {benefit.description}
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    variant="secondary"
                    className="bg-[#F1F5F9] text-[#475569] px-2.5 py-0.5 rounded-md text-[11px] font-medium border-none shadow-none"
                  >
                    {benefit.category}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-[#64748B] font-medium">
                  {benefit.vendorName || 'N/A'}
                </td>
                <td className="p-4 text-sm font-bold text-[#0F172A]">
                  {benefit.subsidyPercent}%
                </td>
                <td className="p-4">
                  <span
                    className={`px-[10px] py-1 rounded-lg text-[11px] font-semibold border shadow-none ${
                      benefit.isActive
                        ? 'bg-[#EDF7EC] text-[#59AF4F] border-[#D1E9CF]'
                        : 'bg-[#FEF2F2] text-[#EF4444] border-[#FEE2E2]'
                    }`}
                  >
                    {benefit.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-1">
                    <BenefitDetailsDialog benefit={benefit} />
                    <EditBenefitDialog
                      benefit={benefit}
                      onUpdated={handleUpdated}
                    />
                    <DeleteBenefitDialog
                      benefit={benefit}
                      onDeleted={handleDeleted}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
