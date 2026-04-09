import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSanityData } from '../hooks/useSanityData';
import { SITE_SETTINGS_QUERY } from '../lib/sanity';
import { SiteSettings } from '../types';

export default function Footer() {
  const { data: siteSettings } = useSanityData<SiteSettings>(SITE_SETTINGS_QUERY);
  const siteName = siteSettings?.siteName || 'Shehnaz Collection';
  const siteDescription = siteSettings?.siteDescription || 'We believe in gentle care and natural beauty. Our products are crafted to nourish your skin deeply and help you glow with confidence—every day.';

  return (
    <footer className="bg-brand-beige/50 pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold">{siteName.charAt(0)}</span>
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">{siteName}</span>
          </div>
          <p className="text-brand-brown/60 text-sm leading-relaxed max-w-xs">
            {siteDescription}
          </p>
          <div className="flex items-center gap-4">
            {siteSettings?.facebookUrl && (
              <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {siteSettings?.twitterUrl && (
              <a href={siteSettings.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {siteSettings?.instagramUrl && (
              <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {siteSettings?.youtubeUrl && (
              <a href={siteSettings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-sm">
                <Youtube className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-xl font-bold mb-8">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-brown/60">
            <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-brand-orange transition-colors">Shop</Link></li>
            <li><Link to="/deals" className="hover:text-brand-orange font-bold text-brand-orange transition-colors">Special Deals</Link></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors text-brand-brown/40">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl font-bold mb-8">Get in Touch</h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-brown/60">

            <li className="flex items-start gap-3">
              <span className="font-bold text-brand-brown">Phone:</span>
              <span>{siteSettings?.phoneNumber || '+880 1455852585'}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-brand-brown">Email:</span>
              <span>{siteSettings?.email || 'hello@shehnaz.com'}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-brand-brown/10 text-center text-xs text-brand-brown/40 uppercase tracking-widest">
        © 2026 {siteName} | All Right Reserved
      </div>
    </footer>
  );
}
