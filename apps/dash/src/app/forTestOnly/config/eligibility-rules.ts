/* eslint-disable @typescript-eslint/consistent-type-imports, max-lines */

import { EligibilityConfig } from '../types/benefits.types';

/* eslint-disable camelcase */
export const eligibilityConfig: EligibilityConfig = {
  benefits: {
    gym_pinefit: {
      name: 'Gym — PineFit 50%',
      category: 'wellness',
      subsidyPercent: 50,
      requiresContract: true,
      rules: [
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Not available during probation or leave.',
        },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'Submit your Q[current] OKR to unlock this benefit.',
        },
        {
          type: 'attendance',
          operator: 'lt',
          value: 3,
          errorMessage: 'Attendance threshold exceeded this month.',
        },
        {
          type: 'days_since_hire',
          operator: 'gte',
          value: 500,
          errorMessage: 'Available after 3 months of employment.',
        },
      ],
    },
    private_insurance: {
      name: 'Private Insurance 50%',
      category: 'wellness',
      subsidyPercent: 50,
      requiresContract: false,
      rules: [
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Not available during probation or leave.',
        },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'Submit your Q[current] OKR to unlock this benefit.',
        },
        {
          type: 'attendance',
          operator: 'lt',
          value: 3,
          errorMessage: 'Attendance threshold exceeded this month.',
        },
      ],
    },
    digital_wellness: {
      name: 'Digital Wellness',
      category: 'wellness',
      subsidyPercent: 100,
      requiresContract: false,
      rules: [], // Core benefit — no gates
    },
    macbook: {
      name: 'MacBook 50%',
      category: 'equipment',
      subsidyPercent: 50,
      requiresContract: false,
      rules: [
        {
          type: 'days_since_hire',
          operator: 'gte',
          value: 180,
          errorMessage: 'Available after 6 months of employment.',
        },
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Not available during probation or leave.',
        },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'Submit your Q[current] OKR to unlock this benefit.',
        },
        { type: 'responsibility_level', operator: 'gte', value: 1 },
      ],
    },
    extra_responsibility: {
      name: 'Extra Responsibility',
      category: 'career',
      rules: [
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Not available during probation.',
        },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'OKR submission required.',
        },
        {
          type: 'attendance',
          operator: 'lt',
          value: 3,
          errorMessage: 'Attendance threshold exceeded.',
        },
        {
          type: 'responsibility_level',
          operator: 'gte',
          value: 2,
          errorMessage: 'Requires Senior level (Level 2+).',
        },
      ],
    },
    ux_engineer_tools: {
      name: 'UX Engineer Tools',
      category: 'career',
      subsidyPercent: 100,
      requiresContract: false,
      rules: [
        {
          type: 'role',
          operator: 'eq',
          value: 'ux_engineer',
          errorMessage: 'Available to UX/Design role only.',
        },
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Active employment required.',
        },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'OKR submission required.',
        },
      ],
    },
    down_payment_assistance: {
      name: 'Down Payment Assistance',
      category: 'financial',
      requiresContract: false,
      rules: [
        {
          type: 'days_since_hire',
          operator: 'gte',
          value: 730,
          errorMessage: 'Available after 2 years of employment.',
        },
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Active employment required.',
        },
        {
          type: 'responsibility_level',
          operator: 'gte',
          value: 2,
          errorMessage: 'Requires Senior level (Level 2+).',
        },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'OKR submission required.',
        },
        {
          type: 'finance_approval',
          operator: 'eq',
          value: true,
          errorMessage: 'Pending Finance approval.',
        },
      ],
    },
    shit_happened_days: {
      name: 'Shit Happened Days',
      category: 'flexibility',
      requiresContract: false,
      rules: [
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Probation allocation: 1 day maximum.',
        },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'Submit OKR for full allocation.',
        },
      ],
    },
    remote_work: {
      name: 'Remote Work',
      category: 'flexibility',
      requiresContract: false,
      rules: [
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Not available during probation.',
        },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'OKR submission required.',
        },
        {
          type: 'attendance',
          operator: 'lt',
          value: 3,
          errorMessage: 'Attendance threshold exceeded.',
        },
      ],
    },
    travel: {
      name: 'Travel 50%',
      category: 'flexibility',
      subsidyPercent: 50,
      requiresContract: false,
      rules: [
        {
          type: 'days_since_hire',
          operator: 'gte',
          value: 365,
          errorMessage: 'Available after 12 months of employment.',
        },
        { type: 'responsibility_level', operator: 'gte', value: 1 },
        {
          type: 'okr_submitted',
          operator: 'eq',
          value: true,
          errorMessage: 'OKR submission required.',
        },
        {
          type: 'manager_pre_approval',
          operator: 'eq',
          value: true,
          errorMessage: 'Awaiting manager pre-approval.',
        },
      ],
    },
    bonus_okr: {
      name: 'Bonus Based on OKR',
      category: 'financial',
      requiresContract: false,
      rules: [
        {
          type: 'okr_score',
          operator: 'gte',
          value: 70,
          errorMessage: 'OKR not submitted or score below threshold.',
        },
        {
          type: 'attendance',
          operator: 'lt',
          value: 3,
          errorMessage: 'Attendance threshold exceeded.',
        },
        {
          type: 'employment_status',
          operator: 'eq',
          value: 'active',
          errorMessage: 'Active employment required.',
        },
        {
          type: 'finance_approval',
          operator: 'eq',
          value: true,
          errorMessage: 'Pending Finance processing.',
        },
      ],
    },
  },
};
/* eslint-enable camelcase */
