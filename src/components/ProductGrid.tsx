import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import { SiteSettings, Product } from '../types';
import { PRODUCTS, CATEGORIES, SUBCATEGORIES } from '../constants';
import { useSanityData } from '../hooks/useSanityData';
import { SITE_SETTINGS_QUERY, PRODUCTS_QUERY } from '../lib/sanity';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  
  // Fetch site settings
  const { data: siteSettings } = useSanityData<SiteSettings>(SITE_SETTINGS_QUERY);
  
  // Fetch products from Sanity
  const { data: sanityProducts, loading: productsLoading } = useSanityData<Product[]>(PRODUCTS_QUERY);
  
  // Use Sanity products if available, otherwise fallback to static constants
  const products = sanityProducts && sanityProducts.length > 0 ? sanityProducts : PRODUCTS;

  const headline = siteSettings?.exclusiveProductsTitle || 'Our Exclusive Collection';
  const subtitle = siteSettings?.exclusiveProductsSubtitle || 'Discover our wide range of products across different categories, curated just for you.';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && (CATEGORIES.includes(category) || (sanityProducts?.some(p => p.category === category)))) {
      setActiveCategory(category);
    }
  }, [location, sanityProducts]);

  const filteredProducts = products.filter(p => {
    const categoryMatch = activeCategory === 'All' || p.category === activeCategory;
    const subcategoryMatch = activeSubcategory === 'All' || p.subcategory === activeSubcategory;
    return categoryMatch && subcategoryMatch;
  });

  // Extract available subcategories based on active category
  const subcategories = activeCategory !== 'All' 
    ? [...new Set(products.filter(p => p.category === activeCategory).map(p => p.subcategory).filter(Boolean))] as string[]
    : [];

  // Get all unique categories for filtering
  const allCategories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <section id="categories" className="px-8 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">{headline}</h2>
        <p className="text-brand-brown/60 max-w-lg mx-auto text-sm mb-12">
          {subtitle}
        </p>

        <div className="flex flex-col gap-6">
          {/* Main Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveSubcategory('All');
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-brand-brown text-white shadow-lg' 
                    : 'bg-white text-brand-brown/60 hover:bg-brand-beige border border-brand-brown/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => setActiveSubcategory('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeSubcategory === 'All'
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-beige text-brand-brown/60 hover:bg-brand-brown/10'
                }`}
              >
                All {activeCategory}
              </button>
              {subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeSubcategory === sub
                      ? 'bg-brand-orange text-white'
                      : 'bg-brand-beige text-brand-brown/60 hover:bg-brand-brown/10'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {productsLoading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {!productsLoading && filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-brand-brown/40 font-serif text-xl italic">No products found in this category.</p>
        </div>
      )}
    </section>
  );
}
