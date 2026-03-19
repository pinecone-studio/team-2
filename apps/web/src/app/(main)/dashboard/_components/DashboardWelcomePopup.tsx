'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@team/source-ui';

export function DashboardWelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shouldShow = sessionStorage.getItem('showDashboardWelcome');
    if (shouldShow !== 'true') return;

    setVisible(true);

    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.removeItem('showDashboardWelcome');
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent className="w-[382px] rounded-[10px] [&>button]:hidden">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="text-4xl">🎉</div>
          <DialogTitle>Congratulations!</DialogTitle>
          <p className="text-sm text-muted-foreground">
            You have successfully signed in.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
