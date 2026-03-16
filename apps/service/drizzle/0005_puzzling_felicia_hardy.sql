PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_benefit_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`employee_id` integer NOT NULL,
	`benefit_id` integer NOT NULL,
	`status` text DEFAULT 'PENDING',
	`created_at` text,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`benefit_id`) REFERENCES `benefits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_benefit_requests`("id", "employee_id", "benefit_id", "status", "created_at") SELECT "id", "employee_id", "benefit_id", "status", "created_at" FROM `benefit_requests`;--> statement-breakpoint
DROP TABLE `benefit_requests`;--> statement-breakpoint
ALTER TABLE `__new_benefit_requests` RENAME TO `benefit_requests`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_eligibility_rules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`benefit_id` integer NOT NULL,
	`rule_type` text,
	`error_message` text,
	`operator` text,
	`value` text,
	`is_active` integer DEFAULT true,
	FOREIGN KEY (`benefit_id`) REFERENCES `benefits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_eligibility_rules`("id", "benefit_id", "rule_type", "error_message", "operator", "value", "is_active") SELECT "id", "benefit_id", "rule_type", "error_message", "operator", "value", "is_active" FROM `eligibility_rules`;--> statement-breakpoint
DROP TABLE `eligibility_rules`;--> statement-breakpoint
ALTER TABLE `__new_eligibility_rules` RENAME TO `eligibility_rules`;