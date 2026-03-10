import { createClerkClient } from '@clerk/backend';

export const clerkClientWeb = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY_WEB,
});

export const clerkClientDash = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY_DASH,
});
