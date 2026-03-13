import { eq } from 'drizzle-orm';
import { benefitRequests } from '../../../db/schema';
import { getDB } from '../../../db';

export const benefitRequestQueryResolvers = {
  benefitRequests: async (_: unknown, __: unknown, ctx: { DB: D1Database }) => {
    return getDB(ctx).select().from(benefitRequests);
  },
  benefitRequestsByEmployee: async (
    _: unknown,
    args: { employeeId: number },
    ctx: { DB: D1Database },
  ) => {
    return getDB(ctx)
      .select()
      .from(benefitRequests)
      .where(eq(benefitRequests.employeeId, args.employeeId));
  },
  benefitRequestsByBenefit: async (
    _: unknown,
    args: { benefitId: number },
    ctx: { DB: D1Database },
  ) => {
    return getDB(ctx)
      .select()
      .from(benefitRequests)
      .where(eq(benefitRequests.benefitId, args.benefitId));
  },
};
