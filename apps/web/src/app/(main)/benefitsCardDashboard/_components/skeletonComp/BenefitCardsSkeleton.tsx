import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from '@team/source-ui';

export function BenefitsCardSkeleton() {
  return (
    <div className="flex flex-wrap items-stretch justify-start gap-x-4 gap-y-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="w-full max-w-[320px] sm:w-[calc((100%-1rem)/2)] xl:w-[calc((100%-2rem)/3)] xl:max-w-none"
        >
          <Card className="w-full max-w-[320px] animate-pulse overflow-hidden rounded-[12px] border border-gray-200 bg-gradient-to-b from-[#EFF6FF] via-white to-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] xl:max-w-none">
            <CardHeader className="px-6 pt-8 pb-4">
              <div className="flex flex-row items-start justify-between">
                <div className="h-14 w-14 rounded-2xl bg-gray-200" />
                <div className="h-6 w-[84px] rounded-full bg-gray-200" />
              </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between space-y-4 px-6">
              <div className="space-y-2">
                <div className="h-7 w-3/4 rounded-md bg-gray-200" />
                <div className="h-10 space-y-2">
                  <div className="h-3 w-full rounded-md bg-gray-100" />
                  <div className="h-3 w-5/6 rounded-md bg-gray-100" />
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="h-3 w-14 rounded-md bg-gray-100" />
                  <div className="h-3 w-10 rounded-md bg-gray-200" />
                </div>
                <Separator className="my-3 bg-[#F1F5F9]" />
                <div className="flex items-center justify-between text-sm">
                  <div className="h-3 w-12 rounded-md bg-gray-100" />
                  <div className="h-3 w-20 rounded-md bg-gray-200" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-6 pt-4 pb-8">
              <div className="h-12 w-full rounded-[12px] bg-gray-200" />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
