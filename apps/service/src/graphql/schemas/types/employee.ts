export const employeeTypeDefs = /* GraphQL */ `
  type Employee {
    id: ID!
    email: String
    name: String
    role: String
    department: String
    responsibilityLevel: Int
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
    role: String
    department: String
    responsibilityLevel: Int
    employmentStatus: String
    hireDate: String
    okrSubmitted: Boolean
    lateArrivalCount: Int
    createdAt: String
    clerkUserId: String
  }
`;
