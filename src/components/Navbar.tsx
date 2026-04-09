import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSanityData } from '../hooks/useSanityData';
import { SITE_SETTINGS_QUERY } from '../lib/sanity';
import { SiteSettings } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const { data: siteSettings } = useSanityData<SiteSettings>(SITE_SETTINGS_QUERY);
  const siteName = siteSettings?.siteName || 'Shehnaz Collection';

  return (
    <nav className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-brown/5">
      <div className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-serif font-bold">{siteName.charAt(0)}</span>
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight">{siteName}</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-brown/70">
          <Link to="/" className="hover:text-brand-brown transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-brand-brown transition-colors">Shop All</Link>
          <Link to="/categories" className="hover:text-brand-brown transition-colors">Categories</Link>
          <Link to="/deals" className="hover:text-brand-brown transition-colors ">Deals</Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartClick}
            className="p-2 hover:bg-brand-beige rounded-full transition-colors relative group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-cream animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
