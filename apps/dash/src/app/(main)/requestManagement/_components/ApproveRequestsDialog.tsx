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
} from '@team/source-ui';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import {
  UpdateBenefitRequestDocument,
  type GetBenefitRequestsQuery,
  RequestStatus,
} from 'apps/dash/src/graphql/generated/graphql';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];

type Props = {
  request: BenefitRequest;
  onUpdated: (updated: BenefitRequest) => void;
};

export const ApproveRequestDialog = ({ request, onUpdated }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleApprove() {
    setLoading(true);
    setError('');
    try {
      const data = await gqlRequest(UpdateBenefitRequestDocument, {
        id: request.id,
        input: { status: RequestStatus.Approved },
      });
      onUpdated(data.updateBenefitRequest);
      setOpen(false);
    } catch (e: any) {
      setError(e.message ?? 'Failed to approve');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="px-3 py-1 bg-green-50 text-green-500 hover:bg-green-100 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-semibold">
          <CircleCheck size={16} /> Approve
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve this request?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to approve benefit request #{request.id}. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && <p className="text-red-500 text-sm px-1">{error}</p>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <button
            onClick={handleApprove}
            disabled={loading}
            className="bg-green-600 text-white hover:bg-green-700 px-4 py-1 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Approving...' : 'Approve'}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
