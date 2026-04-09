export interface ProductVariation {
  id: string;
  name: string; // e.g., "30ml", "50ml"
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  images: string[];
  category: string;
  subcategory?: string;
  description: string;
  ingredients: string[];
  usage: string;
  variations?: ProductVariation[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariation?: ProductVariation;
}

export interface Deal {
  id: string;
  title: string;
  slug: string;
  description: string;
  discount: string;
  price: number;
  originalPrice?: number;
  image: string;
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  phoneNumber: string;
  email: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  exclusiveProductsTitle: string;
  exclusiveProductsSubtitle: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
}
