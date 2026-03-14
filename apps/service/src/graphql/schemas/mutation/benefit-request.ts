export const benefitRequestMutationTypeDefs = /* GraphQL */ `
  extend type Mutation {
    createBenefitRequest(input: CreateBenefitRequestInput!): BenefitRequest!
    deleteBenefitRequest(id: Int!): Boolean!
    updateBenefitRequest(
      id: Int!
      input: UpdateBenefitRequestInput!
    ): BenefitRequest!
  }
`;
