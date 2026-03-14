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
import { CircleCheck } from 'lucide-react';
import React from 'react';

export const ApproveRequestDialog = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="px-3 py-1 bg-green-50 text-green-500 hover:bg-green-100 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-semibold">
            <CircleCheck size={16} /> Approve
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about the approve the request of benefit. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <button className="bg-green-600 text-white hover:bg-green-700  px-4 py-1 rounded-lg">
              Approve
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
