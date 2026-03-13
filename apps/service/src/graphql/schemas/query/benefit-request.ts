export const benefitRequestQueryTypeDefs = /* GraphQL */ `
  extend type Query {
    benefitRequests: [BenefitRequest!]!
    benefitRequestsByEmployee(employeeId: Int!): [BenefitRequest!]!
    benefitRequestsByBenefit(benefitId: Int!): [BenefitRequest!]!
  }
`;
