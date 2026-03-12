import { Button, Badge } from '@team/source-ui';
import { Trash2, Pencil, Plus } from 'lucide-react';

interface Benefit {
  id: number;
  name: string;
  category: string;
  description: string;
  subsidyPercent: number;
  vendorName?: string | null;
  requiresContract: boolean;
  isActive: boolean;
  activeContractId?: number | null;
}

const benefitsData: Benefit[] = [
  {
    id: 1,
    name: 'Gym Membership',
    category: 'Health',
    description: 'Access to premium gym facilities and fitness classes.',
    subsidyPercent: 50,
    vendorName: 'PineFit',
    requiresContract: true,
    isActive: true,
    activeContractId: 101,
  },
  {
    id: 3,
    name: 'Travel to Tokyo',
    category: 'Travel',
    description: '30% sale',
    subsidyPercent: 30,
    vendorName: 'PineTour',
    requiresContract: true,
    isActive: false,
    activeContractId: 101,
  },
];

export default function BenefitsManagement() {
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
        <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 h-10">
          <Plus />
          <span className="font-semibold text-sm">Add Benefit</span>
        </Button>
      </div>

      {/* Table */}
      <div className="max-w-[1215px] mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 ">
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs tracking-wider">
                Name
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs tracking-wider">
                Category
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs  tracking-wider">
                Vendor
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs  tracking-wider">
                Subsidy
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs  tracking-wider">
                Status
              </th>
              <th className="p-4 pb-1 font-semibold text-[#1E293B] text-xs  tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {benefitsData.map((benefit: Benefit) => (
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
                    className="px-[10px] py-1 bg-[#F1F5F9] text-[#475569] px-2.5 py-0.5 rounded-md text-[11px] font-medium border-none shadow-none"
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
                  <div className="flex justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#EF4444] hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
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
