export const employeeTypeDefs = /* GraphQL */ `
  type Employee {
    id: Int!
    email: String
    name: String
    employeeRole: String
    department: String
    responsibilityLevel: String
    employmentStatus: String
    hireDate: String
    okrSubmitted: Boolean
    lateArrivalCount: Int
    createdAt: String
    clerkUserId: String
  }

  input CreateEmployeeInput {
    email: String
    name: String
    employeeRole: String
    department: String
    responsibilityLevel: String
    employmentStatus: String
    hireDate: String
    okrSubmitted: Boolean
    lateArrivalCount: Int
    createdAt: String
    clerkUserId: String
  }

  input UpdateEmployeeInput {
    email: String
    name: String
    employeeRole: String
    department: String
    responsibilityLevel: String
    employmentStatus: String
    hireDate: String
    okrSubmitted: Boolean
    lateArrivalCount: Int
    createdAt: String
    clerkUserId: String
  }
`;
