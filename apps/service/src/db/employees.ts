import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const employees = sqliteTable('employees', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  email: text('email').notNull().unique(),
  name: text('name').notNull(),

  employeeRole: text('employee_role'),
  department: text('department'),
  responsibilityLevel: text('responsibility_level'),
  employmentStatus: text('employment_status').default('ACTIVE'),

  hireDate: text('hire_date'),

  okrSubmitted: integer('okr_submitted', { mode: 'boolean' }).default(true),
  lateArrivalCount: integer('late_arrival_count').default(0),

  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),

  clerkUserId: text('clerk_user_id').unique(),
});
