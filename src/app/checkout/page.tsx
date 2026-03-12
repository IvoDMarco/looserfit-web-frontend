'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/lib/store/cartStore';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.getCartTotal());

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32 flex flex-col lg:flex-row gap-12">

        {/* Left: Form */}
        <div className="w-full lg:w-3/5">
          <h1 className="font-heading text-4xl tracking-widest uppercase mb-8">Finalizar Compra</h1>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <section>
              <h2 className="text-lg font-medium mb-4 uppercase tracking-widest border-b pb-2">Información de Contacto</h2>
              <input type="email" placeholder="Correo electrónico" className="w-full p-3 border border-gray-300 rounded-none focus:outline-none focus:border-black transition-colors" />
            </section>

            <section>
              <h2 className="text-lg font-medium mb-4 uppercase tracking-widest border-b pb-2">Dirección de Envío</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" className="p-3 border border-gray-300 rounded-none focus:outline-none focus:border-black" />
                <input type="text" placeholder="Apellido" className="p-3 border border-gray-300 rounded-none focus:outline-none focus:border-black" />
                <input type="text" placeholder="Dirección" className="col-span-2 p-3 border border-gray-300 rounded-none focus:outline-none focus:border-black" />
                <input type="text" placeholder="Ciudad" className="p-3 border border-gray-300 rounded-none focus:outline-none focus:border-black" />
                <input type="text" placeholder="Código Postal" className="p-3 border border-gray-300 rounded-none focus:outline-none focus:border-black" />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium mb-4 uppercase tracking-widest border-b pb-2">Pago</h2>
              <div className="p-6 bg-gray-50 border border-gray-200 text-center">
                <p className="text-sm text-gray-500 mb-4">Mercado Pago / Transferencia Bancaria se inyectarán aquí en futuras actualizaciones.</p>
                <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </section>

            <Button size="lg" className="w-full" disabled={items.length === 0}>
              Pagar ${cartTotal.toLocaleString('es-AR')}
            </Button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-2/5 bg-gray-50 p-8 h-fit sticky top-32">
          <h2 className="text-lg font-medium mb-6 uppercase tracking-widest">Resumen del Pedido</h2>

          <div className="max-h-80 overflow-y-auto mb-6 pr-2">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No hay productos en el carrito.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                  <div className="relative w-16 aspect-[3/4] bg-gray-200 flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium pr-2 leading-tight">{item.title}</h3>
                      <span className="text-sm font-medium whitespace-nowrap">${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Talle: {item.size}</p>
                    <p className="text-xs text-gray-500 mt-1">Cant: {item.quantity}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-3 text-sm border-y border-gray-200 py-6 mb-6">
            <div className="flex justify-between"><span>Subtotal</span><span>${cartTotal.toLocaleString('es-AR')}</span></div>
            <div className="flex justify-between"><span>Envío</span><span>A calcular</span></div>
          </div>

          <div className="flex justify-between text-lg font-medium uppercase tracking-widest">
            <span>Total</span>
            <span>${cartTotal.toLocaleString('es-AR')}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
