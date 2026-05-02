'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useCart } from '@/lib/context/CartContext';
import { Product, ProductVariant } from '@/lib/types';

// Temporarily mock data mapping for Phase 2
const MOCK_PRODUCTS: Record<string, Product> = {
  'don-heavyweight-hoodie': {
    id: '1',
    handle: 'don-heavyweight-hoodie',
    title: 'The Don Heavyweight Hoodie',
    description: 'Crafted from 500gsm French Terry. Garment dyed for a washed, authentic vintage look. Oversized drop-shoulder fit.',
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '285.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '285.00', currencyCode: 'USD' },
    },
    images: {
      edges: [{ node: { url: 'https://picsum.photos/seed/vendettahoodie/800/1000', altText: 'Hoodie' } }],
    },
    variants: {
      edges: [
        { node: { id: 'v1S', title: 'Small', availableForSale: true, price: { amount: '285.00', currencyCode: 'USD' } } },
        { node: { id: 'v1M', title: 'Medium', availableForSale: true, price: { amount: '285.00', currencyCode: 'USD' } } },
        { node: { id: 'v1L', title: 'Large', availableForSale: true, price: { amount: '285.00', currencyCode: 'USD' } } },
        { node: { id: 'v1XL', title: 'X-Large', availableForSale: false, price: { amount: '285.00', currencyCode: 'USD' } } },
      ],
    },
  },
  'omerta-oversized-tee': {
    id: '2',
    handle: 'omerta-oversized-tee',
    title: 'Omertà Oversized Tee',
    description: 'Ultra-heavy cotton blend. Blank perfection with structured drape. Designed to be your daily uniform.',
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '120.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '120.00', currencyCode: 'USD' },
    },
    images: {
      edges: [{ node: { url: 'https://picsum.photos/seed/vendettatee/800/1000', altText: 'Tee' } }],
    },
    variants: {
      edges: [
        { node: { id: 'v2M', title: 'Medium', availableForSale: true, price: { amount: '120.00', currencyCode: 'USD' } } },
        { node: { id: 'v2L', title: 'Large', availableForSale: true, price: { amount: '120.00', currencyCode: 'USD' } } },
      ],
    },
  },
};

export default function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const unwrappedParams = React.use(params);
  const handle = unwrappedParams.handle;
  const product = MOCK_PRODUCTS[handle];
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants.edges[0]?.node || null
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-neutral-950 text-white">
        <div className="text-center">
          <h1 className="font-playfair text-4xl tracking-wider mb-4">Product Not Found</h1>
          <p className="text-neutral-500 uppercase tracking-widest text-xs">The requested archive item could not be located.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedVariant && selectedVariant.availableForSale) {
      addToCart(product, selectedVariant, 1);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-32 bg-neutral-950 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Images Section */}
          <div className="relative aspect-[3/4] w-full bg-neutral-900 overflow-hidden">
            <Image
              src={product.images.edges[0].node.url}
              alt={product.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-center py-12 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-playfair text-4xl md:text-5xl text-white tracking-wide mb-4">
                {product.title}
              </h1>
              <p className="font-playfair text-2xl text-neutral-300 mb-8 tracking-widest">
                ${product.priceRange.minVariantPrice.amount}
              </p>
              
              <div className="w-12 h-px bg-neutral-800 mb-8" />
              
              <p className="text-sm font-light leading-relaxed text-neutral-400 mb-12">
                {product.description}
              </p>

              {/* Variants / Sizes */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white">Size</span>
                  <button className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors underline underline-offset-4">Read Measurement Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.variants.edges.map(({ node: variant }) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.availableForSale}
                      className={`py-4 text-xs tracking-widest uppercase font-medium border transition-all duration-300 ${
                        selectedVariant?.id === variant.id
                          ? 'border-[#D4AF37] text-[#D4AF37] bg-neutral-900/50'
                          : variant.availableForSale
                          ? 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                          : 'border-neutral-900 text-neutral-700 cursor-not-allowed opacity-50 relative'
                      }`}
                    >
                      {variant.title}
                      {!variant.availableForSale && (
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-full h-px bg-neutral-700 rotate-[25deg]"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className={`w-full py-5 text-sm uppercase tracking-[0.2em] font-semibold transition-colors duration-300 ${
                  selectedVariant?.availableForSale
                    ? 'bg-white text-black hover:bg-[#D4AF37] focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:ring-white'
                    : 'bg-neutral-900 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {/* Accordions / Extra Product Info */}
              <div className="mt-16 border-t border-neutral-900">
                <div className="py-6 border-b border-neutral-900">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white">Materials & Construction</span>
                  <p className="mt-4 text-sm text-neutral-500 leading-relaxed font-light">Custom milled heavyweight cotton. Cut and sewn by master artisans. Pre-shrunk for an accurate fit.</p>
                </div>
                <div className="py-6 border-b border-neutral-900">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white">Shipping & Returns</span>
                  <p className="mt-4 text-sm text-neutral-500 leading-relaxed font-light">Complimentary worldwide shipping on orders over $500. All sales are final pending material defect.</p>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
