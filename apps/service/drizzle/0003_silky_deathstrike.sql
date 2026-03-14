CREATE TABLE `benefit_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`employee_id` integer NOT NULL,
	`benefit_id` integer NOT NULL,
	`status` text DEFAULT 'pending',
	`created_at` text,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`benefit_id`) REFERENCES `benefits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_benefits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text,
	`description` text,
	`subsidy_percent` integer,
	`vendor_name` text,
	`requires_contract` integer DEFAULT false,
	`r2_object_key` text,
	`is_active` integer DEFAULT true,
	`contract_uploaded_at` text,
	`contract_expiry_date` text
);
--> statement-breakpoint
INSERT INTO `__new_benefits`("id", "name", "category", "description", "subsidy_percent", "vendor_name", "requires_contract", "r2_object_key", "is_active", "contract_uploaded_at", "contract_expiry_date") SELECT "id", "name", "category", "description", "subsidy_percent", "vendor_name", "requires_contract", "r2_object_key", "is_active", "contract_uploaded_at", "contract_expiry_date" FROM `benefits`;--> statement-breakpoint
DROP TABLE `benefits`;--> statement-breakpoint
ALTER TABLE `__new_benefits` RENAME TO `benefits`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_eligibility_rules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`benefit_id` integer NOT NULL,
	`rule_type` text,
	`error_message` text,
	`operator` text,
	`value` text,
	`is_active` integer DEFAULT true,
	FOREIGN KEY (`benefit_id`) REFERENCES `benefits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_eligibility_rules`("id", "benefit_id", "rule_type", "error_message", "operator", "value", "is_active") SELECT "id", "benefit_id", "rule_type", "error_message", "operator", "value", "is_active" FROM `eligibility_rules`;--> statement-breakpoint
DROP TABLE `eligibility_rules`;--> statement-breakpoint
ALTER TABLE `__new_eligibility_rules` RENAME TO `eligibility_rules`;--> statement-breakpoint
CREATE TABLE `__new_employees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`employee_role` text,
	`department` text,
	`responsibility_level` text,
	`employment_status` text DEFAULT 'active',
	`hire_date` text,
	`okr_submitted` integer DEFAULT false,
	`late_arrival_count` integer DEFAULT 0,
	`created_at` text,
	`clerk_user_id` text
);
--> statement-breakpoint
INSERT INTO `__new_employees`("id", "email", "name", "employee_role", "department", "responsibility_level", "employment_status", "hire_date", "okr_submitted", "late_arrival_count", "created_at", "clerk_user_id") SELECT "id", "email", "name", "employee_role", "department", "responsibility_level", "employment_status", "hire_date", "okr_submitted", "late_arrival_count", "created_at", "clerk_user_id" FROM `employees`;--> statement-breakpoint
DROP TABLE `employees`;--> statement-breakpoint
ALTER TABLE `__new_employees` RENAME TO `employees`;--> statement-breakpoint
CREATE UNIQUE INDEX `employees_email_unique` ON `employees` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `employees_clerk_user_id_unique` ON `employees` (`clerk_user_id`);