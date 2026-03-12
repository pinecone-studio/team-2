import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const benefits = sqliteTable('benefits', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),

  name: text('name').notNull(),
  category: text('category'),

  description: text('description'),

  subsidyPercent: integer('subsidy_percent'),

  vendorName: text('vendor_name'),

  requiresContract: integer('requires_contract', { mode: 'boolean' }).default(
    false,
  ),

  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});
