'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/lib/store/cartStore';
import { toast } from 'sonner';

interface Variant {
    id: string;
    size: string;
    color: string;
    stock: number;
    waist?: number | null;
    rise?: number | null;
    thigh?: number | null;
    length?: number | null;
    hem?: number | null;
}

interface Product {
    id: string;
    title: string;
    description?: string | null;
    price: number;
    category: string;
    imageUrls: string[];
    variants: Variant[];
}

export function ProductClient({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = React.useState(product.variants[0]?.size || '');
    const [mainImage, setMainImage] = React.useState(0);
    const [showSizeChart, setShowSizeChart] = React.useState(false);
    const [isAdding, setIsAdding] = React.useState(false);

    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        const selectedVariant = product.variants.find(v => v.size === selectedSize);
        if (!selectedVariant || selectedVariant.stock === 0) return;

        setIsAdding(true);

        // Simulate slight network/processing delay for UI polish
        setTimeout(() => {
            addItem({
                id: `${product.id}-${selectedVariant.size}`,
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.imageUrls?.[0] || '/placeholder.jpg',
                size: selectedVariant.size,
                color: selectedVariant.color,
                quantity: 1,
                stock: selectedVariant.stock
            });
            setIsAdding(false);
            toast.success('Agregado al carrito', {
                description: `${product.title} (${selectedVariant.size})`,
                position: 'bottom-right'
            });
        }, 400);
    };

    const imagesToShow = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : ['/placeholder.jpg'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-24">

                {/* Left: Product Images */}
                <div className="w-full md:w-1/2 flex gap-4">
                    <div className="flex flex-col gap-4 w-20 flex-shrink-0">
                        {imagesToShow.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setMainImage(idx)}
                                className={`relative aspect-[3/4] overflow-hidden border-2 transition-colors ${mainImage === idx ? 'border-brand-primary' : 'border-transparent'}`}
                            >
                                <Image src={img} alt={`Miniatura ${idx}`} fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                    <div className="relative flex-grow aspect-[3/4] bg-gray-100 overflow-hidden">
                        <Image
                            src={imagesToShow[mainImage]}
                            alt={product.title}
                            fill
                            className="object-cover img-crisp"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Right: Product Details & Actions */}
                <div className="w-full md:w-1/2 flex flex-col pt-4">
                    <div className="mb-2 text-sm text-gray-500 uppercase tracking-widest">{product.category}</div>
                    <h1 className="font-heading text-4xl lg:text-5xl uppercase tracking-widest mb-4 text-balance">
                        {product.title}
                    </h1>
                    <p className="text-xl tracking-wider mb-8 font-semibold">${product.price.toLocaleString('es-AR')}</p>

                    {product.variants[0] && (
                        <div className="mb-8">
                            <h3 className="text-sm font-medium uppercase tracking-widest mb-3">Color</h3>
                            <p className="text-sm text-gray-600">{product.variants[0].color}</p>
                        </div>
                    )}

                    <div className="mb-10">
                        <div className="flex justify-between mb-3">
                            <h3 className="text-sm font-medium uppercase tracking-widest">Seleccionar Talle</h3>
                            <button
                                onClick={() => setShowSizeChart(!showSizeChart)}
                                className="text-sm underline text-gray-500 hover:text-black transition-colors"
                            >
                                {showSizeChart ? 'Ocultar Medidas' : 'Guía de Talles'}
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {product.variants.map((v) => (
                                <button
                                    key={v.size}
                                    disabled={v.stock === 0}
                                    onClick={() => setSelectedSize(v.size)}
                                    className={`py-3 text-sm font-medium transition-colors border
                    ${v.stock === 0 ? 'opacity-40 cursor-not-allowed bg-gray-100 border-gray-200' :
                                            selectedSize === v.size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}
                  `}
                                >
                                    {v.size} {v.stock === 0 && <span className="block text-[10px] mt-1 font-normal uppercase text-gray-500">Agotado</span>}
                                </button>
                            ))}
                        </div>

                        {/* Expandable Size Chart */}
                        {showSizeChart && product.variants.length > 0 && (
                            <div className="overflow-x-auto border outline outline-1 outline-gray-200 rounded text-sm mb-6 animate-in slide-in-from-top-2 fade-in duration-300">
                                <table className="w-full text-left whitespace-nowrap">
                                    <thead className="bg-gray-50 uppercase tracking-widest text-[10px] text-gray-500 border-b">
                                        <tr>
                                            <th className="px-3 py-3 font-semibold">Talle</th>
                                            <th className="px-3 py-3 font-semibold">Cintura</th>
                                            <th className="px-3 py-3 font-semibold">Tiro</th>
                                            <th className="px-3 py-3 font-semibold">Muslo</th>
                                            <th className="px-3 py-3 font-semibold">Largo</th>
                                            <th className="px-3 py-3 font-semibold">Bota</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {product.variants.map((v) => (
                                            <tr key={v.id} className={`hover:bg-gray-50/50 ${selectedSize === v.size ? 'bg-gray-50' : ''}`}>
                                                <td className="px-3 py-3 font-medium">{v.size}</td>
                                                <td className="px-3 py-3 text-gray-600">{v.waist ? `${v.waist}cm` : '-'}</td>
                                                <td className="px-3 py-3 text-gray-600">{v.rise ? `${v.rise}cm` : '-'}</td>
                                                <td className="px-3 py-3 text-gray-600">{v.thigh ? `${v.thigh}cm` : '-'}</td>
                                                <td className="px-3 py-3 text-gray-600">{v.length ? `${v.length}cm` : '-'}</td>
                                                <td className="px-3 py-3 text-gray-600">{v.hem ? `${v.hem}cm` : '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 mb-12">
                        <Button
                            size="lg"
                            className={`w-full transition-all duration-300 ${isAdding ? 'bg-green-600 hover:bg-green-700 scale-[0.98]' : ''}`}
                            onClick={handleAddToCart}
                            disabled={isAdding || product.variants.every(v => v.stock === 0)}
                        >
                            {isAdding ? 'Agregando...' : 'Agregar al Carrito'}
                        </Button>
                        <p className="text-xs text-center text-gray-500 uppercase tracking-widest">Envío gratis en compras superiores a $150,000</p>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                        <h3 className="font-heading text-lg uppercase tracking-widest mb-4">Descripción</h3>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed whitespace-pre-wrap">
                            {product.description || 'Sin descripción detallada para este producto.'}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
