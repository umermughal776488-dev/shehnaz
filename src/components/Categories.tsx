import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORY_DETAILS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { useSanityData } from '../hooks/useSanityData';
import { CATEGORIES_QUERY } from '../lib/sanity';

export default function Categories() {
  const { data: sanityCategories, loading } = useSanityData<any[]>(CATEGORIES_QUERY);
  
  const categories = sanityCategories && sanityCategories.length > 0 ? sanityCategories : CATEGORY_DETAILS;

  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">Shop by Category</h1>
        <p className="text-brand-brown/60 max-w-2xl text-lg leading-relaxed">
          Explore our curated collections across Men, Women, Kids, and more. From premium skincare to elegant accessories, find exactly what you need.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[400px] rounded-[48px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-brand-brown/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                <h3 className="text-3xl font-serif font-bold mb-3">{category.name}</h3>
                <p className="text-white/80 text-sm mb-6 max-w-xs line-clamp-2">
                  {category.description}
                </p>
                <Link 
                  to={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="inline-flex items-center gap-2 bg-white text-brand-brown px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-orange hover:text-white transition-all group/btn"
                >
                  Explore {category.name}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
