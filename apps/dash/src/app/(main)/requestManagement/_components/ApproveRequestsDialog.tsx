'use client';

import type { Dispatch, SetStateAction } from 'react';
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
import { useState } from 'react';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];

type Props = {
  request: BenefitRequest;
  onUpdated: (updated: BenefitRequest) => void;
  setActionLoading: Dispatch<SetStateAction<boolean>>;
};

export const ApproveRequestDialog = ({
  request,
  onUpdated,
  setActionLoading,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleApprove() {
    setError('');
    setLoading(true);
    setOpen(false);

    await new Promise((resolve) => setTimeout(resolve, 50));
    setActionLoading(true);

    try {
      const data = await gqlRequest(UpdateBenefitRequestDocument, {
        id: request.id,
        input: { status: RequestStatus.Approved },
      });

      onUpdated(data.updateBenefitRequest);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to approve');
    } finally {
      setActionLoading(false);
      setLoading(false);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="rounded-lg border border-[#BBF7D0] bg-[#EDF7EC] px-2.5 py-1 text-xs font-[500] text-[#59AF4F] transition-colors hover:bg-[#BBF7D0]">
          Approve
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

        {error && <p className="px-1 text-sm text-red-500">{error}</p>}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <button
            onClick={handleApprove}
            disabled={loading}
            className="rounded-lg bg-green-600 px-4 py-1 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Approving...' : 'Approve'}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
