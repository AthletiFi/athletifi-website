import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } },
) {
  const cardId = Array.isArray(params.cardId)
    ? params.cardId.join('/')
    : params.cardId;
  const dashboardEndpoint = `dashboardData?dashboardSlug=${cardId}`;
  console.log(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${dashboardEndpoint}`,
  );
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${dashboardEndpoint}`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
        } as HeadersInit,
        next: {
          tags: ['playerCardData'],
        },
        cache: 'force-cache',
      },
    );
    const data = await response.json();
    console.log('data %s', JSON.stringify(data));
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
