'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CategoriesGrid } from '@/components/home/CategoriesGrid';
import { OutfitsGallery } from '@/components/home/OutfitsGallery';

interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    imageUrls: string[];
}

const MAIN_IMAGES = [
    '/images/home/main1.jpg',
    '/images/home/main2.jpg',
    '/images/home/main3.jpg',
];

export function HomeClient({ newArrivals }: { newArrivals: Product[] }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

    return (
        <div className="min-h-screen">

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0 w-full h-[120%] grid grid-cols-1 md:grid-cols-3"
                >
                    {MAIN_IMAGES.map((img, idx) => (
                        <div key={idx} className="relative w-full h-full">
                            <Image
                                src={img}
                                alt={`Looserfit Collection ${idx + 1}`}
                                fill
                                className="object-cover object-center img-crisp"
                                priority
                            />
                        </div>
                    ))}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-0 pointer-events-none" />
                    <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
                </motion.div>

                {/* Hero Content */}
                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 30px rgba(255,255,255,0.6)", "0px 0px 0px rgba(255,255,255,0)"]
                                }}
                                transition={{
                                    boxShadow: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                                    scale: { type: "spring", stiffness: 400, damping: 10 }
                                }}
                            >
                                <Link href="/shop" className="inline-flex items-center justify-center bg-transparent border border-white text-white hover:bg-white/20 font-medium uppercase tracking-widest transition-all duration-300 px-8 py-4 text-sm gap-3">
                                    Ver Colección <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Marquee or Sub-hero banner */}
            <div className="bg-brand-primary text-brand-accent py-4 overflow-hidden border-y border-brand-primary/20">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="whitespace-nowrap font-heading text-xl tracking-widest flex gap-8"
                >
                    {[...Array(8)].map((_, i) => (
                        <span key={i}>ENVÍOS A TODO EL PAÍS POR CORREO ARGENTINO / </span>
                    ))}
                </motion.div>
            </div>

            {/* Featured / New Arrivals Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-between items-end mb-12"
                >
                    <h2 className="font-heading text-4xl tracking-wider uppercase text-brand-secondary">Nuevos Ingresos</h2>
                    <Link href="/shop" className="text-sm tracking-widest uppercase border-b border-foreground pb-1 hover:text-brand-primary transition-colors">
                        Ver Todo
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {newArrivals.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/shop/${product.id}`} className="group cursor-pointer block">
                                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                                    <Image
                                        src={product.imageUrls?.[0] || '/placeholder.jpg'}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-medium pr-4 leading-tight group-hover:underline">{product.title}</h3>
                                    <span className="text-sm tracking-wider font-semibold">${product.price.toLocaleString('es-AR')}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                    {newArrivals.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
                            Todavía no hay productos publicados. (¡Cargalos desde el panel Admin!)
                        </div>
                    )}
                </div>
            </section>

            {/* Categories Grid (Modularized) */}
            <CategoriesGrid />

            {/* Outfits Gallery (Community) */}
            <OutfitsGallery />

        </div>
    );
}
