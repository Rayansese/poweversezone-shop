'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Quote } from 'lucide-react';

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

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  return (
    <main className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Fallback image if video fails or as placeholder */}
          <Image
            src="https://picsum.photos/seed/darkstreetwear/1920/1080"
            alt="Hero Background"
            fill
            className="object-cover opacity-40 grayscale"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette/gradient overlay for cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/50 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block mb-6 uppercase tracking-[0.3em] text-xs font-semibold text-[#D4AF37]">
              The Genesis Collection
            </span>
            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.9] text-white">
              Absolute <br className="hidden md:block" />
              <span className="italic text-neutral-300">Control</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-sm md:text-base text-neutral-400 uppercase tracking-widest max-w-xl"
          >
            Power isn't given. It's built in the shadows. The uniform for the unapologetic and the driven.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="mt-12"
          >
            <Link
              href="#collection"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10 flex items-center gap-3">
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section id="collection" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto bg-neutral-950">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-900 pb-8 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-playfair tracking-tight text-white mb-4">
              Core Identity
            </h2>
            <p className="text-neutral-500 tracking-wide text-sm leading-relaxed">
              Precision tailored garments designed to demand respect. No logos. No noise. Just the undeniable weight of quality.
            </p>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400 hover:text-white transition-colors"
          >
            View Entire Archive
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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
      </section>

      {/* Editorial / Quote Section */}
      <section className="relative py-40 border-y border-neutral-900 overflow-hidden flex items-center justify-center">
        {/* Background dark texture placeholder */}
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/marble/1920/1080?grayscale')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        </div>

        <div className="relative z-10 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <Quote className="w-10 h-10 text-[#D4AF37] opacity-60 mb-8" />
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-7xl leading-[1.2] text-neutral-100 mb-10">
              "A man who doesn't spend time with his ambition can never be a real man."
            </h2>
            <div className="w-12 h-px bg-[#D4AF37]/50 mb-6" />
            <p className="uppercase tracking-[0.2em] text-xs font-semibold text-neutral-400">
              The Code &middot; Volume I
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lookbook / Dual Image Feature */}
      <section className="py-24 px-4 md:px-12 max-w-[1600px] mx-auto bg-neutral-950">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 items-center">
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden">
             <Image 
                src="https://picsum.photos/seed/sigma1/1000/1200"
                alt="Campaign Look"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
                referrerPolicy="no-referrer"
             />
          </div>
          <div className="flex flex-col justify-center max-w-lg mt-12 lg:mt-0 lg:pl-16">
            <span className="uppercase tracking-[0.2em] text-[#D4AF37] text-xs font-semibold mb-6">Editorial</span>
            <h2 className="font-playfair text-4xl md:text-6xl text-white leading-tight mb-8">
              Legacy Formed In Silence.
            </h2>
            <p className="text-neutral-400 text-sm leading-loose mb-10 font-light">
              We reject the loud, the flashy, and the fast. We craft modern armor for the orchestrators, the planners, and the silent executors. It’s not just streetwear; it is a manifestation of the ruthless pursuit of excellence.
            </p>
            <Link
              href="/"
              className="border-b border-white hover:border-[#D4AF37] pb-2 inline-flex items-center gap-3 w-max text-xs uppercase tracking-[0.2em] font-semibold text-white hover:text-[#D4AF37] transition-colors"
            >
              Read The Manifesto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
