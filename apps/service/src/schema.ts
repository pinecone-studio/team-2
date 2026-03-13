import { createSchema, type YogaInitialContext } from 'graphql-yoga';
import type { Env } from './worker';

import { employeeTypeDefs } from './graphql/schemas/types/employee';
import { benefitTypeDefs } from './graphql/schemas/types/benefit';
import { eligibilityRuleTypeDefs } from './graphql/schemas/types/eligibility-rule';

import { employeeQueryTypeDefs } from './graphql/schemas/query/employee';
import { benefitQueryTypeDefs } from './graphql/schemas/query/benefit';
import { eligibilityRuleQueryTypeDefs } from './graphql/schemas/query/eligibility-rule';

import { employeeMutationTypeDefs } from './graphql/schemas/mutation/employee';
import { benefitMutationTypeDefs } from './graphql/schemas/mutation/benefit';
import { eligibilityRuleMutationTypeDefs } from './graphql/schemas/mutation/eligibility-rule';

import { systemQueryResolvers } from './graphql/resolvers/query/system';
import { employeeQueryResolvers } from './graphql/resolvers/query/employee';
import { benefitQueryResolvers } from './graphql/resolvers/query/benefit';
import { eligibilityRuleQueryResolvers } from './graphql/resolvers/query/eligibility-rule';

import { employeeMutationResolvers } from './graphql/resolvers/mutation/employee';
import { benefitMutationResolvers } from './graphql/resolvers/mutation/benefit';
import { eligibilityRuleMutationResolvers } from './graphql/resolvers/mutation/eligibility-rule';
import { benefitRequestMutationTypeDefs } from './graphql/schemas/mutation/benefit-request';
import { benefitRequestQueryTypeDefs } from './graphql/schemas/query/benefit-request';
import { benefitRequestQueryResolvers } from './graphql/resolvers/query/benefit-request';
import { benefitRequestMutationResolvers } from './graphql/resolvers/mutation/benefit-request';
import { benefitRequestTypeDefs } from './graphql/schemas/types/benefit-request';

type GraphQLContext = Env & YogaInitialContext;

const baseTypeDefs = /* GraphQL */ `
  type Query {
    hello: String
  }

  type Mutation {
    _empty: String
  }
`;

export const schema = createSchema<GraphQLContext>({
  typeDefs: [
    baseTypeDefs,
    employeeTypeDefs,
    benefitTypeDefs,
    eligibilityRuleTypeDefs,
    employeeQueryTypeDefs,
    benefitQueryTypeDefs,
    eligibilityRuleQueryTypeDefs,
    employeeMutationTypeDefs,
    benefitMutationTypeDefs,
    eligibilityRuleMutationTypeDefs,
    benefitRequestTypeDefs,
    benefitRequestQueryTypeDefs,
    benefitRequestMutationTypeDefs,
  ],
  resolvers: {
    Query: {
      ...systemQueryResolvers,
      ...employeeQueryResolvers,
      ...benefitQueryResolvers,
      ...eligibilityRuleQueryResolvers,
      ...benefitRequestQueryResolvers,
    },
    Mutation: {
      ...employeeMutationResolvers,
      ...benefitMutationResolvers,
      ...eligibilityRuleMutationResolvers,
      ...benefitRequestMutationResolvers,
    },
  },
});
