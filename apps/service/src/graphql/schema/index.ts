import { mergeTypeDefs } from '@graphql-tools/merge';
import { benefitTypeDefs } from './benefit.schema';
import { employeeTypeDefs } from './employee.schema';
import { contractTypeDefs } from './contract.schema';
import { auditTypeDefs } from './audit.schema';
import { rootTypeDefs } from './query-mutation.schema';

export const typeDefs = mergeTypeDefs([
  employeeTypeDefs,
  benefitTypeDefs,
  contractTypeDefs,
  auditTypeDefs,
  rootTypeDefs,
]);
