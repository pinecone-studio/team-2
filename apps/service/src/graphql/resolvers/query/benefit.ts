import { benefits } from '../../../db/schema';
import { getDB } from '../../../db';

export const benefitQueryResolvers = {
  benefits: async (_: unknown, __: unknown, ctx: { DB: D1Database }) => {
    return getDB(ctx).select().from(benefits);
  },
};
