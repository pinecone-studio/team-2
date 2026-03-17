import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Benefit = {
  __typename?: 'Benefit';
  category?: Maybe<Scalars['String']['output']>;
  contractExpiryDate?: Maybe<Scalars['String']['output']>;
  contractUploadedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  r2ObjectKey?: Maybe<Scalars['String']['output']>;
  requiresContract?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<BenefitStatus>;
  subsidyPercent?: Maybe<Scalars['Int']['output']>;
  vendorName?: Maybe<Scalars['String']['output']>;
};

export type BenefitRequest = {
  __typename?: 'BenefitRequest';
  benefitId: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  employeeId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  status?: Maybe<RequestStatus>;
};

export enum BenefitStatus {
  Active = 'ACTIVE',
  Eligible = 'ELIGIBLE',
  Locked = 'LOCKED',
  Pending = 'PENDING',
}

export type CreateBenefitInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  contractExpiryDate?: InputMaybe<Scalars['String']['input']>;
  contractUploadedAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  r2ObjectKey?: InputMaybe<Scalars['String']['input']>;
  requiresContract?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<BenefitStatus>;
  subsidyPercent?: InputMaybe<Scalars['Int']['input']>;
  vendorName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBenefitRequestInput = {
  benefitId: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  employeeId: Scalars['Int']['input'];
  status?: InputMaybe<RequestStatus>;
};

export type CreateEligibilityRuleInput = {
  benefitId: Scalars['Int']['input'];
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  operator?: InputMaybe<Scalars['String']['input']>;
  ruleType?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEmployeeInput = {
  clerkUserId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeRole?: InputMaybe<Scalars['String']['input']>;
  employmentStatus?: InputMaybe<EmploymentStatus>;
  hireDate?: InputMaybe<Scalars['String']['input']>;
  lateArrivalCount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  okrSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  responsibilityLevel?: InputMaybe<Scalars['String']['input']>;
};

export type EligibilityRule = {
  __typename?: 'EligibilityRule';
  benefitId: Scalars['Int']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  operator?: Maybe<Scalars['String']['output']>;
  ruleType?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Employee = {
  __typename?: 'Employee';
  clerkUserId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  employeeRole?: Maybe<Scalars['String']['output']>;
  employmentStatus?: Maybe<EmploymentStatus>;
  hireDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lateArrivalCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  okrSubmitted?: Maybe<Scalars['Boolean']['output']>;
  responsibilityLevel?: Maybe<Scalars['String']['output']>;
};

export enum EmploymentStatus {
  Active = 'ACTIVE',
  Leave = 'LEAVE',
  Probation = 'PROBATION',
  Terminated = 'TERMINATED',
}

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createBenefit: Benefit;
  createBenefitRequest: BenefitRequest;
  createEligibilityRule: EligibilityRule;
  createEmployee: Employee;
  deleteBenefit: Scalars['Boolean']['output'];
  deleteBenefitRequest: Scalars['Boolean']['output'];
  deleteEligibilityRule: Scalars['Boolean']['output'];
  deleteEmployee: Scalars['Boolean']['output'];
  updateBenefit: Benefit;
  updateBenefitRequest: BenefitRequest;
  updateEligibilityRule: EligibilityRule;
  updateEmployee: Employee;
};

export type MutationCreateBenefitArgs = {
  input: CreateBenefitInput;
};

export type MutationCreateBenefitRequestArgs = {
  input: CreateBenefitRequestInput;
};

export type MutationCreateEligibilityRuleArgs = {
  input: CreateEligibilityRuleInput;
};

export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};

export type MutationDeleteBenefitArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteBenefitRequestArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteEligibilityRuleArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteEmployeeArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateBenefitArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBenefitInput;
};

export type MutationUpdateBenefitRequestArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBenefitRequestInput;
};

export type MutationUpdateEligibilityRuleArgs = {
  id: Scalars['Int']['input'];
  input: UpdateEligibilityRuleInput;
};

export type MutationUpdateEmployeeArgs = {
  id: Scalars['Int']['input'];
  input: UpdateEmployeeInput;
};

export type Query = {
  __typename?: 'Query';
  benefitRequests: Array<BenefitRequest>;
  benefitRequestsByBenefit: Array<BenefitRequest>;
  benefitRequestsByEmployee: Array<BenefitRequest>;
  benefits: Array<Benefit>;
  eligibilityRules: Array<EligibilityRule>;
  eligibilityRulesByBenefit: Array<EligibilityRule>;
  employees: Array<Employee>;
  hello?: Maybe<Scalars['String']['output']>;
};

export type QueryBenefitRequestsByBenefitArgs = {
  benefitId: Scalars['Int']['input'];
};

