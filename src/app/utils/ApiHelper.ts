import { PostData, BlogsListResult } from '@/types/Api.type';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export async function getBlogsList(): Promise<BlogsListResult> {
  const blogsListApiPath =
    '/news-lists?populate=image&populate=author&populate=categories&sort=createdAt:desc';
  try {
    // const data = await axiosRequest(RequestMethod.GET, blogsListApiPath, null);
    const response = await fetch(
      `${process.env.STRAPI_SERVER_URL}${blogsListApiPath}`,
      {
        next: {
          tags: ['blogs'],
        },
        cache: 'force-cache',
      },
    );
    const data = await response.json();

    return {
      allBlogsList: data,
      allBlogsListError: null,
    };
  } catch (error) {
    console.error('Fetching blogs list failed:', error);

    // Return structure in case of an error, adjust as necessary
    return {
      allBlogsList: null,
      allBlogsListError:
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
  try {
    // Make the API request to the Strapi CMS and await the response.
    const response = await fetch(`${process.env.STRAPI_SERVER_URL}${url}`, {
      method: method,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(`Ran into a fetch error: ${JSON.stringify(error)}`);
    // Handle any errors that occur during the API request.
    return error;
  }
}
