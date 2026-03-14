PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_benefits` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text,
	`description` text,
	`subsidy_percent` integer,
	`vendor_name` text,
	`requires_contract` integer DEFAULT false,
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_benefits`("id", "name", "category", "description", "subsidy_percent", "vendor_name", "requires_contract", "is_active") SELECT "id", "name", "category", "description", "subsidy_percent", "vendor_name", "requires_contract", "is_active" FROM `benefits`;--> statement-breakpoint
DROP TABLE `benefits`;--> statement-breakpoint
ALTER TABLE `__new_benefits` RENAME TO `benefits`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_eligibility_rules` (
	`id` text PRIMARY KEY NOT NULL,
	`benefit_id` text NOT NULL,
	`rule_type` text,
	`operator` text,
	`value` text,
	`error_message` text,
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_eligibility_rules`("id", "benefit_id", "rule_type", "operator", "value", "error_message", "is_active") SELECT "id", "benefit_id", "rule_type", "operator", "value", "error_message", "is_active" FROM `eligibility_rules`;--> statement-breakpoint
DROP TABLE `eligibility_rules`;--> statement-breakpoint
ALTER TABLE `__new_eligibility_rules` RENAME TO `eligibility_rules`;--> statement-breakpoint
CREATE TABLE `__new_employees` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`role` text,
	`department` text,
	`responsibility_level` integer DEFAULT 1,
	`employment_status` text DEFAULT 'active',
	`hire_date` text,
	`okr_submitted` integer DEFAULT false,
	`late_arrival_count` integer DEFAULT 0,
	`clerk_user_id` text,
	`created_at` text
);
--> statement-breakpoint
INSERT INTO `__new_employees`("id", "email", "name", "role", "department", "responsibility_level", "employment_status", "hire_date", "okr_submitted", "late_arrival_count", "clerk_user_id", "created_at") SELECT "id", "email", "name", "role", "department", "responsibility_level", "employment_status", "hire_date", "okr_submitted", "late_arrival_count", "clerk_user_id", "created_at" FROM `employees`;--> statement-breakpoint
DROP TABLE `employees`;--> statement-breakpoint
ALTER TABLE `__new_employees` RENAME TO `employees`;--> statement-breakpoint
CREATE UNIQUE INDEX `employees_email_unique` ON `employees` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `employees_clerk_user_id_unique` ON `employees` (`clerk_user_id`);