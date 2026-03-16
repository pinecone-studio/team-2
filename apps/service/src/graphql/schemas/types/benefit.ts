export const benefitTypeDefs = /* GraphQL */ `
  enum BenefitStatus {
    ACTIVE
    ELIGIBLE
    LOCKED
    PENDING
  }

  type Benefit {
    id: Int!
    name: String!
    category: String
    description: String
    subsidyPercent: Int
    vendorName: String
    requiresContract: Boolean
    isActive: Boolean
    status: BenefitStatus
    r2ObjectKey: String
    contractUploadedAt: String
    contractExpiryDate: String
  }

  input CreateBenefitInput {
    name: String!
    category: String
    description: String
    subsidyPercent: Int
    vendorName: String
    requiresContract: Boolean
    isActive: Boolean
    status: BenefitStatus
    r2ObjectKey: String
    contractUploadedAt: String
    contractExpiryDate: String
  }

  input UpdateBenefitInput {
    name: String
    category: String
    description: String
    subsidyPercent: Int
    vendorName: String
    requiresContract: Boolean
    isActive: Boolean
    status: BenefitStatus
    r2ObjectKey: String
    contractUploadedAt: String
    contractExpiryDate: String
  }
`;
