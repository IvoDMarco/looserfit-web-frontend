'use client';

import { useCartStore } from '@/lib/store/cartStore';
import { MiniCart } from '@/components/cart/MiniCart';

export function GlobalCartRenderer() {
    const isOpen = useCartStore((state) => state.isOpen);
    const closeCart = useCartStore((state) => state.closeCart);
    return <MiniCart isOpen={isOpen} onClose={closeCart} />;
}
