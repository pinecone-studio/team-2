import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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
  subsidyPercent?: Maybe<Scalars['Int']['output']>;
  vendorName?: Maybe<Scalars['String']['output']>;
};

export type BenefitRequest = {
  __typename?: 'BenefitRequest';
  benefitId: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  employeeId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  status?: Maybe<Scalars['String']['output']>;
};

export type CreateBenefitInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  contractExpiryDate?: InputMaybe<Scalars['String']['input']>;
  contractUploadedAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  r2ObjectKey?: InputMaybe<Scalars['String']['input']>;
  requiresContract?: InputMaybe<Scalars['Boolean']['input']>;
  subsidyPercent?: InputMaybe<Scalars['Int']['input']>;
  vendorName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBenefitRequestInput = {
  benefitId: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  employeeId: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
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
  employmentStatus?: InputMaybe<Scalars['String']['input']>;
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
  employmentStatus?: Maybe<Scalars['String']['output']>;
  hireDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lateArrivalCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  okrSubmitted?: Maybe<Scalars['Boolean']['output']>;
  responsibilityLevel?: Maybe<Scalars['String']['output']>;
};

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

export type UpdateEmployeeInput = {
  clerkUserId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeRole?: InputMaybe<Scalars['String']['input']>;
  employmentStatus?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['String']['input']>;
  lateArrivalCount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  okrSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  responsibilityLevel?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEmployeeMutationVariables = Exact<{
  input: CreateEmployeeInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: { __typename?: 'Employee', id: number, email?: string | null, name?: string | null, employeeRole?: string | null, department?: string | null, responsibilityLevel?: string | null, employmentStatus?: string | null, hireDate?: string | null, okrSubmitted?: boolean | null, lateArrivalCount?: number | null, createdAt?: string | null, clerkUserId?: string | null } };

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeesQuery = { __typename?: 'Query', employees: Array<{ __typename?: 'Employee', id: number, email?: string | null, name?: string | null, employeeRole?: string | null, department?: string | null, responsibilityLevel?: string | null, employmentStatus?: string | null, hireDate?: string | null, okrSubmitted?: boolean | null, lateArrivalCount?: number | null, createdAt?: string | null, clerkUserId?: string | null }> };


export const CreateEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEmployeeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"employeeRole"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"responsibilityLevel"}},{"kind":"Field","name":{"kind":"Name","value":"employmentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"hireDate"}},{"kind":"Field","name":{"kind":"Name","value":"okrSubmitted"}},{"kind":"Field","name":{"kind":"Name","value":"lateArrivalCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"clerkUserId"}}]}}]}}]} as unknown as DocumentNode<CreateEmployeeMutation, CreateEmployeeMutationVariables>;
export const GetEmployeesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEmployees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"employeeRole"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"responsibilityLevel"}},{"kind":"Field","name":{"kind":"Name","value":"employmentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"hireDate"}},{"kind":"Field","name":{"kind":"Name","value":"okrSubmitted"}},{"kind":"Field","name":{"kind":"Name","value":"lateArrivalCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"clerkUserId"}}]}}]}}]} as unknown as DocumentNode<GetEmployeesQuery, GetEmployeesQueryVariables>;