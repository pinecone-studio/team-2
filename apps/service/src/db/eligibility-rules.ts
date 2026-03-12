import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const eligibilityRules = sqliteTable('eligibility_rules', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),

  benefitId: text('benefit_id').notNull(),

  ruleType: text('rule_type'),

  operator: text('operator'),

  value: text('value'),

  errorMessage: text('error_message'),

  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});
