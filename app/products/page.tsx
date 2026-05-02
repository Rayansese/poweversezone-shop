'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'The Don Heavyweight Hoodie',
    handle: 'don-heavyweight-hoodie',
    price: '$285',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/vendettahoodie/800/1000',
  },
  {
    id: 2,
    name: 'Omertà Oversized Tee',
    handle: 'omerta-oversized-tee',
    price: '$120',
    category: 'Essentials',
    image: 'https://picsum.photos/seed/vendettatee/800/1000',
  },
  {
    id: 3,
    name: 'Capo Zip-Up Jacket',
    handle: 'capo-zip-up-jacket',
    price: '$450',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/vendettajacket/800/1000',
  },
  {
    id: 4,
    name: 'Respect Mock Neck',
    handle: 'respect-mock-neck',
    price: '$165',
    category: 'Essentials',
    image: 'https://picsum.photos/seed/vendettamock/800/1000',
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 md:px-12 bg-neutral-950 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-900 pb-8 gap-6">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-playfair tracking-tight text-white mb-4">
              All Products
            </h1>
            <p className="text-neutral-500 tracking-wide text-sm leading-relaxed">
              The full genesis collection. Filter through our curated selection of outerwear and essentials.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="text-xs font-semibold tracking-[0.15em] uppercase text-white border-b border-[#D4AF37] pb-1">All</button>
            <button className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500 hover:text-white transition-colors pb-1">Outerwear</button>
            <button className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-500 hover:text-white transition-colors pb-1">Essentials</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {PRODUCTS.map((product, i) => (
            <Link href={`/product/${product.handle}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden rounded-none mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                  />
                  {/* Subtle dark gradient internal layer for elegant contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
                
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{product.category}</span>
                    <h3 className="font-medium text-sm tracking-wide text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                  <span className="font-playfair text-lg text-white mb-1 tracking-wider">{product.price}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
