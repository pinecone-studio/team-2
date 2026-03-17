import type { GetEmployeesQuery } from '../../../../graphql/generated/graphql';
import { GetEmployeesDocument } from '../../../../graphql/generated/graphql';
import { gqlRequest } from '../../../../graphql/helpers/graphql-client';

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
