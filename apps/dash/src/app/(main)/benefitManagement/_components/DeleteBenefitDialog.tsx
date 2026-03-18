'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@team/source-ui';
import {
  DeleteBenefitDocument,
  GetBenefitsQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

type Benefit = GetBenefitsQuery['benefits'][number];

type Props = {
  benefit: Benefit;
  onDeleted: (id: number) => void;
};

export const DeleteBenefitDialog = ({ benefit, onDeleted }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    setLoading(true);
    setError('');

    try {
      const data = await gqlRequest(DeleteBenefitDocument, { id: benefit.id });

      if (!data.deleteBenefit) {
        setError(
          'This benefit cannot be deleted because it is still linked to requests or eligibility rules.',
        );
        return;
      }

      onDeleted(benefit.id);
      setOpen(false);
    } catch (e: any) {
      setError(e.message ?? 'Failed to delete benefit');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#EF4444] hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{benefit.name}</strong>. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="text-red-500 text-sm px-1">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
