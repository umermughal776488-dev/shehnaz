import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSanityData } from '../hooks/useSanityData';
import { FEATURED_DEAL_QUERY } from '../lib/sanity';
import { Deal } from '../types';

export default function Hero() {
  const { data: featuredDeal, loading } = useSanityData<Deal>(FEATURED_DEAL_QUERY);

  if (loading) {
    return (
      <section className="px-8 py-12 max-w-7xl mx-auto h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
      </section>
    );
  }

  // Fallback if no featured deal is found
  if (!featuredDeal) {
    return (
      <section className="relative px-8 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-brand-orange" />
            <span className="text-sm font-medium uppercase tracking-widest text-brand-orange">Natural Skincare</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 tracking-tighter">
            Glow Naturally <br /> Care Deeply.
          </h1>
          <p className="text-lg text-brand-brown/70 max-w-md mb-10 leading-relaxed">
            Discover a curated collection of premium products for Men, Women, and Kids.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link 
              to="/deals"
              className="bg-brand-brown text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-brand-brown/90 transition-all transform hover:scale-105 inline-block"
            >
              Discover More
            </Link>
          </div>
        </motion.div>
        {/* ... default image ... */}
      </section>
    );
  }

  return (
    <section className="relative px-4 sm:px-8 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10"
      >
        <div className="flex items-center gap-2 mb-6 uppercase tracking-[0.2em] font-bold text-[10px] md:text-xs text-brand-orange">
          <Tag className="w-4 h-4" />
          <span>Special Offer • Limited Time</span>
        </div>
        
        <h1 className="text-4xl md:text-8xl font-serif font-black leading-[0.95] mb-6 md:mb-8 text-brand-brown tracking-tighter">
          {featuredDeal.title}
        </h1>
        
        <p className="text-lg md:text-xl text-brand-brown/70 max-w-md mb-8 md:mb-12 leading-relaxed font-medium">
          {featuredDeal.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 mb-12 md:mb-16">
          <Link 
            to={`/deal/${featuredDeal.slug}`}
            className="group relative px-8 py-4 md:px-12 md:py-6 bg-brand-brown text-white rounded-full text-lg md:text-xl font-bold shadow-[0_20px_50px_-10px_rgba(61,43,31,0.3)] hover:bg-brand-orange hover:-translate-y-1 transition-all duration-300 active:scale-95 w-full sm:w-auto text-center"
          >
            <span className="flex items-center justify-center gap-3">
              Grab the Deal
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <div className="flex items-baseline gap-1">
            <span className="text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest block mb-1">Starting at</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-5xl font-black text-brand-brown">PKR {featuredDeal.price.toFixed(2)}</span>
              {featuredDeal.originalPrice && (
                <span className="text-lg md:text-2xl text-brand-orange/40 line-through font-bold">PKR {featuredDeal.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8 md:gap-12 border-t border-brand-brown/10 pt-8 md:pt-10">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Limited Edition</span>
             <span className="text-xs md:text-sm font-bold text-brand-brown/60">Exclusive Collection</span>
          </div>
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange">Fast Checkout</span>
             <span className="text-xs md:text-sm font-bold text-brand-brown/60">Secure Payment</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[400px] lg:h-[700px]"
      >
        <div className="relative h-full rounded-[40px] md:rounded-[80px] overflow-hidden shadow-[0_80px_120px_-30px_rgba(0,0,0,0.3)] border-[8px] md:border-[16px] border-white group">
          <img 
            src={featuredDeal.image} 
            alt={featuredDeal.title} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Floating Discount Badge */}
          <div className="absolute top-6 right-6 md:top-12 md:right-12 scale-90 md:scale-110">
            <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-orange rounded-full animate-ping opacity-20"></div>
              <div className="relative w-full h-full bg-brand-orange text-white rounded-full flex flex-col items-center justify-center shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                 <span className="text-2xl md:text-3xl font-black leading-none">{featuredDeal.discount}</span>
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Off</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute -left-10 md:-left-20 -bottom-10 md:-bottom-20 w-40 h-40 md:w-80 md:h-80 bg-brand-orange/20 rounded-full blur-[60px] md:blur-[120px] -z-10"></div>
        <div className="absolute -right-10 md:-right-20 -top-10 md:-top-20 w-40 h-40 md:w-80 md:h-80 bg-brand-brown/10 rounded-full blur-[60px] md:blur-[120px] -z-10"></div>
      </motion.div>
    </section>
  );
}
