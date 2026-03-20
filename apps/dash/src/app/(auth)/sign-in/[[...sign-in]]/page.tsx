import { SignIn } from '@clerk/nextjs';

export const runtime = 'edge';

export default function Page() {
  return (
    <SignIn
      fallbackRedirectUrl="/"
      forceRedirectUrl="/"
      signUpUrl="/sign-up"
      // withSignUp={false}
      // appearance={{
      //   elements: {
      //     footer: 'hidden',
      //     footerAction: 'hidden',
      //   },
      // }}
    />
  );
}
