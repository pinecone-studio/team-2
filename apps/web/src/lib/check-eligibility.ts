import type {
  GetEligibilityRulesByBenefitQuery,
  GetEmployeesQuery,
} from '../graphql/generated/graphql';

type Employee = GetEmployeesQuery['employees'][number];
type Rule =
  GetEligibilityRulesByBenefitQuery['eligibilityRulesByBenefit'][number];

export type EligibilityResult = {
  eligible: boolean;
  errors: string[];
};

const FIELD_MAP: Record<string, keyof Employee> = {
  department: 'department',
  responsibility_level: 'responsibilityLevel',
  employment_status: 'employmentStatus',
  hire_date: 'hireDate',
  okr_submitted: 'okrSubmitted',
  late_arrival_count: 'lateArrivalCount',
  employee_role: 'employeeRole',
};

function getEmployeeValue(
  employee: Employee | null | undefined,
  ruleType: string,
) {
  if (!employee) return undefined;

  const field = FIELD_MAP[ruleType.toLowerCase()];
  if (!field) return undefined;

  return employee[field];
}

function evaluateRule(
  employeeValue: unknown,
  operator: string,
  ruleValue: string,
): boolean {
  const empStr = String(employeeValue ?? '')
    .toLowerCase()
    .trim();
  const ruleStr = ruleValue.toLowerCase().trim();
  const empNum = parseFloat(empStr);
  const ruleNum = parseFloat(ruleStr);

  switch (operator.toLowerCase()) {
    case 'equals':
    case '==':
    case 'eq':
      return empStr === ruleStr;
    case 'not_equals':
    case '!=':
    case 'neq':
      return empStr !== ruleStr;
    case 'gte':
    case '>=':
      return (
        !Number.isNaN(empNum) && !Number.isNaN(ruleNum) && empNum >= ruleNum
      );
    case 'lte':
    case '<=':
      return (
        !Number.isNaN(empNum) && !Number.isNaN(ruleNum) && empNum <= ruleNum
      );
    case 'gt':
    case '>':
      return (
        !Number.isNaN(empNum) && !Number.isNaN(ruleNum) && empNum > ruleNum
      );
    case 'lt':
    case '<':
      return (
        !Number.isNaN(empNum) && !Number.isNaN(ruleNum) && empNum < ruleNum
      );
    case 'contains':
      return empStr.includes(ruleStr);
    case 'not_contains':
      return !empStr.includes(ruleStr);
    default:
      return false;
  }
}

export function checkEligibility(
  employee: Employee | null | undefined,
  rules: Rule[],
): EligibilityResult {
  if (!employee) {
    return {
      eligible: false,
      errors: ['Employee profile not found'],
    };
  }

  const activeRules = rules.filter((r) => r.isActive);

  if (activeRules.length === 0) {
    return { eligible: true, errors: [] };
  }

  const errors: string[] = [];

  for (const rule of activeRules) {
    if (!rule.ruleType || !rule.operator || rule.value == null) continue;

    const employeeValue = getEmployeeValue(employee, rule.ruleType);
    const passes = evaluateRule(employeeValue, rule.operator, rule.value);

    if (!passes) {
      errors.push(
        rule.errorMessage ??
          `${rule.ruleType} ${rule.operator} ${rule.value} — not met`,
      );
    }
  }

  return { eligible: errors.length === 0, errors };
}
