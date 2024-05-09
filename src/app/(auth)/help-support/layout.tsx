import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { redirect } from 'next/navigation';

export default async function HelpSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = await isAuthenticated();
  if (!isSignedIn) redirect('/login?redirect=/help-support');

  return <>{children}</>;
}
