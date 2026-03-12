export const benefitTypeDefs = /* GraphQL */ `
  type Benefit {
    id: ID!
    name: String!
    category: String
    description: String
    subsidyPercent: Int
    vendorName: String
    requiresContract: Boolean
    isActive: Boolean
    activeContractId: Int
  }

  input CreateBenefitInput {
    name: String!
    category: String
    description: String
    subsidyPercent: Int
    vendorName: String
    requiresContract: Boolean
    isActive: Boolean
    activeContractId: Int
  }
`;
