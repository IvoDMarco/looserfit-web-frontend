import * as React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductById } from '@/app/actions/product';
import { ProductClient } from '@/components/shop/ProductClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const res = await getProductById(unwrappedParams.slug);

  if (!res.success || !res.product) {
    return {
      title: 'Producto no encontrado | Looserfit',
    }
  }

  const p = res.product;
  const imageUrl = p.imageUrls?.[0] || 'https://looserfit.com/og-default.jpg';
  const priceFormatted = `$${p.price.toLocaleString('es-AR')}`;

  return {
    title: `${p.title} | Looserfit`,
    description: p.description || `Comprá ${p.title} por ${priceFormatted} en Looserfit. Ropa vintage premium curada.`,
    openGraph: {
      title: `${p.title} - ${priceFormatted}`,
      description: p.description || `Ropa vintage curada de alta calidad.`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: p.title,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description || 'Looserfit Vintage',
      images: [imageUrl],
    }
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  // We use slug as the ID currently based on the route Link in Home/Shop
  const unwrappedParams = await params;
  const res = await getProductById(unwrappedParams.slug);

  if (!res.success || !res.product) {
    notFound();
  }

  return <ProductClient product={res.product} />;
}
