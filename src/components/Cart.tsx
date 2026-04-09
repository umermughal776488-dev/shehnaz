import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const phoneNumber = "923277529800";
    let message = "*New Order from Shehnaz Collection*\n\n";
    
    items.forEach((item, index) => {
      const variationInfo = item.selectedVariation ? ` (Size: ${item.selectedVariation.name})` : "";
      message += `*${index + 1}. ${item.name}${variationInfo}*\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: PKR ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `*Total Amount: PKR ${total.toFixed(2)}*\n`;
    message += "_(Excl. shipping & taxes)_\n\n";
    message += "Shipping costs will be determined based on my location before the order is confirmed.\n\n";
    message += "Please confirm my order. Thank you!";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-brown/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-cream z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-brand-brown/5 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-brand-orange" />
                <h2 className="text-2xl font-serif font-bold">Your Cart ({items.length})</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-brand-beige rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-24 h-24 bg-brand-beige rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-brand-brown/20" />
                  </div>
                  <div>
                    <p className="text-xl font-serif font-bold mb-2">Your cart is empty</p>
                    <p className="text-sm text-brand-brown/60">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-brand-brown text-white px-8 py-3 rounded-full font-medium hover:bg-brand-brown/90 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 bg-white p-4 rounded-3xl border border-brand-brown/5 shadow-sm group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-brand-beige/30">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif font-bold leading-tight line-clamp-1">{item.name}</h3>
                          {item.selectedVariation && (
                            <p className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-widest mt-1">Size: {item.selectedVariation.name}</p>
                          )}
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="p-1 text-brand-brown/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-brand-orange">PKR {(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center gap-3 bg-brand-beige px-3 py-1 rounded-full">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-brand-orange transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-brand-orange transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-white border-t border-brand-brown/10 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-brand-brown/60">
                    <span>Subtotal</span>
                    <span>PKR {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-brand-brown/60">
                    <span>Shipping</span>
                    <span className="text-brand-brown/40 font-bold uppercase tracking-widest text-[10px]">TBD</span>
                  </div>
                  <div className="p-3 bg-brand-beige/50 rounded-xl border border-brand-brown/5">
                    <p className="text-[10px] text-brand-brown/60 leading-tight italic">
                      * Shipping pricing has not been applied yet. Costs will be determined based on your location before the order is confirmed.
                    </p>
                  </div>
                  <div className="flex justify-between text-xl font-serif font-bold pt-4 border-t border-brand-brown/5">
                    <span>Total</span>
                    <span className="text-brand-orange">PKR {total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-brown text-white py-5 rounded-full text-lg font-bold hover:bg-brand-brown/90 transition-all shadow-xl active:scale-95"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
