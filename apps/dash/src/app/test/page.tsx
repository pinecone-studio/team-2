import {
  checkAllBenefits,
  checkBenefitEligibility,
  getEligibleBenefits,
} from '../../lib/benefits-eligibility';
import type { Employee } from '../../types/benefits.types';

const employee: Employee = {
  id: 1,
  name: 'Sara Jones',
  email: 'sara@pinequest.com',
  role: 'ux_engineer',
  department: 'Design',
  // eslint-disable-next-line camelcase
  responsibility_level: 2,
  // eslint-disable-next-line camelcase
  employment_status: 'active',
  // eslint-disable-next-line camelcase
  days_since_hire: 400,
  // eslint-disable-next-line camelcase
  okr_submitted: true,
  // eslint-disable-next-line camelcase
  okr_score: 85,
  attendance: 1,
  // eslint-disable-next-line camelcase
  finance_approval: false,
  // eslint-disable-next-line camelcase
  manager_pre_approval: true,
};

const Page = () => {
  const gymResult = checkBenefitEligibility(employee, 'gym_pinefit');
  const allResults = checkAllBenefits(employee);
  const eligible = getEligibleBenefits(employee);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Benefits for {employee.name}</h1>

      {/* Single benefit check */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Gym — PineFit</h2>
        <div
          className={`p-4 rounded-lg border ${gymResult.eligible ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}
        >
          <p className="font-medium">
            {gymResult.eligible ? '✅ Eligible' : '❌ Not Eligible'}
          </p>
          {gymResult.errors.length > 0 && (
            <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
              {gymResult.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Eligible benefits */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          ✅ Eligible Benefits ({eligible.length})
        </h2>
        <div className="space-y-2">
          {eligible.map((result) => (
            <div
              key={result.benefitKey}
              className="p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="font-medium text-green-800">{result.benefitName}</p>
            </div>
          ))}
        </div>
      </section>

      {/* All benefits */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          All Benefits ({allResults.length})
        </h2>
        <div className="space-y-2">
          {allResults.map((result) => (
            <div
              key={result.benefitKey}
              className={`p-3 rounded-lg border ${result.eligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <p className="font-medium">
                {result.eligible ? '✅' : '❌'} {result.benefitName}
              </p>
              {result.errors.length > 0 && (
                <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
                  {result.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
