import { Button, Badge } from '@team/source-ui';
import { Trash2,Pencil} from 'lucide-react';

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
    <div className="w-full min-h-screen bg-neutral-50 p-12">
      {/* Header */}
      <div className="max-w-[1215px] mx-auto flex justify-between items-start mb-8">
        <div>
          <h1 className="text-gray-900 text-3xl font-bold tracking-tight">
            Benefits Management
          </h1>
          <p className="text-gray-500 text-base mt-1">
            Configure and manage company benefits
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
          <span className="text-xl">+</span>
          <span className="font-semibold text-base">Add Benefit</span>
        </Button>
      </div>

      {/* Table */}
      <div className="max-w-[1215px] mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-5 font-semibold text-gray-900 text-sm">Name</th>
              <th className="p-5 font-semibold text-gray-900 text-sm">
                Category
              </th>
              <th className="p-5 font-semibold text-gray-900 text-sm">
                Vendor
              </th>
              <th className="p-5 font-semibold text-gray-900 text-sm">
                Subsidy
              </th>
              <th className="p-5 font-semibold text-gray-900 text-sm">
                Status
              </th>
              <th className="p-5 font-semibold text-gray-900 text-sm text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {benefitsData.map((benefit:Benefit) => (
              <tr key={benefit.id} className=" transition-colors">
                <td className="p-5">
                  <div className="font-semibold text-sm text-gray-900">
                    {benefit.name}
                  </div>
                  <div className="text-xs text-gray-500 max-w-xs leading-relaxed">
                    {benefit.description}
                  </div>
                </td>
                <td className="p-5">
                  <Badge className="bg-zinc-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-semibold hover:bg-transparent">
                    {benefit.category}
                  </Badge>
                </td>
                <td className="p-5 text-sm text-gray-600 font-medium">
                  {benefit.vendorName || 'N/A'}
                </td>
                <td className="p-5 text-sm font-bold text-gray-900">
                  {benefit.subsidyPercent}%
                </td>
                <td className="p-5">
                  <Badge
                    className={`bg-transparent px-3 py-1 rounded-full text-xs font-semibold border ${
                      benefit.isActive
                        ? 'bg-[#EDF7EC] text-[#59AF4F] border-emerald-100'
                        : 'bg-red-50 text-red-600 border-red-100'
                    }`}
                  >
                    {benefit.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="p-5">
                  <div className="flex justify-center gap-2">
                    <Button className="p-2  rounded-lg text-gray-700 transition-colors bg-transparent hover:bg-transparent">
                      <Pencil />
                    </Button>
                    <Button className="p-2 rounded-lg text-red-500 transition-colors bg-transparent hover:bg-transparent">
                      <Trash2 />
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
