"use client"
import { useAuth } from '@clerk/nextjs';
import Sidebar from '../../sidebar/page';

export function ConditionalSidebar() {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <Sidebar /> : null;
}