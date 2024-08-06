'use server';

import { RequestMethod } from '@/app/utils/ApiHelper';
import { ContactFormDetails } from '@/types/ContactUs.type';
import { SignUpFormDetails } from '@/types/SignUp.type';

const contactUsUrl = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}/contact-us-messages`;
const newsletterSignupUrl = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}/join-newsletters`;

export async function addContactUs(formData: FormData) {
  const postBody: ContactFormDetails = {
    data: {
      email: (formData.get('email') as string) || '',
      message: (formData.get('message') as string) || '',
      name: (formData.get('name') as string) || '',
    },
  };

  try {
    const response = await fetch(contactUsUrl, {
      headers: { 'Content-Type': 'application/json' },
      method: RequestMethod.POST,
      body: JSON.stringify(postBody),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addNewsletterSignUp(formData: FormData) {
  const postBody: SignUpFormDetails = {
    data: {
      email: (formData.get('email') as string) || '',
    },
  };

  try {
    const response = await fetch(newsletterSignupUrl, {
      headers: { 'Content-Type': 'application/json' },
      method: RequestMethod.POST,
      body: JSON.stringify(postBody),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}
