import { axiosRequest, RequestMethod } from '@/utils/ApiHelper';

export async function POST(request: Request): Promise<Response> {
  try {
    const { data: dataToSendToStrapi } = await request.json();

    const apiPath = '/join-newsletters';
    const responseData = await axiosRequest(
      RequestMethod.POST,
      apiPath,
      dataToSendToStrapi,
    );

    return new Response(
      JSON.stringify({ status: 'success', data: responseData }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error(`Error in sign-up Route Handler: ${error}`);

    return new Response(
      JSON.stringify({ status: 'error', message: 'Failed to process sign-up' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
