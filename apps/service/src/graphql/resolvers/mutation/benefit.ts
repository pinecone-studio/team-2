import { eq } from 'drizzle-orm';
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

  deleteBenefit: async (
    _: unknown,
    args: { id: number },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);
    const result = await db.delete(benefits).where(eq(benefits.id, args.id));
    return Number(result.meta.changes ?? 0) > 0;
  },

  updateBenefit: async (
    _: unknown,
    args: { id: number; input: Partial<BenefitInput> },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    await db.update(benefits).set(args.input).where(eq(benefits.id, args.id));

    const [updated] = await db
      .select()
      .from(benefits)
      .where(eq(benefits.id, args.id))
      .limit(1);

    if (!updated) throw new Error(`Benefit not found: ${args.id}`);
    return updated;
  },
};