export type QueryBenefitRequestsByEmployeeArgs = {
  employeeId: Scalars['Int']['input'];
};

export type QueryEligibilityRulesByBenefitArgs = {
  benefitId: Scalars['Int']['input'];
};

export enum RequestStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type UpdateBenefitInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  contractExpiryDate?: InputMaybe<Scalars['String']['input']>;
  contractUploadedAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  r2ObjectKey?: InputMaybe<Scalars['String']['input']>;
  requiresContract?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<BenefitStatus>;
  subsidyPercent?: InputMaybe<Scalars['Int']['input']>;
  vendorName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBenefitRequestInput = {
  benefitId?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  employeeId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<RequestStatus>;
};

export type UpdateEligibilityRuleInput = {
  benefitId?: InputMaybe<Scalars['Int']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  operator?: InputMaybe<Scalars['String']['input']>;
  ruleType?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmployeeInput = {
  clerkUserId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeRole?: InputMaybe<Scalars['String']['input']>;
  employmentStatus?: InputMaybe<EmploymentStatus>;
  hireDate?: InputMaybe<Scalars['String']['input']>;
  lateArrivalCount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  okrSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  responsibilityLevel?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBenefitRequestMutationVariables = Exact<{
  input: CreateBenefitRequestInput;
}>;

export type CreateBenefitRequestMutation = {
  __typename?: 'Mutation';
  createBenefitRequest: {
    __typename?: 'BenefitRequest';
    id: number;
    employeeId: number;
    benefitId: number;
    status?: RequestStatus | null;
    createdAt?: string | null;
  };
};

export type DeleteBenefitRequestMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteBenefitRequestMutation = {
  __typename?: 'Mutation';
  deleteBenefitRequest: boolean;
};

export type GetBenefitRequestsQueryVariables = Exact<{ [key: string]: never }>;

export type GetBenefitRequestsQuery = {
  __typename?: 'Query';
  benefitRequests: Array<{
    __typename?: 'BenefitRequest';
    id: number;
    employeeId: number;
    benefitId: number;
    status?: RequestStatus | null;
    createdAt?: string | null;
  }>;
};

export type GetBenefitRequestsByBenefitQueryVariables = Exact<{
  benefitId: Scalars['Int']['input'];
}>;

export type GetBenefitRequestsByBenefitQuery = {
  __typename?: 'Query';
  benefitRequestsByBenefit: Array<{
    __typename?: 'BenefitRequest';
    id: number;
    employeeId: number;
    benefitId: number;
    status?: RequestStatus | null;
    createdAt?: string | null;
  }>;
};

export type GetBenefitRequestsByEmployeeQueryVariables = Exact<{
  employeeId: Scalars['Int']['input'];
}>;

export type GetBenefitRequestsByEmployeeQuery = {
  __typename?: 'Query';
  benefitRequestsByEmployee: Array<{
    __typename?: 'BenefitRequest';
    id: number;
    employeeId: number;
    benefitId: number;
    status?: RequestStatus | null;
    createdAt?: string | null;
  }>;
};

export type UpdateBenefitRequestMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateBenefitRequestInput;
}>;

export type UpdateBenefitRequestMutation = {
  __typename?: 'Mutation';
  updateBenefitRequest: {
    __typename?: 'BenefitRequest';
    id: number;
    employeeId: number;
    benefitId: number;
    status?: RequestStatus | null;
    createdAt?: string | null;
  };
};

export type CreateBenefitMutationVariables = Exact<{
  input: CreateBenefitInput;
}>;

export type CreateBenefitMutation = {
  __typename?: 'Mutation';
  createBenefit: {
    __typename?: 'Benefit';
    id: number;
    name: string;
    category?: string | null;
    description?: string | null;
    subsidyPercent?: number | null;
    vendorName?: string | null;
    requiresContract?: boolean | null;
    isActive?: boolean | null;
    r2ObjectKey?: string | null;
    contractUploadedAt?: string | null;
    contractExpiryDate?: string | null;
  };
};

export type DeleteBenefitMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteBenefitMutation = {
  __typename?: 'Mutation';
  deleteBenefit: boolean;
};

export type GetBenefitsQueryVariables = Exact<{ [key: string]: never }>;

export type GetBenefitsQuery = {
  __typename?: 'Query';
  benefits: Array<{
    __typename?: 'Benefit';
    id: number;
    name: string;
    category?: string | null;
    description?: string | null;
    subsidyPercent?: number | null;
    vendorName?: string | null;
    requiresContract?: boolean | null;
    isActive?: boolean | null;
    r2ObjectKey?: string | null;
    contractUploadedAt?: string | null;
    contractExpiryDate?: string | null;
  }>;
};

export type UpdateBenefitMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateBenefitInput;
}>;

