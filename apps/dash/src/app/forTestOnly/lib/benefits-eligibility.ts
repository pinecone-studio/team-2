import type {
  Employee,
  EligibilityResult,
  EligibilityRule,
} from '../types/benefits.types';
import { eligibilityConfig } from '../config/eligibility-rules';

// Evaluates a single rule against an employee
// eslint-disable-next-line complexity
function evaluateRule(employee: Employee, rule: EligibilityRule): boolean {
  const employeeValue = employee[rule.type as keyof Employee];
  const ruleValue = rule.value;

  switch (rule.operator) {
    case 'eq':
      return employeeValue === ruleValue;
    case 'lt':
      return (employeeValue as number) < (ruleValue as number);
    case 'lte':
      return (employeeValue as number) <= (ruleValue as number);
    case 'gt':
      return (employeeValue as number) > (ruleValue as number);
    case 'gte':
      return (employeeValue as number) >= (ruleValue as number);
    default:
      return false;
  }
}

// Check a single benefit for an employee
// eslint-disable-next-line complexity
export function checkBenefitEligibility(
  employee: Employee,
  benefitKey: string,
): EligibilityResult {
  const benefit = eligibilityConfig.benefits[benefitKey];

  if (!benefit) {
    return {
      benefitKey,
      benefitName: 'Unknown',
      eligible: false,
      errors: ['Benefit not found.'],
    };
  }

  // Core benefit with no rules — always eligible
  if (benefit.rules.length === 0) {
    return {
      benefitKey,
      benefitName: benefit.name,
      eligible: true,
      errors: [],
    };
  }

  const errors: string[] = [];

  for (const rule of benefit.rules) {
    const passed = evaluateRule(employee, rule);
    if (!passed && rule.errorMessage) {
      errors.push(rule.errorMessage);
    }
  }

  return {
    benefitKey,
    benefitName: benefit.name,
    eligible: errors.length === 0,
    errors,
  };
}

// Check all benefits for an employee
export function checkAllBenefits(employee: Employee): EligibilityResult[] {
  return Object.keys(eligibilityConfig.benefits).map((benefitKey) =>
    checkBenefitEligibility(employee, benefitKey),
  );
}

// Get only eligible benefits
export function getEligibleBenefits(employee: Employee): EligibilityResult[] {
  return checkAllBenefits(employee).filter((result) => result.eligible);
}

// Get only ineligible benefits with their blocking reasons
export function getIneligibleBenefits(employee: Employee): EligibilityResult[] {
  return checkAllBenefits(employee).filter((result) => !result.eligible);
}
