import { clerkClient } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.query;

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId as string);

  res.status(200).json({ user });
}
