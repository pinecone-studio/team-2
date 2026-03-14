import {
  sqliteTable,
  AnySQLiteColumn,
  integer,
  text,
  numeric,
  foreignKey,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const employees = sqliteTable('employees', {
  id: integer().primaryKey({ autoIncrement: true }),
  email: text().notNull(),
  name: text().notNull(),
  employeeRole: text('employee_role'),
  department: text(),
  responsibilityLevel: text('responsibility_level'),
  employmentStatus: text('employment_status'),
  hireDate: numeric('hire_date'),
  okrSubmitted: numeric('okr_submitted'),
  lateArrivalCount: integer('late_arrival_count').default(0),
  createdAt: numeric('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  clerkUserId: text('clerk_user_id'),
});

export const benefits = sqliteTable('benefits', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  category: text(),
  description: text(),
  subsidyPercent: integer('subsidy_percent'),
  vendorName: text('vendor_name'),
  requiresContract: numeric('requires_contract'),
  r2ObjectKey: text('r2_object_key'),
  isActive: numeric('is_active').default(sql`1`),
  contractUploadedAt: numeric('contract_uploaded_at'),
  contractExpiryDate: numeric('contract_expiry_date'),
});

export const eligibilityRules = sqliteTable('eligibility_rules', {
  id: integer().primaryKey({ autoIncrement: true }),
  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id),
  ruleType: text('rule_type'),
  errorMessage: text('error_message'),
  operator: text(),
  value: text(),
  isActive: numeric('is_active').default(sql`1`),
});

export const benefitRequests = sqliteTable('benefit_requests', {
  id: integer().primaryKey({ autoIncrement: true }),
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id),
  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id),
  status: text().default('pending'),
  createdAt: numeric('created_at').default(sql`(CURRENT_TIMESTAMP)`),
});
