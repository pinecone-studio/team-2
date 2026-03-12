import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const employees = sqliteTable('employees', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),

  email: text('email').notNull().unique(),
  name: text('name').notNull(),

  role: text('role'),
  department: text('department'),

  responsibilityLevel: integer('responsibility_level').default(1),

  employmentStatus: text('employment_status').default('active'),

  hireDate: text('hire_date'),

  okrSubmitted: integer('okr_submitted', { mode: 'boolean' }).default(false),

  lateArrivalCount: integer('late_arrival_count').default(0),

  clerkUserId: text('clerk_user_id').unique(),

  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
});
