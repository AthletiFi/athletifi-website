import { PostData, BlogListResult } from '@/types/Api.type';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export async function getBlogList(): Promise<BlogListResult> {
  const blogListApiPath =
    '/news-lists?populate=image&populate=author&populate=categories&sort=createdAt:desc';
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}${blogListApiPath}`,
      {
        next: {
          tags: ['blog'],
        },
        cache: 'force-cache',
      },
    );
    const data = await response.json();

    return {
      allBlogList: data,
      allBlogListError: null,
    };
  } catch (error) {
    console.error('Fetching blog list failed:', error);

    // Return structure in case of an error, adjust as necessary
    return {
      allBlogList: null,
      allBlogListError:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

// Function to make API requests to the Strapi CMS
// Method: The HTTP method (GET, POST, etc.) to use for the request.
// URL: The specific API endpoint within the Strapi CMS.
// Data: Optional payload for POST or PUT requests.

export async function fetchRequest<T>(
  method: RequestMethod,
  url: string,
  data: PostData<T> | null | undefined,
) {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: method,
  };

  const finalOptions = data
    ? { ...options, body: JSON.stringify(data) }
    : options;

  try {
    // Make the API request to the Strapi CMS and await the response.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}${url}`,
      finalOptions,
    );
    return await response.json();
  } catch (error) {
    console.error(`Ran into a fetch error: ${JSON.stringify(error)}`);
    // Handle any errors that occur during the API request.
    return error;
  }
}
