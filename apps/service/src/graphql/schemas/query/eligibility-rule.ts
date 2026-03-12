export const eligibilityRuleQueryTypeDefs = /* GraphQL */ `
  extend type Query {
    eligibilityRules: [EligibilityRule!]!
    eligibilityRulesByBenefit(benefitId: Int!): [EligibilityRule!]!
  }
`;
