// import { eq } from 'drizzle-orm';
// import { benefits } from '../../../db/schema';
// import { getDB } from '../../../db';

// type BenefitInput = (typeof benefits)['$inferInsert'];

// export const benefitMutationResolvers = {
//   createBenefit: async (
//     _: unknown,
//     args: { input: BenefitInput },
//     ctx: { DB: D1Database },
//   ) => {
//     const db = getDB(ctx);
//     const [created] = await db.insert(benefits).values(args.input).returning();

//     if (!created) throw new Error('Benefit insert failed');
//     return created;
//   },

//   deleteBenefit: async (
//     _: unknown,
//     args: { id: number },
//     ctx: { DB: D1Database },
//   ) => {
//     const db = getDB(ctx);
//     const result = await db.delete(benefits).where(eq(benefits.id, args.id));
//     return Number(result.meta.changes ?? 0) > 0;
//   },

//   updateBenefit: async (
//     _: unknown,
//     args: { id: number; input: Partial<BenefitInput> },
//     ctx: { DB: D1Database },
//   ) => {
//     const db = getDB(ctx);

//     await db.update(benefits).set(args.input).where(eq(benefits.id, args.id));

//     const [updated] = await db
//       .select()
//       .from(benefits)
//       .where(eq(benefits.id, args.id))
//       .limit(1);

//     if (!updated) throw new Error(`Benefit not found: ${args.id}`);
//     return updated;
//   },
// };

import { eq } from 'drizzle-orm';
import { benefits } from '../../../db/schema';
import { getDB } from '../../../db';
import { uploadToR2 } from '../../../lib/r2/upload';

type BenefitInput = (typeof benefits)['$inferInsert'];

export const benefitMutationResolvers = {
  createBenefit: async (
    _: unknown,
    args: { input: BenefitInput & { contractFile?: any } },
    ctx: { DB: D1Database; BUCKET: R2Bucket },
  ) => {
    const db = getDB(ctx);

    const { contractFile, ...rest } = args.input;
    let r2Key: string | null = null;

    if (contractFile) {
      const bytes = new Uint8Array(await contractFile.arrayBuffer());
      const key = `contracts/${crypto.randomUUID()}-${contractFile.name.replace(/\s/g, '_')}`;
      await uploadToR2(ctx.BUCKET, bytes, key, contractFile.type);
      r2Key = key;
    }

    const finalR2Key = r2Key ?? rest.r2ObjectKey ?? null;

    const [created] = await db
      .insert(benefits)
      .values({
        ...rest,
        r2ObjectKey: finalR2Key,
      })
      .returning();

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
