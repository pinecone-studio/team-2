import { benefits } from '../../../db/schema';
import { getDB } from '../../../db';

type BenefitInput = (typeof benefits)['$inferInsert'];

export const benefitMutationResolvers = {
  createBenefit: async (
    _: unknown,
    args: { input: BenefitInput },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);
    const [created] = await db.insert(benefits).values(args.input).returning();

    if (!created) throw new Error('Benefit insert failed');
    return created;
  },
};
