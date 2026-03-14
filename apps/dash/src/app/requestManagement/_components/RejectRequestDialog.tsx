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
import { XCircle } from 'lucide-react';
import React from 'react';

export const RejectRequestDialog = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-semibold">
            <XCircle size={16} /> Reject
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently reject the
              request of benefit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant={'destructive'}
              className="bg-rose-600 text-white hover:bg-rose-700"
            >
              Reject
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
