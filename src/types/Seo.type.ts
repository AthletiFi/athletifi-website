// Define the properties of the 'pageSEO'
export interface PageSEO {
  title: string; // Title of the page
  description: string | undefined; // Description of the page
  websiteURL: string; // URL of the website
  image: string; // Image URL for SEO
}

export interface PageSEOProps {
  pageSEO: PageSEO;
}
