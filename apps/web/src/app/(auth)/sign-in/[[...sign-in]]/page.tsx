import { SignIn } from '@clerk/nextjs';

export const runtime = 'edge';

export default function SignInPage() {
  return (
    <div className="w-full relative z-10 flex justify-center items-center">
      <SignIn
        routing="hash"
        withSignUp={false}
        appearance={{
          elements: {
            footer: 'hidden',
            footerAction: 'hidden',
          },
        }}
      />
    </div>
  );
}
