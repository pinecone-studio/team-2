import { employees } from '../../../db/schema';
import { getDB } from '../../../db';

export const employeeMutationResolvers = {
  createEmployee: async (
    _: unknown,
    args: { input: any },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    const [created] = await db.insert(employees).values(args.input).returning();
    if (!created) throw new Error('Employee insert failed');
    return created;
  },
};
