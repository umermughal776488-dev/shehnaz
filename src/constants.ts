import { Product } from './types';

export const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'Other'];

export const SUBCATEGORIES: Record<string, string[]> = {
  'Women': ['Skin care products', 'Jewelry', 'Makeup'],
  'Men': ['Watches', 'Perfumes'],
  'Kids': ['Stationery', "Kids' bags", "Kids' bottles", "Kids' shoes", "Kids' clothes"],
  'Other': ['Electronics', 'Home Decor', 'Accessories'], // Placeholder subcategories
};

export const CATEGORY_DETAILS = [
  { name: 'Women', description: 'Premium skincare, elegant jewelry, and professional makeup.', image: 'https://picsum.photos/seed/shehnaz-cat-women/600/400' },
  { name: 'Men', description: 'Sophisticated watches and signature perfumes.', image: 'https://picsum.photos/seed/shehnaz-cat-men/600/400' },
  { name: 'Kids', description: 'Fun stationery, cute bags, and comfortable clothing.', image: 'https://picsum.photos/seed/shehnaz-cat-kids/600/400' },
  { name: 'Other', description: 'Explore our diverse collection of various items.', image: 'https://picsum.photos/seed/shehnaz-cat-other/600/400' },
];

export const DEALS = [
  { id: 'd1', title: 'Summer Style Bundle', description: 'Get our top 3 accessories for the price of 2.', discount: '33% OFF', image: 'https://picsum.photos/seed/shehnaz-deal1/800/400' },
  { id: 'd2', title: 'First Order Special', description: 'Sign up for our newsletter and get 15% off your first purchase.', discount: '15% OFF', image: 'https://picsum.photos/seed/shehnaz-deal2/800/400' },
  { id: 'd3', title: 'Weekend Flash Sale', description: 'Enjoy 20% off on all watches and perfumes this weekend only.', discount: '20% OFF', image: 'https://picsum.photos/seed/shehnaz-deal3/800/400' },
  { id: 'd4', title: 'Ultimate Gift Set', description: 'Our best-selling watch and perfume in one exclusive set.', discount: '25% OFF', image: 'https://picsum.photos/seed/shehnaz-deal4/800/400' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hydrating Glow Serum',
    price: 49.52,
    oldPrice: 79.52,
    rating: 4.9,
    image: 'https://picsum.photos/seed/shehnaz-p1/800/800',
    images: [
      'https://picsum.photos/seed/shehnaz-p1/800/800',
      'https://picsum.photos/seed/shehnaz-p1-2/800/800',
      'https://picsum.photos/seed/shehnaz-p1-3/800/800',
    ],
    category: 'Women',
    subcategory: 'Skin care products',
    description: 'A deeply hydrating serum that restores your skin\'s natural radiance with a blend of hyaluronic acid and organic botanical extracts.',
    ingredients: ['Hyaluronic Acid', 'Aloe Vera', 'Vitamin E', 'Organic Rosewater'],
    usage: 'Apply 2-3 drops to clean, dry skin morning and night. Follow with your favorite moisturizer.',
    variations: [
      { id: 'v1-1', name: '30ml', price: 49.52 },
      { id: 'v1-2', name: '50ml', price: 69.52 },
    ],
  },
  {
    id: '2',
    name: 'Elegant Gold Necklace',
    price: 129.99,
    oldPrice: 159.99,
    rating: 5.0,
    image: 'https://picsum.photos/seed/shehnaz-p2/800/800',
    images: [
      'https://picsum.photos/seed/shehnaz-p2/800/800',
    ],
    category: 'Women',
    subcategory: 'Jewelry',
    description: 'A stunning 18k gold-plated necklace with a delicate pendant, perfect for any occasion.',
    ingredients: ['18k Gold Plating', 'Stainless Steel'],
    usage: 'Avoid contact with water and perfume to maintain its shine.',
  },
  {
    id: '3',
    name: 'Matte Liquid Lipstick',
    price: 24.50,
    oldPrice: 35.00,
    rating: 4.7,
    image: 'https://picsum.photos/seed/shehnaz-p3/800/800',
    images: [
      'https://picsum.photos/seed/shehnaz-p3/800/800',
    ],
    category: 'Women',
    subcategory: 'Makeup',
    description: 'Long-lasting matte liquid lipstick that stays on all day without drying your lips.',
    ingredients: ['Vitamin E', 'Coconut Oil'],
    usage: 'Apply to clean lips. Let dry for 30 seconds.',
  },
  {
    id: '4',
    name: 'Classic Leather Watch',
    price: 89.00,
    oldPrice: 120.00,
    rating: 4.8,
    image: 'https://picsum.photos/seed/shehnaz-p4/800/800',
    images: [
      'https://picsum.photos/seed/shehnaz-p4/800/800',
    ],
    category: 'Men',
    subcategory: 'Watches',
    description: 'A timeless watch with a genuine leather strap and a minimalist dial.',
    ingredients: ['Genuine Leather', 'Stainless Steel Case'],
    usage: 'Water-resistant up to 30 meters.',
  },
  {
    id: '5',
    name: 'Midnight Oud Perfume',
    price: 75.00,
    oldPrice: 95.00,
    rating: 4.9,
    image: 'https://picsum.photos/seed/shehnaz-p5/800/800',
    images: [
      'https://picsum.photos/seed/shehnaz-p5/800/800',
    ],
    category: 'Men',
    subcategory: 'Perfumes',
    description: 'A bold and mysterious fragrance with notes of agarwood, sandalwood, and spices.',
    ingredients: ['Alcohol Denat', 'Fragrance', 'Water'],
    usage: 'Spray on pulse points.',
  },
  {
    id: '6',
    name: 'Creative Stationery Set',
    price: 15.99,
    rating: 4.6,
    image: 'https://picsum.photos/seed/shehnaz-p6/800/800',
    images: [
      'https://picsum.photos/seed/shehnaz-p6/800/800',
    ],
    category: 'Kids',
    subcategory: 'Stationery',
    description: 'A colorful set of notebooks, pens, and stickers to inspire creativity in children.',
    ingredients: ['Recycled Paper', 'Non-toxic Ink'],
    usage: 'Perfect for school and home projects.',
  },
  {
    id: '7',
    name: 'Dinosaur School Bag',
    price: 34.50,
    rating: 4.9,
    image: 'https://picsum.photos/seed/shehnaz-p7/800/800',
    images: [
      'https://picsum.photos/seed/shehnaz-p7/800/800',
    ],
    category: 'Kids',
    subcategory: "Kids' bags",
    description: 'A durable and spacious school bag with a fun dinosaur print.',
    ingredients: ['Polyester', 'Nylon'],
    usage: 'Adjustable straps for a comfortable fit.',
  },
  {
    id: '8',
    name: 'Smart Bluetooth Speaker',
    price: 45.00,
    rating: 4.5,
    image: 'https://picsum.photos/seed/shehnaz-p8/800/800',
    images: [
      'https://picsum.photos/seed/shehnaz-p8/800/800',
    ],
    category: 'Other',
    subcategory: 'Electronics',
    description: 'A portable Bluetooth speaker with high-quality sound and a long battery life.',
    ingredients: ['Plastic', 'Electronic Components'],
    usage: 'Connect via Bluetooth to any compatible device.',
  },
];