export type UpdateBenefitMutation = {
  __typename?: 'Mutation';
  updateBenefit: {
    __typename?: 'Benefit';
    id: number;
    name: string;
    category?: string | null;
    description?: string | null;
    subsidyPercent?: number | null;
    vendorName?: string | null;
    requiresContract?: boolean | null;
    isActive?: boolean | null;
    r2ObjectKey?: string | null;
    contractUploadedAt?: string | null;
    contractExpiryDate?: string | null;
  };
};

export type CreateEligibilityRuleMutationVariables = Exact<{
  input: CreateEligibilityRuleInput;
}>;

export type CreateEligibilityRuleMutation = {
  __typename?: 'Mutation';
  createEligibilityRule: {
    __typename?: 'EligibilityRule';
    id: number;
    benefitId: number;
    ruleType?: string | null;
    operator?: string | null;
    value?: string | null;
    errorMessage?: string | null;
    isActive?: boolean | null;
  };
};

export type DeleteEligibilityRuleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteEligibilityRuleMutation = {
  __typename?: 'Mutation';
  deleteEligibilityRule: boolean;
};

export type GetEligibilityRulesQueryVariables = Exact<{ [key: string]: never }>;

export type GetEligibilityRulesQuery = {
  __typename?: 'Query';
  eligibilityRules: Array<{
    __typename?: 'EligibilityRule';
    id: number;
    benefitId: number;
    ruleType?: string | null;
    operator?: string | null;
    value?: string | null;
    errorMessage?: string | null;
    isActive?: boolean | null;
  }>;
};

export type GetEligibilityRulesByBenefitQueryVariables = Exact<{
  benefitId: Scalars['Int']['input'];
}>;

export type GetEligibilityRulesByBenefitQuery = {
  __typename?: 'Query';
  eligibilityRulesByBenefit: Array<{
    __typename?: 'EligibilityRule';
    id: number;
    benefitId: number;
    ruleType?: string | null;
    operator?: string | null;
    value?: string | null;
    errorMessage?: string | null;
    isActive?: boolean | null;
  }>;
};

export type UpdateEligibilityRuleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateEligibilityRuleInput;
}>;

export type UpdateEligibilityRuleMutation = {
  __typename?: 'Mutation';
  updateEligibilityRule: {
    __typename?: 'EligibilityRule';
    id: number;
    benefitId: number;
    ruleType?: string | null;
    operator?: string | null;
    value?: string | null;
    errorMessage?: string | null;
    isActive?: boolean | null;
  };
};

export type CreateEmployeeMutationVariables = Exact<{
  input: CreateEmployeeInput;
}>;

export type CreateEmployeeMutation = {
  __typename?: 'Mutation';
  createEmployee: {
    __typename?: 'Employee';
    id: String;
    email?: string | null;
    name?: string | null;
    employeeRole?: string | null;
    department?: string | null;
    responsibilityLevel?: string | null;
    employmentStatus?: EmploymentStatus | null;
    hireDate?: string | null;
    okrSubmitted?: boolean | null;
    lateArrivalCount?: number | null;
    createdAt?: string | null;
    clerkUserId?: string | null;
  };
};

export type DeleteEmployeeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteEmployeeMutation = {
  __typename?: 'Mutation';
  deleteEmployee: boolean;
};

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetEmployeesQuery = {
  __typename?: 'Query';
  employees: Array<{
    __typename?: 'Employee';
    id: string;
    email?: string | null;
    name?: string | null;
    employeeRole?: string | null;
    department?: string | null;
    responsibilityLevel?: string | null;
    employmentStatus?: EmploymentStatus | null;
    hireDate?: string | null;
    okrSubmitted?: boolean | null;
    lateArrivalCount?: number | null;
    createdAt?: string | null;
    clerkUserId?: string | null;
  }>;
};

export type UpdateEmployeeMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateEmployeeInput;
}>;

export type UpdateEmployeeMutation = {
  __typename?: 'Mutation';
  updateEmployee: {
    __typename?: 'Employee';
    id: string;
    email?: string | null;
    name?: string | null;
    employeeRole?: string | null;
    department?: string | null;
    responsibilityLevel?: string | null;
    employmentStatus?: EmploymentStatus | null;
    hireDate?: string | null;
    okrSubmitted?: boolean | null;
    lateArrivalCount?: number | null;
    createdAt?: string | null;
    clerkUserId?: string | null;
  };
};

export const CreateBenefitRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateBenefitRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateBenefitRequestInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBenefitRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'employeeId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateBenefitRequestMutation,
  CreateBenefitRequestMutationVariables
