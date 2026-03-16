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
  GetBenefitRequestsQuery,
  UpdateBenefitRequestDocument,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';

import { XCircle } from 'lucide-react';
import { useState } from 'react';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];

type Props = {
  request: BenefitRequest;
  onUpdated: (updated: BenefitRequest) => void;
};

export const RejectRequestDialog = ({ request, onUpdated }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleReject() {
    setLoading(true);
    setError('');
    try {
      const data = await gqlRequest(UpdateBenefitRequestDocument, {
        id: request.id,
        input: { status: 'rejected' },
      });
      onUpdated(data.updateBenefitRequest);
      setOpen(false);
    } catch (e: any) {
      setError(e.message ?? 'Failed to reject');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-semibold">
          <XCircle size={16} /> Reject
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject this request?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently reject benefit
            request #{request.id}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && <p className="text-red-500 text-sm px-1">{error}</p>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            className="bg-rose-600 text-white hover:bg-rose-700"
            onClick={handleReject}
            disabled={loading}
          >
            {loading ? 'Rejecting...' : 'Reject'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
