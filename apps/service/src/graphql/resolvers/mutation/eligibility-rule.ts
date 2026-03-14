import { eq } from 'drizzle-orm';
import { benefits, eligibilityRules } from '../../../db/schema';
import { getDB } from '../../../db';

type EligibilityRuleInput = (typeof eligibilityRules)['$inferInsert'];

export const eligibilityRuleMutationResolvers = {
  createEligibilityRule: async (
    _: unknown,
    args: { input: EligibilityRuleInput },
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

  deleteEligibilityRule: async (
    _: unknown,
    args: { id: number },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);
    const result = await db
      .delete(eligibilityRules)
      .where(eq(eligibilityRules.id, args.id));
    return Number(result.meta.changes ?? 0) > 0;
  },
  updateEligibilityRule: async (
    _: unknown,
    args: { id: number; input: Partial<EligibilityRuleInput> },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    // benefitId-ийг update хийвэл FK check хийнэ
    if (args.input.benefitId != null) {
      const [benefitExists] = await db
        .select({ id: benefits.id })
        .from(benefits)
        .where(eq(benefits.id, args.input.benefitId))
        .limit(1);

      if (!benefitExists) {
        throw new Error(`Benefit not found: ${args.input.benefitId}`);
      }
    }

    await db
      .update(eligibilityRules)
      .set(args.input)
      .where(eq(eligibilityRules.id, args.id));

    const [updated] = await db
      .select()
      .from(eligibilityRules)
      .where(eq(eligibilityRules.id, args.id))
      .limit(1);

    if (!updated) throw new Error(`EligibilityRule not found: ${args.id}`);
    return updated;
  },
};
