import { Star } from 'lucide-react';
import { useSanityData } from '../hooks/useSanityData';
import { TESTIMONIALS_QUERY, SITE_SETTINGS_QUERY } from '../lib/sanity';
import { SiteSettings } from '../types';

const TESTIMONIALS = [
  { id: '1', name: 'Rasel shikh', rating: 5.0, text: "I've never been disappointed with my purchases! The products are high quality and gentle on my skin.", avatar: 'https://i.pravatar.cc/150?u=rasel' },
  { id: '2', name: 'Sarah shikh', rating: 4.0, text: "This has become my go-to store. The quality is exceptional, and the prices are fair.", avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: '3', name: 'Emily', rating: 4.5, text: "Fast shipping and hassle-free returns. Every order arrived promptly and in excellent condition.", avatar: 'https://i.pravatar.cc/150?u=emily' },
  { id: '4', name: 'Jessica khan', rating: 4.0, text: "I absolutely love the selection. Every product has exceeded my expectations!", avatar: 'https://i.pravatar.cc/150?u=jessica' },
  { id: '5', name: 'Nabila Khan', rating: 5.0, text: "My skin feels healthier and more radiant than ever. The products are gentle, effective.", avatar: 'https://i.pravatar.cc/150?u=nabila' },
  { id: '6', name: 'Farhana Islam', rating: 5.0, text: "I noticed visible results within a few weeks. The quality is amazing, and my skin truly glows naturally now.", avatar: 'https://i.pravatar.cc/150?u=farhana' },
];

export default function Testimonials() {
  const { data: sanityTestimonials, loading } = useSanityData<any[]>(TESTIMONIALS_QUERY);
  const { data: siteSettings } = useSanityData<SiteSettings>(SITE_SETTINGS_QUERY);
  
  const testimonials = sanityTestimonials && sanityTestimonials.length > 0 ? sanityTestimonials : TESTIMONIALS;
  const headline = siteSettings?.reviewsTitle || 'Hear what our happy customers say';
  const subtitle = siteSettings?.reviewsSubtitle || "Our clients love how our products make their skin glow naturally. Here's what they have to say about their experience with us.";

  return (
    <section className="px-8 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">{headline}</h2>
        <p className="text-brand-brown/60 max-w-lg mx-auto text-sm">
          {subtitle}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-8 rounded-[32px] border border-brand-brown/5 shadow-sm hover:shadow-md transition-all flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-orange/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-serif text-lg font-bold">{testimonial.name}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(testimonial.rating) ? 'fill-brand-orange text-brand-orange' : 'text-brand-brown/10'}`} 
                      />
                    ))}
                    <span className="text-[10px] font-bold ml-1">({testimonial.rating.toFixed(1)})</span>
                  </div>
                </div>
              </div>
              <p className="text-brand-brown/70 text-sm leading-relaxed italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
