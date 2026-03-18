// 'use client';

// import { useEffect, useState } from 'react';

// type Employee = {
//   department: string | null;
// };

// type GraphqlResponse = {
//   employees: Employee[];
// };

// type BreakdownItem = {
//   name: string;
//   value: number;
//   color: string;
// };

// const GRAPHQL_URL = 'https://team-service.nbhishgee22.workers.dev/api/graphql';

// const GET_EMPLOYEE_DEPARTMENTS = `
//   query {
//     employees {
//       department
//     }
//   }
// `;

// const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#6B7280'];

// type GraphqlError = {
//   message?: string;
// };

// type GraphqlJson<T> = {
//   data: T;
//   errors?: GraphqlError[];
// };

// function validateResponse(response: Response) {
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }
// }

// function validateGraphqlErrors(errors?: GraphqlError[]) {
//   if (errors && errors.length > 0) {
//     throw new Error(errors[0].message || 'GraphQL error');
//   }
// }

// async function parseGraphqlJson<T>(
//   response: Response,
// ): Promise<GraphqlJson<T>> {
//   return response.json() as Promise<GraphqlJson<T>>;
// }

// async function graphqlFetch<T>(query: string): Promise<T> {
//   const response = await fetch(GRAPHQL_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ query }),
//     cache: 'no-store',
//   });

//   validateResponse(response);

//   const json = await parseGraphqlJson<T>(response);
//   validateGraphqlErrors(json.errors);

//   return json.data;
// }

// function getDepartmentName(employee: Employee) {
//   return employee.department?.trim() || 'Unknown';
// }

// function groupDepartments(employees: Employee[]) {
//   const grouped: Record<string, number> = {};

//   for (const employee of employees) {
//     const department = getDepartmentName(employee);
//     grouped[department] = (grouped[department] || 0) + 1;
//   }

//   return grouped;
// }

// function mapBreakdownItems(
//   grouped: Record<string, number>,
//   total: number,
// ): BreakdownItem[] {
//   return Object.entries(grouped)
//     .map(([name, count], index) => ({
//       name,
//       value: Math.round((count / total) * 100),
//       color: COLORS[index % COLORS.length],
//     }))
//     .sort((a, b) => b.value - a.value);
// }

// function getDepartmentBreakdown(employees: Employee[]): BreakdownItem[] {
//   if (employees.length === 0) {
//     return [];
//   }

//   const grouped = groupDepartments(employees);
//   return mapBreakdownItems(grouped, employees.length);
// }

// async function fetchEmployeeBreakdown(): Promise<BreakdownItem[]> {
//   const result = await graphqlFetch<GraphqlResponse>(GET_EMPLOYEE_DEPARTMENTS);
//   return getDepartmentBreakdown(result.employees ?? []);
// }

// export function useEmployeeBreakdown() {
//   const [data, setData] = useState<BreakdownItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchEmployeeBreakdown()
//       .then((result) => {
//         setData(result);
//         setError('');
//       })
//       .catch((err: unknown) => {
//         setError(err instanceof Error ? err.message : 'Something went wrong');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return { data, loading, error };
// }

'use client';

import { useEffect, useState } from 'react';

type Employee = {
  department: string | null;
};

type GraphqlResponse = {
  employees: Employee[];
};

type BreakdownItem = {
  name: string;
  value: number;
  color: string;
};

const GRAPHQL_URL = 'https://team-service.nbhishgee22.workers.dev/api/graphql';

const GET_EMPLOYEE_DEPARTMENTS = `
  query {
    employees {
      department
    }
  }
`;

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#6B7280'];

type GraphqlError = {
  message?: string;
};

type GraphqlJson<T> = {
  data: T;
  errors?: GraphqlError[];
};

function validateResponse(response: Response) {
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
}

function validateGraphqlErrors(errors?: GraphqlError[]) {
  if (errors && errors.length > 0) {
    throw new Error(errors[0].message || 'GraphQL error');
  }
}

async function parseGraphqlJson<T>(
  response: Response,
): Promise<GraphqlJson<T>> {
  return response.json() as Promise<GraphqlJson<T>>;
}

async function graphqlFetch<T>(query: string): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  });

  validateResponse(response);

  const json = await parseGraphqlJson<T>(response);
  validateGraphqlErrors(json.errors);

  return json.data;
}

function getDepartmentName(employee: Employee) {
  return employee.department?.trim() || 'Unknown';
}

function groupDepartments(employees: Employee[]) {
  const grouped: Record<string, number> = {};

  for (const employee of employees) {
    const department = getDepartmentName(employee);
    grouped[department] = (grouped[department] || 0) + 1;
  }

  return grouped;
}

function mapBreakdownItems(
  grouped: Record<string, number>,
  total: number,
): BreakdownItem[] {
  return Object.entries(grouped)
    .map(([name, count], index) => ({
      name,
      value: Math.round((count / total) * 100),
      color: COLORS[index % COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);
}

function getDepartmentBreakdown(employees: Employee[]): BreakdownItem[] {
  if (employees.length === 0) {
    return [];
  }

  const grouped = groupDepartments(employees);
  return mapBreakdownItems(grouped, employees.length);
}

async function fetchEmployeeBreakdown(): Promise<BreakdownItem[]> {
  const result = await graphqlFetch<GraphqlResponse>(GET_EMPLOYEE_DEPARTMENTS);
  return getDepartmentBreakdown(result.employees ?? []);
}

export function useEmployeeBreakdown() {
  const [data, setData] = useState<BreakdownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployeeBreakdown()
      .then((result) => {
        setData(result);
        setError('');
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
