export type Operator = 'eq' | 'lt' | 'lte' | 'gt' | 'gte';

export type RuleType =
  | 'employment_status'
  | 'okr_submitted'
  | 'attendance'
  | 'responsibility_level'
  | 'days_since_hire'
  | 'role'
  | 'finance_approval'
  | 'manager_pre_approval'
  | 'okr_score';

export interface EligibilityRule {
  type: RuleType;
  operator: Operator;
  value: string | number | boolean;
  errorMessage?: string;
}

export interface Benefit {
  name: string;
  category: 'wellness' | 'equipment' | 'career' | 'financial' | 'flexibility';
  subsidyPercent?: number;
  requiresContract?: boolean;
  rules: EligibilityRule[];
}

export interface EligibilityConfig {
  benefits: Record<string, Benefit>;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  responsibility_level: number;
  employment_status: 'active' | 'probation' | 'leave' | 'terminated';
  days_since_hire: number;
  okr_submitted: boolean;
  okr_score?: number;
  attendance: number; // late_arrival_count
  finance_approval?: boolean;
  manager_pre_approval?: boolean;
}

export interface EligibilityResult {
  benefitKey: string;
  benefitName: string;
  eligible: boolean;
  errors: string[];
}
