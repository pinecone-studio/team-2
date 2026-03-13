export const benefitMutationTypeDefs = /* GraphQL */ `
  extend type Mutation {
    createBenefit(input: CreateBenefitInput!): Benefit!
    deleteBenefit(id: Int!): Boolean!
  }
`;
