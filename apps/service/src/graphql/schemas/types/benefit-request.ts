export const benefitRequestTypeDefs = /* GraphQL */ `
  enum RequestStatus {
    PENDING
    APPROVED
    REJECTED
    CANCELLED
  }

  type BenefitRequest {
    id: Int!
    employeeId: Int!
    benefitId: Int!
    status: RequestStatus
    createdAt: String
  }

  input CreateBenefitRequestInput {
    employeeId: Int!
    benefitId: Int!
    status: RequestStatus
    createdAt: String
  }

  input UpdateBenefitRequestInput {
    employeeId: Int
    benefitId: Int
    status: RequestStatus
    createdAt: String
  }
`;
