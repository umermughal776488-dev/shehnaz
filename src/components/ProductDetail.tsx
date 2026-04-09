import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { Product, ProductVariation } from '../types';
import { useSanityData } from '../hooks/useSanityData';
import { PRODUCTS_QUERY } from '../lib/sanity';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  
  // Fetch all products from Sanity to find the one we need
  // (Alternatively, we could create a specific single-product query)
  const { data: sanityProducts, loading } = useSanityData<Product[]>(PRODUCTS_QUERY);

  useEffect(() => {
    // Try to find the product in Sanity data first, then fallback to constants
    const source = sanityProducts && sanityProducts.length > 0 ? sanityProducts : PRODUCTS;
    const foundProduct = source.find(p => p.id === id || (p as any).slug === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.variations && foundProduct.variations.length > 0) {
        setSelectedVariation(foundProduct.variations[0]);
      }
    }
    window.scrollTo(0, 0);
  }, [id, sanityProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-serif">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productToAdd = selectedVariation 
      ? { ...product, price: selectedVariation.price, selectedVariation } 
      : product;
    onAddToCart(productToAdd);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const currentPrice = selectedVariation ? selectedVariation.price : product.price;

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand-brown/60 hover:text-brand-brown mb-12 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Carousel */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-[48px] overflow-hidden bg-brand-beige/30 shadow-inner">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={product.images?.[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {product.images && product.images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {(product.images || [product.image]).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-brand-orange scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-5xl font-serif font-bold mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-brand-orange text-brand-orange' : 'text-brand-brown/10'}`} />
                ))}
                <span className="text-sm font-bold ml-1">{product.rating} Rating</span>
              </div>
              <span className="text-brand-brown/20">|</span>
              <span className="text-sm text-brand-brown/60">Excl. Shipping & Tax</span>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-4xl font-bold">PKR {currentPrice.toFixed(2)}</span>
              {product.oldPrice && !selectedVariation && (
                <span className="text-xl text-brand-brown/30 line-through">PKR {product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-xs text-brand-brown/40 font-medium mb-8 italic">
              * Price does not include shipping costs or applicable taxes.
            </p>

            {/* Variation Selection */}
            {product.variations && product.variations.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-brown/40 mb-4">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.variations.map((variation: any) => (
                    <button
                      key={variation.id || variation.name}
                      onClick={() => setSelectedVariation(variation)}
                      className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${
                        selectedVariation?.id === variation.id || selectedVariation?.name === variation.name
                          ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' 
                          : 'border-brand-brown/5 hover:border-brand-brown/20'
                      }`}
                    >
                      {variation.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-brand-brown/70 leading-relaxed text-lg mb-8">
              {product.description}
            </p>
            
            <button 
              onClick={handleAddToCart}
              className={`w-full py-5 rounded-full text-lg font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                isAdded ? 'bg-green-500 text-white' : 'bg-brand-brown text-white hover:bg-brand-brown/90'
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
                  Add to Cart
                </>
              )}
            </button>
          </div>

          <div className="space-y-8 pt-8 border-t border-brand-brown/10">
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h4 className="font-serif text-xl font-bold mb-3">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map(ing => (
                    <span key={ing} className="px-4 py-2 bg-brand-beige rounded-xl text-sm font-medium text-brand-brown/70">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product.usage && (
              <div>
                <h4 className="font-serif text-xl font-bold mb-3">How to Use</h4>
                <p className="text-brand-brown/60 text-sm leading-relaxed">
                  {product.usage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
