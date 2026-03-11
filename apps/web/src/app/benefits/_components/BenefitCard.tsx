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
    <Card className="w-[320px] rounded-3xl shadow-sm flex flex-col gap-[20px]">
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

      <CardContent className="space-y-2 flex flex-col gap-[20px]">
        <div>
          <h3 className="font-semibold">{benefit.title}</h3>

          <p className="text-sm text-muted-foreground">{benefit.description}</p>
        </div>

        <div>
          <div className="flex justify-between text-sm mt-3">
            <span className="text-[#64748B] leading-4 text-xs">Subsidy</span>
            <span className="font-medium text-[#137FEC]">
              {benefit.subsidy}%
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-sm">
            <span className="text-[#64748B] leading-4 text-xs">Vendor</span>
            <span className="font-medium">{benefit.vendor}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full !bg-[#137FEC] rounded-2xl shadow-[2px_4px_0_rgba(19,127,236,0.25)]">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
