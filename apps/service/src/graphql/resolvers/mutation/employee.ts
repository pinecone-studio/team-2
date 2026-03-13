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
};
