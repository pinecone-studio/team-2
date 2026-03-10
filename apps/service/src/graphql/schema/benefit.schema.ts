import { gql } from 'graphql-tag';

export const benefitTypeDefs = gql`
  enum BenefitStatus {
    ACTIVE
    ELIGIBLE
    LOCKED
    PENDING
  }
  enum RequestStatus {
    PENDING
    APPROVED
    REJECTED
    CANCELLED
  }
  enum EmploymentStatus {
    ACTIVE
    PROBATION
    LEAVE
    TERMINATED
  }

  type Benefit {
    id: ID!
    name: String!
    category: String!
    subsidyPercent: Int!
    requiresContract: Boolean!
    activeContract: Contract
  }

  type BenefitEligibility {
    benefit: Benefit!
    status: BenefitStatus!
    ruleEvaluations: [RuleEvaluation!]!
    computedAt: String!
  }

  type RuleEvaluation {
    ruleType: String!
    passed: Boolean!
    reason: String!
  }

  type BenefitRequest {
    id: ID!
    benefitId: ID!
    status: RequestStatus!
    contractVersionAccepted: String
    createdAt: String!
  }
`;
