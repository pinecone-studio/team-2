import { eq } from 'drizzle-orm';
import { benefitRequests } from '../../../db/schema';
import { getDB } from '../../../db';

const toRequestStatus = (value?: string | null) => {
  if (!value) return null;
  const v = value.toUpperCase();
  if (
    v === 'PENDING' ||
    v === 'APPROVED' ||
    v === 'REJECTED' ||
    v === 'CANCELLED'
  ) {
    return v;
  }
  return null;
};

const normalizeRows = <T extends { status?: string | null }>(rows: T[]) =>
  rows.map((r) => ({ ...r, status: toRequestStatus(r.status) }));

export const benefitRequestQueryResolvers = {
  benefitRequests: async (_: unknown, __: unknown, ctx: { DB: D1Database }) => {
    const rows = await getDB(ctx).select().from(benefitRequests);
    return normalizeRows(rows);
  },
  benefitRequestsByEmployee: async (
    _: unknown,
    args: { employeeId: number },
    ctx: { DB: D1Database },
  ) => {
    const rows = await getDB(ctx)
      .select()
      .from(benefitRequests)
      .where(eq(benefitRequests.employeeId, args.employeeId));
    return normalizeRows(rows);
  },
  benefitRequestsByBenefit: async (
    _: unknown,
    args: { benefitId: number },
    ctx: { DB: D1Database },
  ) => {
    const rows = await getDB(ctx)
      .select()
      .from(benefitRequests)
      .where(eq(benefitRequests.benefitId, args.benefitId));
    return normalizeRows(rows);
  },
};
