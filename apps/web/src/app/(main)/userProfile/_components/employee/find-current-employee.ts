import type { GetEmployeesQuery } from 'apps/web/src/graphql/generated/graphql';
import { GetEmployeesDocument } from 'apps/web/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/web/src/graphql/helpers/graphql-client';

type Employee = GetEmployeesQuery['employees'][number];

export async function findCurrentEmployee(
  clerkUserId: string,
): Promise<Employee | null> {
  const data = await gqlRequest(GetEmployeesDocument);

  return (
    data.employees.find((employee) => employee.clerkUserId === clerkUserId) ??
    null
  );
}
