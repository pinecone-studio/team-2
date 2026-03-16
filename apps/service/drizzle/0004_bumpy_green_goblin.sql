--> statement-breakpoint
UPDATE `benefit_requests`
SET `status` = UPPER(`status`)
WHERE `status` IS NOT NULL;

--> statement-breakpoint
UPDATE `employees`
SET `employment_status` = UPPER(`employment_status`)
WHERE `employment_status` IS NOT NULL;