import { eq } from 'drizzle-orm';
import { eligibilityRules } from '../../../db/schema';
import { getDB } from '../../../db';

export const eligibilityRuleQueryResolvers = {
  eligibilityRules: async (
    _: unknown,
    __: unknown,
    ctx: { DB: D1Database },
  ) => {
    return getDB(ctx).select().from(eligibilityRules);
  },
  eligibilityRulesByBenefit: async (
    _: unknown,
    args: { benefitId: number },
    ctx: { DB: D1Database },
  ) => {
    return getDB(ctx)
      .select()
      .from(eligibilityRules)
      .where(eq(eligibilityRules.benefitId, args.benefitId));
  },
};
