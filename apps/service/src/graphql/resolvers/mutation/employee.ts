import { eq } from 'drizzle-orm';
import { employees } from '../../../db/schema';
import { getDB } from '../../../db';

type EmployeeInput = (typeof employees)['$inferInsert'];

function normalizeEmployeeInput(
  input: EmployeeInput,
  options?: { requireIdentity?: boolean },
): EmployeeInput {
  const normalized = {
    ...input,
    email: input.email?.trim(),
    name: input.name?.trim(),
    employeeRole: input.employeeRole?.trim() || undefined,
    department: input.department?.trim() || undefined,
    responsibilityLevel: input.responsibilityLevel?.trim() || undefined,
    hireDate: input.hireDate?.trim() || undefined,
    createdAt: input.createdAt?.trim() || undefined,
    clerkUserId: input.clerkUserId?.trim() || undefined,
  };

  if (options?.requireIdentity && !normalized.email) {
    throw new Error('Email is required');
  }

  if (options?.requireIdentity && !normalized.name) {
    throw new Error('Name is required');
  }

  return normalized;
}

function toEmployeeMutationError(error: unknown): Error {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes('employees_email_unique')) {
    return new Error('An employee with this email already exists');
  }

  if (message.includes('employees_clerk_user_id_unique')) {
    return new Error('This Clerk user ID is already linked to another employee');
  }

  if (message.includes('UNIQUE constraint failed: employees.email')) {
    return new Error('An employee with this email already exists');
  }

  if (message.includes('UNIQUE constraint failed: employees.clerk_user_id')) {
    return new Error('This Clerk user ID is already linked to another employee');
  }

  return error instanceof Error ? error : new Error('Employee mutation failed');
}

export const employeeMutationResolvers = {
  createEmployee: async (
    _: unknown,
    args: { input: EmployeeInput },
    ctx: { DB: D1Database },
  ) => {
    const db = getDB(ctx);

    try {
      const [created] = await db
        .insert(employees)
        .values(normalizeEmployeeInput(args.input, { requireIdentity: true }))
        .returning();

      if (!created) throw new Error('Employee insert failed');
      return created;
    } catch (error) {
      throw toEmployeeMutationError(error);
    }
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

    try {
      await db
        .update(employees)
        .set(normalizeEmployeeInput(args.input))
        .where(eq(employees.id, args.id));
    } catch (error) {
      throw toEmployeeMutationError(error);
    }

    const [updated] = await db
      .select()
      .from(employees)
      .where(eq(employees.id, args.id))
      .limit(1);

    if (!updated) throw new Error(`Employee not found: ${args.id}`);
    return updated;
  },
};
