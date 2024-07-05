import { NextResponse } from 'next/server';
import axiosClient from '@/utils/axiosClient';

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } },
) {
  const cardId = Array.isArray(params.cardId)
    ? params.cardId.join('/')
    : params.cardId;
  const dashboardEndpoint = `dashboardData?dashboardSlug=${cardId}`;
  try {
    const response = await axiosClient.get(dashboardEndpoint, {
      timeout: 10000,
    });

    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
