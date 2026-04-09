import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { DEALS } from '../constants';
import { ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { useSanityData } from '../hooks/useSanityData';
import { DEALS_QUERY } from '../lib/sanity';

export default function Deals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: sanityDeals, loading } = useSanityData<any[]>(DEALS_QUERY);

  const deals = sanityDeals && sanityDeals.length > 0 ? sanityDeals : DEALS;

  const nextDeal = () => {
    setCurrentIndex((prev) => (prev + 1) % deals.length);
  };

  const prevDeal = () => {
    setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length);
  };

  useEffect(() => {
    if (deals.length <= 1) return;
    const timer = setInterval(nextDeal, 5000);
    return () => clearInterval(timer);
  }, [deals.length]);

  if (loading) return (
    <div className="flex justify-center items-center py-24">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
    </div>
  );

  if (deals.length === 0) return null;

  return (
    <section id="deals" className="px-8 py-24 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Special Deals & Offers</h2>
          <p className="text-brand-brown/60 max-w-lg text-sm">
            Don't miss out on our limited-time offers and bundle deals.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={prevDeal}
            className="p-3 rounded-full border border-brand-brown/10 hover:bg-brand-brown hover:text-white transition-all group"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextDeal}
            className="p-3 rounded-full border border-brand-brown/10 hover:bg-brand-brown hover:text-white transition-all group"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative h-[500px] rounded-[48px] overflow-hidden shadow-2xl bg-brand-beige/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={deals[currentIndex]?.id || currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col lg:flex-row"
          >
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
              <img 
                src={deals[currentIndex].image} 
                alt={deals[currentIndex].title} 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-brown/10"></div>
            </div>
            
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-8 lg:p-16 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-2 mb-6">
                <Tag className="w-5 h-5 text-brand-orange" />
                <span className="text-sm font-bold uppercase tracking-widest text-brand-orange">{deals[currentIndex].discount}</span>
              </div>
              <h3 className="text-4xl lg:text-6xl font-serif font-bold mb-6 leading-tight tracking-tighter">
                {deals[currentIndex].title}
              </h3>
              <p className="text-brand-brown/70 text-lg mb-10 max-w-md leading-relaxed">
                {deals[currentIndex].description}
              </p>
              <Link 
                to={`/deal/${deals[currentIndex].slug}`}
                className="bg-brand-brown text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-brand-orange transition-all w-fit shadow-xl active:scale-95 text-center"
              >
                Shop the Deal
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          {deals.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-brand-orange' : 'w-2 bg-brand-brown/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
