import { employees } from '../../../db/schema';
import { getDB } from '../../../db';

export const employeeQueryResolvers = {
  employees: async (_: unknown, __: unknown, ctx: { DB: D1Database }) => {
    return getDB(ctx).select().from(employees);
  },
};
