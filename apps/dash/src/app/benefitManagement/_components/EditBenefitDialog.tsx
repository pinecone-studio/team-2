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
  GetBenefitsQuery,
  UpdateBenefitDocument,
  UpdateBenefitMutationVariables,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';

type Benefit = GetBenefitsQuery['benefits'][number];

type Props = {
  benefit: Benefit;
  onUpdated: (updated: Benefit) => void;
};

export const EditBenefitDialog = ({ benefit, onUpdated }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<UpdateBenefitMutationVariables['input']>({
    name: benefit.name,
    category: benefit.category ?? '',
    description: benefit.description ?? '',
    vendorName: benefit.vendorName ?? '',
    subsidyPercent: benefit.subsidyPercent ?? 0,
    isActive: benefit.isActive ?? true,
    requiresContract: benefit.requiresContract ?? false,
    contractExpiryDate: benefit.contractExpiryDate ?? '',
    r2ObjectKey: benefit.r2ObjectKey ?? '',
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
      const data = await gqlRequest(UpdateBenefitDocument, {
        id: benefit.id,
        input: form,
      });
      onUpdated(data.updateBenefit);
      setOpen(false);
    } catch (e: any) {
      setError(e.message ?? 'Failed to update benefit');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Benefit</DialogTitle>
              <DialogDescription>
                Update the details for <strong>{benefit.name}</strong>.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <Field>
                <Label htmlFor="edit-name">Name *</Label>
                <Input
                  id="edit-name"
                  name="name"
                  placeholder="e.g. Health Insurance"
                  value={form.name ?? ''}
                  onChange={(e) => update('name', e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  name="category"
                  placeholder="e.g. Health, Transport"
                  value={form.category ?? ''}
                  onChange={(e) => update('category', e.target.value)}
                />
              </Field>

              <Field>
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  name="description"
                  placeholder="Short description"
                  value={form.description ?? ''}
                  onChange={(e) => update('description', e.target.value)}
                />
              </Field>

              <Field>
                <Label htmlFor="edit-vendorName">Vendor Name</Label>
                <Input
                  id="edit-vendorName"
                  name="vendorName"
                  placeholder="e.g. Manulife"
                  value={form.vendorName ?? ''}
                  onChange={(e) => update('vendorName', e.target.value)}
                />
              </Field>

              <Field>
                <Label htmlFor="edit-subsidyPercent">Subsidy %</Label>
                <Input
                  id="edit-subsidyPercent"
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
                <Label htmlFor="edit-contractExpiryDate">
                  Contract Expiry Date
                </Label>
                <Input
                  id="edit-contractExpiryDate"
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

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
