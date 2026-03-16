'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldGroup,
  Input,
  Label,
} from '@team/source-ui';
import {
  CreateBenefitDocument,
  CreateBenefitMutationVariables,
  GetBenefitsQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

type Benefit = GetBenefitsQuery['benefits'][number];

type Props = {
  onCreated: (benefit: Benefit) => void;
};

export const AddBenefitDialog = ({ onCreated }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<CreateBenefitMutationVariables['input']>({
    name: '',
    category: '',
    description: '',
    vendorName: '',
    subsidyPercent: 0,
    isActive: true,
    requiresContract: false,
    contractExpiryDate: '',
    r2ObjectKey: '',
  });

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await gqlRequest(CreateBenefitDocument, {
        input: {
          ...form,
          contractUploadedAt: new Date().toISOString(),
        },
      });
      onCreated(data.createBenefit);
      setOpen(false);
      setForm({
        name: '',
        category: '',
        description: '',
        vendorName: '',
        subsidyPercent: 0,
        isActive: true,
        requiresContract: false,
        contractExpiryDate: '',
        r2ObjectKey: '',
      });
    } catch (e: any) {
      setError(e.message ?? 'Failed to create benefit');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 h-10">
            <Plus />
            <span className="font-semibold text-sm">Add Benefit</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Benefit</DialogTitle>
              <DialogDescription>
                Fill in the details for the new benefit. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <Field>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Health Insurance"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g. Health, Transport"
                  value={form.category ?? ''}
                  onChange={(e) => update('category', e.target.value)}
                />
              </Field>

              <Field>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Short description"
                  value={form.description ?? ''}
                  onChange={(e) => update('description', e.target.value)}
                />
              </Field>

              <Field>
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input
                  id="vendorName"
                  name="vendorName"
                  placeholder="e.g. Manulife"
                  value={form.vendorName ?? ''}
                  onChange={(e) => update('vendorName', e.target.value)}
                />
              </Field>

              <Field>
                <Label htmlFor="subsidyPercent">Subsidy %</Label>
                <Input
                  id="subsidyPercent"
                  name="subsidyPercent"
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0–100"
                  value={form.subsidyPercent ?? 0}
                  onChange={(e) =>
                    update('subsidyPercent', Number(e.target.value))
                  }
                />
              </Field>

              <Field>
                <Label htmlFor="contractExpiryDate">Contract Expiry Date</Label>
                <Input
                  id="contractExpiryDate"
                  name="contractExpiryDate"
                  type="date"
                  value={form.contractExpiryDate ?? ''}
                  onChange={(e) => update('contractExpiryDate', e.target.value)}
                />
              </Field>

              <Field>
                <Label
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(form.requiresContract)}
                    onChange={(e) =>
                      update('requiresContract', e.target.checked)
                    }
                  />
                  Requires Contract
                </Label>
              </Field>

              <Field>
                <Label
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(form.isActive)}
                    onChange={(e) => update('isActive', e.target.checked)}
                  />
                  Is Active
                </Label>
              </Field>
            </FieldGroup>

            {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Benefit'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
