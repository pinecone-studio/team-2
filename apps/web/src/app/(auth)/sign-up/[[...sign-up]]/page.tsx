'use client';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="w-full relative z-10 flex justify-center items-center">
      <SignUp routing="hash" />
    </div>
  );
}
