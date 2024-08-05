import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.athleti.fi';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/logout`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resolve-auth`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/help-support`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
    },
  ];
}
