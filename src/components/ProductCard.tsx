import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white p-3 md:p-4 rounded-[24px] md:rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-brown/5">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square rounded-[18px] md:rounded-[24px] overflow-hidden mb-3 md:mb-4 bg-brand-beige/30">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded-full flex items-center gap-1">
            <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-brand-orange text-brand-orange" />
            <span className="text-[9px] md:text-[10px] font-bold">({product.rating})</span>
          </div>
        </div>
      </Link>
      
      <div className="flex flex-col gap-1.5 md:gap-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-sm md:text-lg font-bold group-hover:text-brand-orange transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-2">
            <span className="text-sm md:text-lg font-bold">PKR {product.price.toFixed(0)}</span>
            {product.oldPrice && (
              <span className="text-[10px] md:text-xs text-brand-brown/40 line-through">PKR {product.oldPrice.toFixed(0)}</span>
            )}
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-brand-orange text-white p-1.5 md:p-2 rounded-lg md:rounded-xl hover:bg-brand-orange/90 transition-all transform hover:scale-110 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

