import { gql } from 'graphql-tag';

export const rootTypeDefs = gql`
  type Query {
    me: Employee!
    myBenefits: [BenefitEligibility!]!
    benefits(category: String): [Benefit!]!
    employee(id: ID!): Employee # HR only
    auditLog(filters: AuditFilters): [AuditEntry!]! # HR only
  }

  type Mutation {
    requestBenefit(benefitId: ID!): BenefitRequest!
    confirmBenefitRequest(
      requestId: ID!
      contractAccepted: Boolean!
    ): BenefitRequest!
    cancelBenefitRequest(requestId: ID!): BenefitRequest!
    # HR Admin
    overrideEligibility(input: OverrideInput!): BenefitEligibility!
    uploadContract(input: ContractInput!): Contract!
    reviewBenefitRequest(input: ReviewInput!): BenefitRequest!
  }

  input OverrideInput {
    employeeId: ID!
    benefitId: ID!
    status: BenefitStatus!
    reason: String!
  }

  input ContractInput {
    benefitId: ID!
    vendorName: String!
    version: String!
    r2ObjectKey: String!
  }

  input ReviewInput {
    requestId: ID!
    approved: Boolean!
    note: String
  }

  input AuditFilters {
    employeeId: ID
    benefitId: ID
    fromDate: String
    toDate: String
  }
`;
