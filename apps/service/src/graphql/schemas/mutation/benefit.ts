export const benefitMutationTypeDefs = /* GraphQL */ `
  extend type Mutation {
    createBenefit(input: CreateBenefitInput!): Benefit!
    deleteBenefit(id: Int!): Boolean!
    updateBenefit(id: Int!, input: UpdateBenefitInput!): Benefit!
  }
`;
