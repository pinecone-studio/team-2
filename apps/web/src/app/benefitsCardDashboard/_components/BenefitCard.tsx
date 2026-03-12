import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from '@team/source-ui';
import { Button } from '@team/source-ui';
import { Badge } from '@team/source-ui';
import { Dumbbell } from 'lucide-react';

type Benefit = {
  id: string;
  title: string;
  description: string;
  subsidy: number;
  vendor: string;
  status: string;
};
const statusStyles: Record<string, string> = {
  Active: '!bg-green-100 !text-green-700',
  Locked: '!bg-gray-100 !text-gray-500',
  Pending: '!bg-yellow-100 !text-yellow-700',
  Eligible: '!bg-blue-100 !text-blue-700',
};

export function BenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <Card className="w-[280px] rounded-3xl border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.25)] flex flex-col justify-between">
      <CardHeader>
        <div className="flex flex-row justify-between ">
          <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
            <Dumbbell className="text-blue-500 text-xl" />
          </div>
          <div className="flex items-start ">
            <Badge className={statusStyles[benefit.status]}>
              {benefit.status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-lg text-[#0F172B] leading-[27px]">
            {benefit.title}
          </h3>

          <p className="text-xs leading-5 text-[#45556C]">
            {benefit.description}
          </p>
        </div>

        <div>
          <div className="flex justify-between text-xs ">
            <span className="text-[#64748B] leading-4 text-xs font-normal">
              Subsidy
            </span>
            <span className="font-bold text-[#137FEC] text-xs leading-4">
              {benefit.subsidy}%
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-xs">
            <span className="text-[#64748B] leading-4 text-xs font-normal">
              Vendor
            </span>
            <span className="font-medium text-xs leading-4">
              {benefit.vendor}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full !bg-[#137FEC] rounded-2xl hover:shadow-[2px_4px_3.8px_rgba(19,127,236,0.25)]">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
