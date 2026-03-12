'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function AboutUsSection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">

      {/* Title Area */}
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-6xl tracking-widest uppercase text-brand-secondary mb-4"
        >
          Quienes Somos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto"
        >
          Curadores de prendas vintage y ropa de diseño. Buscamos piezas únicas, auténticas y con historia.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Column: Story & Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h3 className="font-heading text-2xl tracking-wider mb-3">Nuestra Historia</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Looserfit nació de la pasión por la ropa que cuenta algo más. Empezamos buscando joyitas en ferias para nosotros mismos y hoy nos dedicamos a traerles una selección rigurosa de marcas icónicas: Nike vintage, Carhartt, Dickies, Polo Ralph Lauren, Adidas y más. No vendemos réplicas, solo la calidad que sobrevive el paso de las décadas.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-2xl tracking-wider mb-3">Detrás de Escena</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Cada prenda pasa por un proceso de curaduría profundo. Lavamos, planchamos, reparamos (si es necesario y suma al carácter de la prenda) y documentamos todo. Queremos que la experiencia de comprar vintage sea tan premium como comprar algo nuevo.
            </p>
          </div>
          <div className="bg-gray-50 p-6 border-l-4 border-brand-primary italic">
            <p className="text-gray-700 font-light text-sm">
              &quot;Increíble calidad del buzo que compré. Llegó impecable y perfumado. Definitivamente voy a seguir comprando acá.&quot;
            </p>
            <span className="block mt-4 text-xs font-bold tracking-widest uppercase">— Cliente de Looserfit, ★★★★★</span>
          </div>
        </motion.div>

        {/* Right Column: Imagery Collage */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[600px]"
        >
          {/* Main big image */}
          <div className="absolute top-0 right-0 w-4/5 h-4/5 z-0 bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop"
              alt="Behind the scenes Looserfit"
              fill
              className="object-cover img-crisp"
            />
          </div>

          {/* Overlapping smaller image */}
          <div className="absolute bottom-0 left-0 w-3/5 h-[50%] z-10 border-8 border-white bg-gray-100 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600&auto=format&fit=crop"
              alt="Looserfit Store details"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute top-1/2 left-[-10%] w-32 h-32 bg-brand-primary text-brand-accent rounded-full flex items-center justify-center font-heading text-lg tracking-widest uppercase transform -translate-y-1/2 shadow-lg z-20">
            Since 2021
          </div>
        </motion.div>

      </div>
    </section>
  );
}
