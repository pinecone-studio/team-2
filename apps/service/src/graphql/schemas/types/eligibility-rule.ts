export const eligibilityRuleTypeDefs = /* GraphQL */ `
  type EligibilityRule {
    id: ID!
    benefitId: ID!
    ruleType: String
    operator: String
    value: String
    errorMessage: String
    isActive: Boolean
  }

  input CreateEligibilityRuleInput {
    benefitId: ID!
    ruleType: String
    operator: String
    value: String
    errorMessage: String
    isActive: Boolean
  }
`;
