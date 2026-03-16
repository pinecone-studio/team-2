import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { employees } from './employees';
import { benefits } from './benefits';

export const benefitRequests = sqliteTable('benefit_requests', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id),

  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id, { onDelete: 'cascade' }),

  status: text('status').default('PENDING'),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
});
