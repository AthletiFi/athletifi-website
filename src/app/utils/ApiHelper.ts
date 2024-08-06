import Axios from 'axios';
import { PostData, BlogsListResult } from '@/types/Api.type';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const REQUEST_TIMEOUT_MS: number = 5000;

export async function getBlogsList(): Promise<BlogsListResult> {
  const blogsListApiPath =
    '/news-lists?populate=image&populate=author&populate=categories&sort=createdAt:desc';
  try {
    const data = await axiosRequest(RequestMethod.GET, blogsListApiPath, null);

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

// Function to make API requests to the Strapi CMS using Axios.
// Method: The HTTP method (GET, POST, etc.) to use for the request.
// URL: The specific API endpoint within the Strapi CMS.
// Data: Optional payload for POST or PUT requests.

export async function axiosRequest<T>(
  method: RequestMethod,
  url: string,
  data: PostData<T> | null | undefined,
) {
  try {
    // Make the API request to the Strapi CMS and await the response.
    const response = await Axios({
      data: data,
      method: method,
      timeout: REQUEST_TIMEOUT_MS,
      url: `${process.env.STRAPI_SERVER_URL}${url}`, //Server URL for AthletiFi's Strapi CMS implementation, which is hosted on the vidalco.in domain
    });
    return await response.data;
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      if (!error?.response || error.code === 'ECONNABORTED') {
        console.error(
          'No server response or request timed out. Try again later',
        );
      }

      switch (error.response?.status) {
        case 400:
          console.error('Bad request error');
          break;
        case 401:
          console.error('Unauthorized to make request');
          break;
        case 404:
          console.error('Requested resource was not found');
          break;
        case 500 || 503:
          console.error('Hit an internal server error');
          break;
        default:
          console.error(`Ran into a general error: ${error}`);
      }
    }
    // Handle any errors that occur during the API request.
    return error;
  }
}
