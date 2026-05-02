'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant } from '../types';

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  checkoutUrl: string | null;
  createCheckout: () => Promise<void>;
  isCreatingCheckout: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('vendetta_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('vendetta_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.merchandiseId === variant.id
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity
        };
        return newCart;
      }

      return [
        ...prevCart,
        {
          id: Math.random().toString(36).substring(7),
          merchandiseId: variant.id,
          product,
          variant,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Prepares the cart for Shopify Checkout (Phase 3) 
  // and gives a simulated URL for development (Phase 2)
  const createCheckout = async () => {
    setIsCreatingCheckout(true);
    
    // In a fully integrated environment, we would call the CREATE_CART_MUTATION here.
    // Const lineItems = cart.map(item => ({ merchandiseId: item.variant.id, quantity: item.quantity }))
    // const response = await shopifyFetch({ query: CREATE_CART_MUTATION, variables: { lineItems }})
    // const url = response.body.data.cartCreate.cart.checkoutUrl;
    
    // For now, we simulate network latency and return a placeholder checkout
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Simulated checkout URL
        const mockCheckoutUrl = "/checkout-simulation"; // You would redirect to Shopify's URL here
        setCheckoutUrl(mockCheckoutUrl);
        setIsCreatingCheckout(false);
        resolve();
      }, 1000);
    });
  };

  const cartTotal = cart.reduce(
    (total, item) => total + parseFloat(item.variant.price.amount) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        checkoutUrl,
        createCheckout,
        isCreatingCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
