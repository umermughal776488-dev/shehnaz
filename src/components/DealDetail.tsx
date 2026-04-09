import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, Check, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Deal, Product } from '../types';
import { useSanityData } from '../hooks/useSanityData';
import { SINGLE_DEAL_QUERY } from '../lib/sanity';

interface DealDetailProps {
  onAddToCart: (product: Product) => void;
}

export default function DealDetail({ onAddToCart }: DealDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  
  const { data: sanityDeal, loading } = useSanityData<Deal>(SINGLE_DEAL_QUERY, { slug });

  useEffect(() => {
    if (sanityDeal) {
      setDeal(sanityDeal);
    }
    window.scrollTo(0, 0);
  }, [sanityDeal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-serif">Deal not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Map Deal to a Product-like object for the cart
    const mappedProduct: Product = {
      id: deal.id,
      name: deal.title,
      price: deal.price,
      oldPrice: deal.originalPrice,
      image: deal.image,
      images: [deal.image],
      category: 'Exclusive Deal',
      description: deal.description,
      rating: 5,
      ingredients: [],
      usage: 'Refer to deal banner for details.',
    };
    onAddToCart(mappedProduct);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <Link to="/deals" className="inline-flex items-center gap-2 text-sm font-medium text-brand-brown/60 hover:text-brand-brown mb-12 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to All Deals
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Deal Banner */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden bg-brand-beige/30 shadow-inner group">
             <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 left-8">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white text-lg font-bold rounded-full shadow-lg">
                  <Tag className="w-5 h-5" />
                  {deal.discount}
                </span>
              </div>
          </div>
        </div>

        {/* Deal Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
              Limited Time Offer
            </span>
            <h1 className="text-5xl font-serif font-bold mb-4 leading-tight">{deal.title}</h1>
            <div className="flex items-center gap-4">
               <span className="text-sm text-brand-brown/60 font-medium">Exclusive Shehnaz Collection Deal</span>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-bold text-brand-orange">PKR {deal.price.toFixed(2)}</span>
              {deal.originalPrice && (
                <span className="text-2xl text-brand-brown/30 line-through">PKR {deal.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-xs text-brand-brown/40 font-medium mb-8 italic">
              * Special promotional price. Limited stock available.
            </p>

            <p className="text-brand-brown/70 leading-relaxed text-xl mb-12 font-light">
              {deal.description}
            </p>
            
            <button 
              onClick={handleAddToCart}
              className={`w-full py-6 rounded-full text-xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-2xl ${
                isAdded ? 'bg-green-500 text-white' : 'bg-brand-brown text-white hover:bg-brand-brown/90 hover:-translate-y-1'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-6 h-6" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Get This Deal Now
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
