'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-neutral-950/90 backdrop-blur-md border-neutral-800/50 py-4'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex-1 hidden md:flex items-center gap-8 text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors duration-300">Home</Link>
            <Link href="/products" className="hover:text-white transition-colors duration-300">Shop Collection</Link>
          </div>

          <button
            className="md:hidden text-neutral-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="font-playfair text-2xl tracking-widest text-[#D4AF37] flex-1 text-center font-bold">
            VENDETTA
          </Link>

          <div className="flex-1 flex items-center justify-end gap-6 text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-300 group"
            >
              <span className="hidden md:block">Cart ({cartItemsCount})</span>
              <ShoppingBag className="w-5 h-5 group-hover:text-[#D4AF37]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-neutral-950 flex flex-col px-6 py-6 md:hidden">
          <div className="flex justify-between items-center mb-16">
            <span className="font-playfair text-xl tracking-widest text-[#D4AF37] font-bold">VENDETTA</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-white">
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
          </div>
          <nav className="flex flex-col gap-8 text-neutral-400 uppercase tracking-widest text-lg font-light">
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Shop All</Link>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Home</Link>
          </nav>
        </div>
      )}
    </>
  );
}
