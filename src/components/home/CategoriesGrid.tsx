'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const CATEGORIES = [
  { name: 'Calzado', href: '/shop?category=calzado', image: '/images/home/Calzado.jpg' },
  { name: 'Abrigos', href: '/shop?category=abrigos', image: '/images/home/Abrigos.jpg' },
  { name: 'Remeras', href: '/shop?category=remeras', image: '/images/home/Remeras.jpg' },
  { name: 'Accesorios', href: '/shop?category=accesorios', image: '/images/home/Accesorios.jpg' },
  { name: 'Pantalones', href: '/shop?category=pantalones', image: '/images/home/Pantalones.jpg' },
  { name: 'Ofertas', href: '/shop?sale=true', image: '/images/home/Ofertas.jpg' },
];

export function CategoriesGrid() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 2000], [0, -150]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="font-heading text-4xl tracking-widest uppercase">Categorías</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {CATEGORIES.map((cat, i) => {
          return (
            <Link 
              key={cat.name} 
              href={cat.href} 
              className="group relative block overflow-hidden bg-gray-100 aspect-[4/5] md:aspect-square lg:aspect-[3/4]"
            >
              <motion.div className="absolute inset-0 w-full h-full">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 img-crisp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                 <h3 className="text-white font-heading text-3xl sm:text-4xl tracking-widest uppercase drop-shadow-lg scale-95 group-hover:scale-100 transition-transform duration-500">
                   {cat.name}
                 </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
