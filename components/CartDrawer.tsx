'use client';

import React from 'react';
import { useCart } from '@/lib/context/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, createCheckout, isCreatingCheckout } = useCart();

  const handleCheckout = async () => {
    await createCheckout();
    // In real app: window.location.href = checkoutUrl;
    alert("In a real environment, this redirects to the secure Shopify Checkout URL.");
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-neutral-950 border-l border-neutral-900 shadow-2xl z-[60] flex flex-col transform transition-transform duration-500 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b border-neutral-900">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-playfair text-xl tracking-wider text-white">Your Cart</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500 gap-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="uppercase tracking-widest text-xs font-semibold">Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-3 border border-neutral-800 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-xs tracking-widest uppercase"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-neutral-900/50 border border-neutral-800/50">
                <div className="relative w-20 h-24 bg-neutral-800">
                  <Image 
                    src={item.product.images.edges[0]?.node.url || 'https://picsum.photos/400'} 
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                        {item.product.title}
                      </h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-red-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {item.variant.title !== 'Default Title' && (
                      <p className="text-xs text-neutral-400 mt-1">{item.variant.title}</p>
                    )}
                    <p className="font-playfair text-white mt-2">${item.variant.price.amount}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 border border-neutral-800 w-max mt-3">
                    <button 
                      className="p-2 text-neutral-400 hover:text-white"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      className="p-2 text-neutral-400 hover:text-white"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-900 bg-neutral-950">
            <div className="flex justify-between items-center mb-6 text-sm text-white">
              <span className="uppercase tracking-widest text-xs text-neutral-400">Subtotal</span>
              <span className="font-playfair text-xl">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isCreatingCheckout}
              className="w-full py-4 bg-white text-black font-semibold uppercase tracking-[0.2em] text-xs hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-800 disabled:text-neutral-500"
            >
              {isCreatingCheckout ? 'Preparing Order...' : 'Proceed to Checkout'}
            </button>
            <p className="text-center text-[10px] text-neutral-500 mt-4 uppercase tracking-widest">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
