import { NextResponse } from 'next/server';
import { fetchRequest, RequestMethod } from '@/utils/ApiHelper';

export async function GET(
  _request: unknown, // This can be omitted but I left it to show that the 'request' parameter is available
  { params }: { params: { slug: string } },
) {
  const { slug } = params;
  const blogsListApiPath = `/news-lists/?populate=image&populate=content&filters[slug][$eq]=${slug}&populate=author`;
  const data = await fetchRequest(RequestMethod.GET, blogsListApiPath, null);

  return NextResponse.json(data);
}
