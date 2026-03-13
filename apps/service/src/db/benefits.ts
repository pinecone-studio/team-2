import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const benefits = sqliteTable('benefits', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  name: text('name').notNull(),
  category: text('category'),
  description: text('description'),
  subsidyPercent: integer('subsidy_percent'),
  vendorName: text('vendor_name'),

  requiresContract: integer('requires_contract', { mode: 'boolean' }).default(
    false,
  ),
  r2ObjectKey: text('r2_object_key'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),

  // Type тодорхойлоогүй байсан -> ISO datetime string
  contractUploadedAt: text('contract_uploaded_at'),
  contractExpiryDate: text('contract_expiry_date'),
});
