import { PageSEO } from '@/types/Seo.type';

const aboutUsConfig: PageSEO = {
  description:
    "Discover AthletiFi's mission to transform the soccer world with dynamic digital trading cards. Dive into our journey, partnerships, and vision for the future of soccer.",
  image: '/about_us_meta.png',
  title: 'About Us | Athletifi',
  websiteURL: 'https://athleti.fi/about-us',
};

const dashboardConfig: PageSEO = {
  description: 'Write something about the dashboard.',
  image: 'TBD',
  title: 'Dashboard | Athletifi',
  websiteURL: 'https://athleti.fi/dashboard',
};

const homeConfig: PageSEO = {
  description:
    "Experience the future of soccer with AthletiFi's digital player card collections. Collect, follow, and interact with elite youth soccer players in engaging ways. Welcome to the future of sports.",
  image: '/lending_meta_img.webp',
  title: 'Athletifi | The Future of Sports',
  websiteURL: 'https://athleti.fi',
};

const newsConfig: PageSEO = {
  description: '(dynamically generated)',
  image: '(dynamically generated)',
  title: 'AthletiFi News: Latest Updates & Announcements',
  websiteURL: 'https://athletif.fi',
};

const signUpConfig: PageSEO = {
  description:
    "Sign-up for exclusive updates! Become part of the sport's revolution.",
  image: '/sign_up_meta',
  title: 'Start Your Journey | Join AthletiFi',
  websiteURL: 'https://athleti.fi/sign-up',
};

// TODO: NEEDS AN UPDATED IMAGE SPECIFIC TO CONTACT-US SEO
const contactUsConfig: PageSEO = {
  description: 'Get in Touch!',
  image: '/sign_up_meta',
  title: 'Contact the AthletiFi team',
  websiteURL: 'https://athleti.fi/contact-us',
};

export const SEO_CONFIG = {
  aboutUs: aboutUsConfig,
  contactUs: contactUsConfig,
  dashboard: dashboardConfig,
  home: homeConfig,
  news: newsConfig,
  signUp: signUpConfig,
};
