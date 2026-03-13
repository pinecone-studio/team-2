import { relations } from "drizzle-orm/relations";
import { benefits, eligibilityRules, benefitRequests, employees } from "./schema";

export const eligibilityRulesRelations = relations(eligibilityRules, ({one}) => ({
	benefit: one(benefits, {
		fields: [eligibilityRules.benefitId],
		references: [benefits.id]
	}),
}));

export const benefitsRelations = relations(benefits, ({many}) => ({
	eligibilityRules: many(eligibilityRules),
	benefitRequests: many(benefitRequests),
}));

export const benefitRequestsRelations = relations(benefitRequests, ({one}) => ({
	benefit: one(benefits, {
		fields: [benefitRequests.benefitId],
		references: [benefits.id]
	}),
	employee: one(employees, {
		fields: [benefitRequests.employeeId],
		references: [employees.id]
	}),
}));

export const employeesRelations = relations(employees, ({many}) => ({
	benefitRequests: many(benefitRequests),
}));