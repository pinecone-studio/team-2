import { gql } from 'graphql-tag';

export const employeeTypeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    role: String!
    responsibilityLevel: Int!
    employmentStatus: EmploymentStatus!
    okrSubmitted: Boolean!
    lateArrivalCount: Int!
    benefits: [BenefitEligibility!]!
  }
`;
