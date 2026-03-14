import { benefitRequests, employees, benefits } from '../../../db/schema';
import { getDB } from '../../../db';
import { eq } from 'drizzle-orm';

export const benefitRequestMutationResolvers = {
  createBenefitRequest: async (
    _: unknown,
    args: { input: any },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    const [employeeExists] = await db
      .select({ id: employees.id })
      .from(employees)
      .where(eq(employees.id, args.input.employeeId))
      .limit(1);

    if (!employeeExists) {
      throw new Error(`Employee not found: ${args.input.employeeId}`);
    }

    const [benefitExists] = await db
      .select({ id: benefits.id })
      .from(benefits)
      .where(eq(benefits.id, args.input.benefitId))
      .limit(1);

    if (!benefitExists) {
      throw new Error(`Benefit not found: ${args.input.benefitId}`);
    }

    const [created] = await db
      .insert(benefitRequests)
      .values(args.input)
      .returning();

    if (!created) throw new Error('BenefitRequest insert failed');
    return created;
  },

  deleteBenefitRequest: async (
    _: unknown,
    args: { id: number },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);
    const result = await db
      .delete(benefitRequests)
      .where(eq(benefitRequests.id, args.id));
    return Number(result.meta.changes ?? 0) > 0;
  },
  updateBenefitRequest: async (
    _: unknown,
    args: {
      id: number;
      input: Partial<{
        employeeId: number;
        benefitId: number;
        status: string;
        createdAt: string;
      }>;
    },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    if (args.input.employeeId != null) {
      const [employeeExists] = await db
        .select({ id: employees.id })
        .from(employees)
        .where(eq(employees.id, args.input.employeeId))
        .limit(1);

      if (!employeeExists) {
        throw new Error(`Employee not found: ${args.input.employeeId}`);
      }
    }

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
      .update(benefitRequests)
      .set(args.input)
      .where(eq(benefitRequests.id, args.id));

    const [updated] = await db
      .select()
      .from(benefitRequests)
      .where(eq(benefitRequests.id, args.id))
      .limit(1);

    if (!updated) throw new Error(`BenefitRequest not found: ${args.id}`);
    return updated;
  },
};
