'use client';

import { useCallback, useEffect, useState } from 'react';
import { gqlRequest } from '@/graphql/helpers/graphql-client';
import {
  GetBenefitsDocument,
  GetEligibilityRulesByBenefitDocument,
  CreateEligibilityRuleDocument,
  UpdateEligibilityRuleDocument,
  DeleteEligibilityRuleDocument,
} from '@/graphql/generated/graphql';
import type { EligibilityRule } from '@/graphql/generated/graphql';

export type RuleRow = {
  id?: number;
  ruleType: string;
  operator: string;
  value: string;
  errorMessage: string;
  isActive: boolean;
};

const DEFAULT_ROW = { ruleType: '', operator: '', value: '', errorMessage: '', isActive: true };
const orEmpty = (s?: string | null) => s ?? '';

const mapToRuleRow = (r: EligibilityRule): RuleRow => ({
  id: r.id,
  ruleType: orEmpty(r.ruleType),
  operator: orEmpty(r.operator),
  value: orEmpty(r.value),
  errorMessage: orEmpty(r.errorMessage),
  isActive: r.isActive ?? true,
});

export function useRuleConfiguration() {
  const [benefits, setBenefits] = useState<{ id: number; name: string }[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rules, setRules] = useState<RuleRow[]>([]);
  const [initialRules, setInitialRules] = useState<RuleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const { eligibilityRulesByBenefit: r } = await gqlRequest(GetEligibilityRulesByBenefitDocument, { benefitId: id });
      const rows = (r ?? []).map(mapToRuleRow);
      setRules(rows);
      setInitialRules(rows);
    } catch {
      setError('Failed to load rules');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gqlRequest(GetBenefitsDocument).then(d => 
      setBenefits((d.benefits ?? []).map(b => ({ id: b.id, name: b.name }))
    )).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedId) fetchRules(selectedId);
  }, [selectedId, fetchRules]);

  const removeRow = (i: number) => setRules(p => p.filter((_, idx) => idx !== i));
  
  const updateRule = (i: number, f: keyof RuleRow, v: string | boolean) => setRules(p => {
    if (i < p.length) return p.map((r, idx) => (idx === i ? { ...r, [f]: v } : r));
    return [...p, { ...DEFAULT_ROW, [f]: v }];
  });

  const addRow = () => setRules(p => [...p, { ...DEFAULT_ROW, isActive: false }]);

  const syncDeleted = async (currIds: Set<number>, initIds: Set<number>) => {
    const toDelete = Array.from(initIds).filter(id => !currIds.has(id));
    for (const id of toDelete) {
      await gqlRequest(DeleteEligibilityRuleDocument, { id });
    }
  };

  const syncUpsert = async (benefitId: number) => {
    for (const rule of rules) {
      const input = { ...rule, id: undefined };
      if (rule.id) {
        await gqlRequest(UpdateEligibilityRuleDocument, { id: rule.id, input });
      } else {
        await gqlRequest(CreateEligibilityRuleDocument, { input: { ...input, benefitId } });
      }
    }
  };

  const publish = async () => {
    if (!selectedId) return;
    setPublishing(true);
    try {
      const getIds = (arr: RuleRow[]) => new Set(arr.map(r => r.id).filter((id): id is number => id != null));
      await syncDeleted(getIds(rules), getIds(initialRules));
      await syncUpsert(selectedId);
      await fetchRules(selectedId);
    } catch {
      setError('Failed to publish rules');
    } finally {
      setPublishing(false);
    }
  };

  const hasChanges = JSON.stringify(rules.map(r => ({ ...r, id: 0 }))) !== JSON.stringify(initialRules.map(r => ({ ...r, id: 0 })));

  return { benefits, selectedId, setSelectedId, rules, loading, publishing, error, hasChanges, updateRule, addRow, removeRow, discard: () => setRules(initialRules), publish };
}
