import { motion } from 'motion/react';
import { Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSanityData } from '../hooks/useSanityData';
import { DEALS_QUERY } from '../lib/sanity';
import { Deal } from '../types';

export default function DealsPage() {
  const { data: deals, loading } = useSanityData<Deal[]>(DEALS_QUERY);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full mb-6 font-bold text-sm uppercase tracking-widest"
        >
          <Tag className="w-4 h-4" />
          Exclusive Offers
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl font-serif font-bold mb-6 text-brand-brown"
        >
          Special Collections & Deals
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-brand-brown/60 max-w-2xl mx-auto"
        >
          Discover our curated sets and limited-time promotional offers designed to bring you the best of Shehnaz Collection.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {deals?.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-brand-brown/5"
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-brand-orange text-white text-sm font-bold rounded-full shadow-lg">
                    {deal.discount}
                  </span>
                </div>
              </div>
              
              <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-bold mb-3 text-brand-brown group-hover:text-brand-orange transition-colors">
                  {deal.title}
                </h3>
                <p className="text-brand-brown/60 text-sm mb-6 line-clamp-2">
                  {deal.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-brand-brown">PKR {deal.price.toFixed(2)}</span>
                    {deal.originalPrice && (
                      <span className="text-sm text-brand-brown/30 line-through">PKR {deal.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <Link
                    to={`/deal/${deal.slug}`}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-beige text-brand-brown rounded-full font-bold text-sm hover:bg-brand-brown hover:text-white transition-all group/btn"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {deals?.length === 0 && (
        <div className="text-center py-20 bg-brand-beige/20 rounded-[40px]">
          <ShoppingBag className="w-16 h-16 text-brand-brown/20 mx-auto mb-6" />
          <h3 className="text-2xl font-serif font-bold text-brand-brown">No Active Deals</h3>
          <p className="text-brand-brown/50">Keep an eye out! We're preparing something special for you.</p>
        </div>
      )}
    </div>
  );
}
