import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/app/actions/product';

export default async function ShopPage() {
  const res = await getProducts();
  const products = res.success && res.products ? res.products : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">

      {/* Header & Filters Mobile Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
        <h1 className="font-heading text-5xl tracking-widest uppercase mb-4 md:mb-0">Tienda</h1>
        <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-widest">
          <span>Ordenar Por: Más Nuevos</span>
          <span className="hidden md:inline">|</span>
          <button className="underline underline-offset-4">Filtros</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8 hidden md:block">
          <div>
            <h3 className="font-heading text-xl uppercase mb-4">Categorías</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><label className="flex items-center gap-3"><input type="checkbox" className="accent-black w-4 h-4" /> Abrigos</label></li>
              <li><label className="flex items-center gap-3"><input type="checkbox" className="accent-black w-4 h-4" /> Remeras</label></li>
              <li><label className="flex items-center gap-3"><input type="checkbox" className="accent-black w-4 h-4" /> Pantalones</label></li>
              <li><label className="flex items-center gap-3"><input type="checkbox" className="accent-black w-4 h-4" /> Accesorios</label></li>
              <li><label className="flex items-center gap-3"><input type="checkbox" className="accent-black w-4 h-4" /> Calzado</label></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl uppercase mb-4">Talle</h3>
            <div className="grid grid-cols-3 gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className="border border-gray-300 py-2 text-sm hover:bg-black hover:text-white transition-colors">
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {products.map((product: any) => (
            <Link key={product.id} href={`/shop/${product.id}`} className="group cursor-pointer">
              <div className="relative aspect-[3/4] mb-4 bg-gray-100 overflow-hidden">
                <Image
                  src={product.imageUrls?.[0] || '/placeholder.jpg'}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium leading-tight group-hover:underline underline-offset-4">{product.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                </div>
                <span className="text-sm tracking-wider font-semibold">${product.price.toLocaleString('es-AR')}</span>
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
              No hay productos en esta categoría.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
