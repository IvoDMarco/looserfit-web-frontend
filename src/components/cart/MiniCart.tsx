'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCartStore } from '@/lib/store/cartStore';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCart({ isOpen, onClose }: CartProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const cartCount = useCartStore((state) => state.getCartCount());
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-heading text-2xl tracking-widest uppercase">Tu Carrito ({cartCount})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="tracking-widest uppercase text-sm">Tu carrito está vacío</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-24 aspect-[3/4] bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium pr-4 leading-tight">{item.title}</h3>
                        <span className="text-sm font-medium">${item.price.toLocaleString('es-AR')}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest text-balance">
                        Talle: {item.size} | {item.color}
                      </p>

                      <div className="mt-auto flex justify-between items-center pt-4">
                        <div className="flex items-center border border-gray-200">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-50"><Minus className="w-3 h-3" /></button>
                          <span className="px-4 text-xs font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-50" disabled={item.quantity >= item.stock}><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-xs text-gray-500 underline uppercase tracking-widest hover:text-red-500">Quitar</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between text-sm mb-4">
                <span className="font-medium uppercase tracking-widest">Subtotal</span>
                <span className="font-medium">${cartTotal.toLocaleString('es-AR')}</span>
              </div>
              <p className="text-xs text-gray-500 mb-6 tracking-wide">Impuestos y envíos calculados en el checkout.</p>
              <Button asChild className="w-full" size="lg" disabled={items.length === 0}>
                <Link href="/checkout" onClick={onClose}>Ir a Pagar</Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
