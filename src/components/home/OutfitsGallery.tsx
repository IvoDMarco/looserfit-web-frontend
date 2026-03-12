'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const OUTFITS = [
  '/images/home/outfit1.jpg',
  '/images/home/outfit2.jpg',
  '/images/home/outfit3.jpg',
  '/images/home/outfit4.jpg',
  '/images/home/outfit5.jpg',
];

export function OutfitsGallery() {
  return (
    <section className="py-32 mt-12 bg-brand-primary text-brand-accent overflow-hidden z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-heading text-5xl tracking-wider uppercase mb-2">Looserfit Family</h2>
            <p className="text-lg font-light tracking-wide opacity-80">Outfits & looks de nuestra comunidad.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <span className="text-sm tracking-widest uppercase border-b border-brand-accent pb-1">@looserfit.arg</span>
          </div>
        </motion.div>

        {/* Scrolling Gallery (Infinite Marquee) */}
        <div className="relative flex overflow-hidden w-full group py-4">
          <motion.div
            className="flex gap-4 sm:gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...OUTFITS, ...OUTFITS].map((img, i) => (
              <div 
                key={i}
                className="relative min-w-[280px] sm:min-w-[320px] aspect-[4/5] flex-shrink-0 bg-black/20"
              >
                <Image 
                  src={img} 
                  alt={`Outfit from Looserfit Community ${i + 1}`} 
                  fill 
                  className="object-cover img-crisp grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
