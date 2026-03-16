export const employeeTypeDefs = /* GraphQL */ `
  enum EmploymentStatus {
    ACTIVE
    PROBATION
    LEAVE
    TERMINATED
  }

  type Employee {
    id: Int!
    email: String
    name: String
    employeeRole: String
    department: String
    responsibilityLevel: String
    employmentStatus: EmploymentStatus
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
    employmentStatus: EmploymentStatus
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
    employmentStatus: EmploymentStatus
    hireDate: String
    okrSubmitted: Boolean
    lateArrivalCount: Int
    createdAt: String
    clerkUserId: String
  }
`;
