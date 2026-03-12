'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Search, Menu, User, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { ShoppingBag } from 'lucide-react';

export function Header() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [background, setBackground] = React.useState('transparent');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const cartCount = useCartStore((state) => state.getCartCount());
  const openCart = useCartStore((state) => state.openCart);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setBackground('var(--color-background)');
    } else {
      setBackground('transparent');
    }
  });

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isTransparent = background === 'transparent';
  const textColor = isTransparent ? 'text-white' : 'text-foreground';

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${background !== 'transparent' ? 'backdrop-blur-md shadow-sm' : ''}`}
      style={{ backgroundColor: background === 'transparent' ? 'transparent' : 'rgba(255,255,255,0.95)' }}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex justify-between items-center h-20 relative">

          {/* Mobile Menu & Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button className={`p-2 -ml-2 transition-colors ${textColor}`}>
              <Menu className="w-6 h-6" />
            </button>
            <button className={`p-2 transition-colors ${textColor}`}>
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Nav Dropdown */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium tracking-widest uppercase hover:text-brand-primary transition-colors h-20 ${textColor}`}>
                Menú <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-16 left-0 w-48 bg-white border border-gray-100 shadow-xl py-2 flex flex-col z-50 rounded-md overflow-hidden"
                  >
                    <Link href="/shop" className="px-6 py-3 text-sm font-medium tracking-widest uppercase hover:bg-gray-50 hover:text-brand-primary transition-colors">Tienda</Link>
                    <Link href="/collections" className="px-6 py-3 text-sm font-medium tracking-widest uppercase hover:bg-gray-50 hover:text-brand-primary transition-colors">Colecciones</Link>
                    <Link href="/about" className="px-6 py-3 text-sm font-medium tracking-widest uppercase hover:bg-gray-50 hover:text-brand-primary transition-colors">Nosotros</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Logo (Perfectly Centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <Link href="/" className="pointer-events-auto flex items-center justify-center relative w-[280px] h-[80px] sm:w-[320px] sm:h-[100px]">
              <Image
                src="/images/home/logo.png"
                alt="Looserfit"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right Nav */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button className={`hidden lg:block p-2 hover:text-brand-primary transition-colors ${textColor}`}>
              <Search className="w-5 h-5" />
            </button>
            <Link href="/login" className={`hidden lg:flex items-center p-2 hover:text-brand-primary transition-colors ${textColor}`}>
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={openCart}
              className={`p-2 -mr-2 flex items-center gap-2 hover:text-brand-primary transition-colors ${textColor}`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium hidden sm:block">Carrito ({cartCount})</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
