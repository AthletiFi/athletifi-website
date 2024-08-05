import { redirect } from 'next/navigation';

export default async function CardRedirect({ id }: { id: string }) {
  const userDataUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cardRedirectUrl?qr_code=${id}`;
  const response = await fetch(userDataUrl, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    } as HeadersInit,
    next: {
      tags: ['qrCodeRedirect'],
    },
  });

  const responseJson = await response.json();
  if (responseJson.message !== 'Success') {
    return null;
  }
  const inviteId = responseJson.result.invite_id;
  const dashboardSlug = responseJson.result.dashboard_slug;

  if (inviteId === '') {
    redirect(`/dashboard/${dashboardSlug}`);
  } else {
    redirect(
      `/register?invite_id=${inviteId}&redirect=/dashboard/${dashboardSlug}`,
    );
  }

  return (
    <div>
      <p>Please wait while we redirect you to your player card dashboard</p>
    </div>
  );
}
