import { sqliteTable, integer, text, numeric } from 'drizzle-orm/sqlite-core';

export const employees = sqliteTable('employees', {
  id: integer().primaryKey({ autoIncrement: true }),
  email: text(),
  name: text(),
  role: text(),
  department: text(),
  responsibilityLevel: text('responsibility_level'),
  employmentStatus: text('employment_status'),
  hireDate: numeric('hire_date'),
  okrSubmitted: integer('okr_submitted'),
  lateArrivalCount: integer('late_arrival_count'),
  createdAt: numeric('created_at'),
  clerkUserId: text('clerk_user_id'),
});

export const benefits = sqliteTable('benefits', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  category: text(),
  description: text(),
  subsidyPercent: integer('subsidy_percent'),
  vendorName: text('vendor_name'),
  requiresContract: integer('requires_contract'),
  isActive: integer('is_active').default(1),
  activeContractId: integer('active_contract_id'),
});

export const eligibilityRules = sqliteTable('eligibility_rules', {
  id: integer().primaryKey({ autoIncrement: true }),
  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id),
  ruleType: text('rule_type'),
  operator: text(),
  value: text(),
  errorMessage: text('error_message'),
  isActive: integer('is_active').default(1),
});
