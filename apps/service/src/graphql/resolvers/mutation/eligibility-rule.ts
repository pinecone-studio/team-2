import { eq } from 'drizzle-orm';
import { benefits, eligibilityRules } from '../../../db/schema';
import { getDB } from '../../../db';

export const eligibilityRuleMutationResolvers = {
  createEligibilityRule: async (
    _: unknown,
    args: { input: any },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    const [benefitExists] = await db
      .select({ id: benefits.id })
      .from(benefits)
      .where(eq(benefits.id, args.input.benefitId))
      .limit(1);

    if (!benefitExists)
      throw new Error(`Benefit not found: ${args.input.benefitId}`);

    const [created] = await db
      .insert(eligibilityRules)
      .values(args.input)
      .returning();

    if (!created) throw new Error('EligibilityRule insert failed');
    return created;
  },
};
