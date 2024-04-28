import { fetchMFAPreference } from 'aws-amplify/auth';

export default async function handleFetchMFAPreference() {
  try {
    const output = await fetchMFAPreference();
    return output;
  } catch (error) {
    console.log(error);
    return {
      enabled: undefined,
      preferred: undefined,
    };
  }
}
