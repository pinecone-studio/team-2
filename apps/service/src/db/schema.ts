export { employees } from './employees';
export { benefits } from './benefits';
export { eligibilityRules } from './eligibility-rules';
export { benefitRequests } from './benefit-requests';

import { employees } from './employees';
import { benefits } from './benefits';
import { eligibilityRules } from './eligibility-rules';
import { benefitRequests } from './benefit-requests';

export const schema = {
  employees,
  benefits,
  eligibilityRules,
  benefitRequests,
};

// yarn db:generate -> wrangler d1 migrations apply DB --local.
