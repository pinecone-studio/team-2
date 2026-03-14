export const eligibilityRuleTypeDefs = /* GraphQL */ `
  type EligibilityRule {
    id: Int!
    benefitId: Int!
    ruleType: String
    operator: String
    value: String
    errorMessage: String
    isActive: Boolean
  }

  input CreateEligibilityRuleInput {
    benefitId: Int!
    ruleType: String
    operator: String
    value: String
    errorMessage: String
    isActive: Boolean
  }
  input UpdateEligibilityRuleInput {
    benefitId: Int
    ruleType: String
    operator: String
    value: String
    errorMessage: String
    isActive: Boolean
  }
`;
