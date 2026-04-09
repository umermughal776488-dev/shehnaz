/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Categories from './components/Categories';
import Deals from './components/Deals';
import DealsPage from './components/DealsPage';
import DealDetail from './components/DealDetail';
import { Product, CartItem } from './types';

const AdminRedirect = () => {
  useEffect(() => {
    window.location.replace('https://shehnazcollection.sanity.studio/');
  }, []);
  return null;
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('shehnaz_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('shehnaz_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      // Check if same product with SAME variation exists
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedVariation?.id === (product as any).selectedVariation?.id
      );
      
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedVariation?.id === (product as any).selectedVariation?.id)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 } as CartItem];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-brand-cream selection:bg-brand-orange/30 selection:text-brand-brown">
        <Navbar 
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
          onCartClick={() => setIsCartOpen(true)} 
        />
        
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Deals />
              <ProductGrid onAddToCart={handleAddToCart} />
              <Testimonials />
            </main>
          } />
          <Route path="/shop" element={
            <main className="pt-12">
              <ProductGrid onAddToCart={handleAddToCart} />
            </main>
          } />
          <Route path="/categories" element={
            <main className="pt-12">
              <Categories />
            </main>
          } />
          <Route path="/product/:id" element={
            <main className="pt-12">
              <ProductDetail onAddToCart={handleAddToCart} />
            </main>
          } />
          <Route path="/deals" element={
            <main className="pt-12">
              <DealsPage />
            </main>
          } />
          <Route path="/deal/:slug" element={
            <main className="pt-12">
              <DealDetail onAddToCart={handleAddToCart} />
            </main>
          } />
          <Route path="/admin" element={<AdminRedirect />} />
        </Routes>

        <Footer />

        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
        />
      </div>
    </BrowserRouter>
  );
}

