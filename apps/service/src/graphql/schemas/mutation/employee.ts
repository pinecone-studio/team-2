export const employeeMutationTypeDefs = /* GraphQL */ `
  extend type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    deleteEmployee(id: Int!): Boolean!
    updateEmployee(id: Int!, input: UpdateEmployeeInput!): Employee!
  }
`;
