'use client';

import { useState } from 'react';
import { gqlRequest } from '../../graphql/helpers/graphql-client';
import {
  CreateBenefitDocument,
  GetBenefitsDocument,
  type CreateBenefitMutationVariables,
  type GetBenefitsQuery,
} from '../../graphql/generated/graphql';

function emptyToUndefined(v: string) {
  const t = v.trim();
  return t === '' ? undefined : t;
}

export default function BenefitTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [benefits, setBenefits] = useState<GetBenefitsQuery['benefits']>([]);

  const [form, setForm] = useState<CreateBenefitMutationVariables['input']>({
    name: '',
    category: '',
    description: '',
    subsidyPercent: 0,
    vendorName: '',
    requiresContract: false,
    isActive: true,
    r2ObjectKey: '',
    contractUploadedAt: '',
    contractExpiryDate: '',
  });

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function loadBenefits() {
    setLoading(true);
    setError('');
    try {
      const data = await gqlRequest(GetBenefitsDocument);
      setBenefits(data.benefits);
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch benefits');
    } finally {
      setLoading(false);
    }
  }

  const [contractFile, setContractFile] = useState<File | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let uploadedKey: string | undefined;

      // 1) File байгаа бол эхлээд Worker upload endpoint руу явуулна
      if (contractFile) {
        const fd = new FormData();
        fd.append('file', contractFile);

        const uploadRes = await fetch(
          'https://team-service.nbhishgee22.workers.dev/api/upload',
          { method: 'POST', body: fd },
        );

        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadJson?.message ?? 'Upload failed');

        uploadedKey = uploadJson.key; // <-- R2 object key
      }

      // 2) Дараа нь DB createBenefit
      const input: CreateBenefitMutationVariables['input'] = {
        name: form.name.trim(),
        category: emptyToUndefined(form.category ?? ''),
        description: emptyToUndefined(form.description ?? ''),
        subsidyPercent: Number(form.subsidyPercent ?? 0),
        vendorName: emptyToUndefined(form.vendorName ?? ''),
        requiresContract: Boolean(form.requiresContract),
        isActive: Boolean(form.isActive),
        r2ObjectKey: uploadedKey ?? emptyToUndefined(form.r2ObjectKey ?? ''),
        contractUploadedAt: uploadedKey ? new Date().toISOString() : undefined,
        contractExpiryDate: emptyToUndefined(form.contractExpiryDate ?? ''),
      };

      const data = await gqlRequest(CreateBenefitDocument, { input });
      setBenefits((prev) => [data.createBenefit, ...prev]);
    } catch (e: any) {
      setError(e.message ?? 'Create benefit failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ maxWidth: 760, margin: '24px auto', fontFamily: 'sans-serif' }}
    >
      <h2>Create Benefit (Test)</h2>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        <input
          placeholder="Name (required)"
          value={form.name ?? ''}
          onChange={(e) => update('name', e.target.value)}
          required
        />
        <input
          placeholder="Category"
          value={form.category ?? ''}
          onChange={(e) => update('category', e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={form.description ?? ''}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
        />
        <input
          type="number"
          placeholder="Subsidy Percent"
          value={form.subsidyPercent ?? 0}
          onChange={(e) => update('subsidyPercent', Number(e.target.value))}
        />
        <input
          placeholder="Vendor Name"
          value={form.vendorName ?? ''}
          onChange={(e) => update('vendorName', e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => setContractFile(e.target.files?.[0] ?? null)}
        />
        <input
          placeholder="Contract Uploaded At (ISO string)"
          value={form.contractUploadedAt ?? ''}
          onChange={(e) => update('contractUploadedAt', e.target.value)}
        />
        <input
          placeholder="Contract Expiry Date (YYYY-MM-DD)"
          value={form.contractExpiryDate ?? ''}
          onChange={(e) => update('contractExpiryDate', e.target.value)}
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={Boolean(form.requiresContract)}
            onChange={(e) => update('requiresContract', e.target.checked)}
          />
          Requires Contract
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={Boolean(form.isActive)}
            onChange={(e) => update('isActive', e.target.checked)}
          />
          Is Active
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Create Benefit'}
          </button>
          <button type="button" onClick={loadBenefits} disabled={loading}>
            Refresh Benefits
          </button>
        </div>
      </form>

      {error ? <p style={{ color: 'red' }}>{error}</p> : null}

      <pre
        style={{
          marginTop: 16,
          background: '#f5f5f5',
          padding: 12,
          borderRadius: 8,
          overflowX: 'auto',
        }}
      >
        {JSON.stringify(benefits, null, 2)}
      </pre>
    </div>
  );
}
