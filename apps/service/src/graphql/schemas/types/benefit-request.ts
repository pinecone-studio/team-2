export const benefitRequestTypeDefs = /* GraphQL */ `
  type BenefitRequest {
    id: Int!
    employeeId: Int!
    benefitId: Int!
    status: String
    createdAt: String
  }

  input CreateBenefitRequestInput {
    employeeId: Int!
    benefitId: Int!
    status: String
    createdAt: String
  }

  input UpdateBenefitRequestInput {
    employeeId: Int
    benefitId: Int
    status: String
    createdAt: String
  }
`;