>;
export const DeleteBenefitRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteBenefitRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteBenefitRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteBenefitRequestMutation,
  DeleteBenefitRequestMutationVariables
>;
export const GetBenefitRequestsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBenefitRequests' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'benefitRequests' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'employeeId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBenefitRequestsQuery,
  GetBenefitRequestsQueryVariables
>;
export const GetBenefitRequestsByBenefitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBenefitRequestsByBenefit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'benefitId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'benefitRequestsByBenefit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'benefitId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'benefitId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'employeeId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBenefitRequestsByBenefitQuery,
  GetBenefitRequestsByBenefitQueryVariables
>;
export const GetBenefitRequestsByEmployeeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBenefitRequestsByEmployee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'employeeId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'benefitRequestsByEmployee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'employeeId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'employeeId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'employeeId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBenefitRequestsByEmployeeQuery,
  GetBenefitRequestsByEmployeeQueryVariables
>;
export const UpdateBenefitRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateBenefitRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateBenefitRequestInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateBenefitRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'employeeId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateBenefitRequestMutation,
  UpdateBenefitRequestMutationVariables
>;
export const CreateBenefitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateBenefit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateBenefitInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBenefit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subsidyPercent' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'vendorName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'requiresContract' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
                { kind: 'Field', name: { kind: 'Name', value: 'r2ObjectKey' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractUploadedAt' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractExpiryDate' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateBenefitMutation,
  CreateBenefitMutationVariables
>;
export const DeleteBenefitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteBenefit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteBenefit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteBenefitMutation,
  DeleteBenefitMutationVariables
>;
export const GetBenefitsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBenefits' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'benefits' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subsidyPercent' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'vendorName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'requiresContract' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
                { kind: 'Field', name: { kind: 'Name', value: 'r2ObjectKey' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractUploadedAt' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractExpiryDate' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBenefitsQuery, GetBenefitsQueryVariables>;
export const UpdateBenefitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateBenefit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateBenefitInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateBenefit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subsidyPercent' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'vendorName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'requiresContract' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
                { kind: 'Field', name: { kind: 'Name', value: 'r2ObjectKey' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractUploadedAt' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractExpiryDate' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateBenefitMutation,
  UpdateBenefitMutationVariables
>;
export const CreateEligibilityRuleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateEligibilityRule' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateEligibilityRuleInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createEligibilityRule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ruleType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'operator' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errorMessage' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateEligibilityRuleMutation,
  CreateEligibilityRuleMutationVariables
>;
export const DeleteEligibilityRuleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteEligibilityRule' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteEligibilityRule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteEligibilityRuleMutation,
  DeleteEligibilityRuleMutationVariables
>;
export const GetEligibilityRulesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEligibilityRules' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'eligibilityRules' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ruleType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'operator' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errorMessage' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetEligibilityRulesQuery,
  GetEligibilityRulesQueryVariables
>;
export const GetEligibilityRulesByBenefitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEligibilityRulesByBenefit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'benefitId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'eligibilityRulesByBenefit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'benefitId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'benefitId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ruleType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'operator' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errorMessage' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetEligibilityRulesByBenefitQuery,
  GetEligibilityRulesByBenefitQueryVariables
>;
export const UpdateEligibilityRuleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateEligibilityRule' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateEligibilityRuleInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateEligibilityRule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'benefitId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ruleType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'operator' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errorMessage' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateEligibilityRuleMutation,
  UpdateEligibilityRuleMutationVariables
>;
export const CreateEmployeeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateEmployee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateEmployeeInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createEmployee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'employeeRole' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'department' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'responsibilityLevel' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'employmentStatus' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'hireDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'okrSubmitted' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lateArrivalCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'clerkUserId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateEmployeeMutation,
  CreateEmployeeMutationVariables
>;
export const DeleteEmployeeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteEmployee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteEmployee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteEmployeeMutation,
  DeleteEmployeeMutationVariables
>;
export const GetEmployeesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEmployees' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'employees' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'employeeRole' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'department' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'responsibilityLevel' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'employmentStatus' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'hireDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'okrSubmitted' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lateArrivalCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'clerkUserId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEmployeesQuery, GetEmployeesQueryVariables>;
export const UpdateEmployeeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateEmployee' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateEmployeeInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateEmployee' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'employeeRole' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'department' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'responsibilityLevel' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'employmentStatus' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'hireDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'okrSubmitted' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lateArrivalCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'clerkUserId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateEmployeeMutation,
  UpdateEmployeeMutationVariables
>;
