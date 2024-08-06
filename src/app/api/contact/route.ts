import { fetchRequest, RequestMethod } from '@/utils/ApiHelper'; // Ensure this path is correct

export async function POST(request: Request): Promise<Response> {
  try {
    const { data: dataToSendToStrapi } = await request.json();

    const apiPath = '/contact-us-messages';
    const responseData = await fetchRequest(
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
      JSON.stringify({
        status: 'error',
        message: 'Failed to process contact form',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
