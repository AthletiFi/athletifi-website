import { NextResponse } from 'next/server';
import axiosClient from '@/utils/axiosClient';

export async function POST(request: Request) {
  const endpoint = `/referralInvite`;
  try {
    const body = await request.json();
    const response = await axiosClient.post(endpoint, body);
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
