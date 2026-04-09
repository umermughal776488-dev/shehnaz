import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'vpfjij2u',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Use the edge cache for fast response times
  apiVersion: '2024-03-24', // Use the latest date for stable versioning
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ Queries
export const CATEGORIES_QUERY = `*[_type == "category"]{
  "name": name,
  "description": description,
  "image": image.asset->url
}`;

export const PRODUCTS_QUERY = `*[_type == "product"]{
  "id": _id,
  name,
  "slug": slug.current,
  price,
  oldPrice,
  rating,
  "image": image.asset->url,
  "images": images[].asset->url,
  "category": category->name,
  "subcategory": subcategory->name,
  description,
  ingredients,
  usage,
  variations
}`;

export const DEALS_QUERY = `*[_type == "deal"]{
  "id": _id,
  title,
  "slug": slug.current,
  description,
  discount,
  price,
  originalPrice,
  "image": image.asset->url,
  isFeatured
}`;

export const FEATURED_DEAL_QUERY = `*[_type == "deal" && isFeatured == true][0]{
  "id": _id,
  title,
  "slug": slug.current,
  description,
  discount,
  price,
  originalPrice,
  "image": image.asset->url,
  isFeatured
}`;

export const SINGLE_DEAL_QUERY = `*[_type == "deal" && slug.current == $slug][0]{
  "id": _id,
  title,
  "slug": slug.current,
  description,
  discount,
  price,
  originalPrice,
  "image": image.asset->url,
  isFeatured
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"]{
  "id": _id,
  name,
  text,
  rating,
  "avatar": avatar.asset->url
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  siteDescription,
  phoneNumber,
  email,
  facebookUrl,
  instagramUrl,
  twitterUrl,
  youtubeUrl,
  exclusiveProductsTitle,
  exclusiveProductsSubtitle,
  reviewsTitle,
  reviewsSubtitle
}`;
