import { eq } from 'drizzle-orm';
import { employees } from '../../../db/schema';
import { getDB } from '../../../db';

type EmployeeInput = (typeof employees)['$inferInsert'];

export const employeeMutationResolvers = {
  createEmployee: async (
    _: unknown,
    args: { input: EmployeeInput },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    const [created] = await db.insert(employees).values(args.input).returning();
    if (!created) throw new Error('Employee insert failed');
    return created;
  },

  deleteEmployee: async (
    _: unknown,
    args: { id: number },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);
    const result = await db.delete(employees).where(eq(employees.id, args.id));
    return Number(result.meta.changes ?? 0) > 0;
  },
  updateEmployee: async (
    _: unknown,
    args: { id: number; input: any },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    await db.update(employees).set(args.input).where(eq(employees.id, args.id));

    const [updated] = await db
      .select()
      .from(employees)
      .where(eq(employees.id, args.id))
      .limit(1);

    if (!updated) throw new Error(`Employee not found: ${args.id}`);
    return updated;
  },
};
