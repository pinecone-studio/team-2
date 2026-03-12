import { relations } from "drizzle-orm/relations";
import { benefits, eligibilityRules } from "./schema";

export const eligibilityRulesRelations = relations(eligibilityRules, ({one}) => ({
	benefit: one(benefits, {
		fields: [eligibilityRules.benefitId],
		references: [benefits.id]
	}),
}));

export const benefitsRelations = relations(benefits, ({many}) => ({
	eligibilityRules: many(eligibilityRules),
}));