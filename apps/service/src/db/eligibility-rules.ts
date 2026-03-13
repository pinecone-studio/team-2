import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { benefits } from './benefits';

export const eligibilityRules = sqliteTable('eligibility_rules', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id),

  ruleType: text('rule_type'),
  errorMessage: text('error_message'),
  operator: text('operator'),
  value: text('value'),

  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});
