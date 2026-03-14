export const eligibilityRuleMutationTypeDefs = /* GraphQL */ `
  extend type Mutation {
    createEligibilityRule(input: CreateEligibilityRuleInput!): EligibilityRule!
    deleteEligibilityRule(id: Int!): Boolean!
    updateEligibilityRule(
      id: Int!
      input: UpdateEligibilityRuleInput!
    ): EligibilityRule!
  }
`;
