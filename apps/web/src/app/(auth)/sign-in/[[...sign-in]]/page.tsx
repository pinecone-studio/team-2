'use client';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="w-full relative z-10 flex justify-center items-center">
      <SignIn routing="hash" />
    </div>
  );
}
