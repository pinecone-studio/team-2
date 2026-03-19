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
  Button,
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

export const RejectRequestDialog = ({
  request,
  onUpdated,
  setActionLoading,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleReject() {
    setError('');
    setLoading(true);
    setOpen(false);

    await new Promise((resolve) => setTimeout(resolve, 50));
    setActionLoading(true);

    try {
      const data = await gqlRequest(UpdateBenefitRequestDocument, {
        id: request.id,
        input: { status: RequestStatus.Rejected },
      });

      onUpdated(data.updateBenefitRequest);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to reject');
    } finally {
      setActionLoading(false);
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="rounded-lg border border-[#E85172] bg-[#E851722E] px-2.5 py-1 text-xs font-[500] text-[#E85172] transition-colors hover:bg-[#FECDD3]">
          Reject
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

        {error && <p className="px-1 text-sm text-red-500">{error}</p>}

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
