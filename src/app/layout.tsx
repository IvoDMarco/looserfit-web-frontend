import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlobalCartRenderer } from '@/components/cart/GlobalCartRenderer';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Looserfit | Curated Vintage Collection',
  description: 'Premium curated vintage clothing. Unique fits and exclusive streetwear.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="antialiased bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-[#4A5D23] selection:text-white flex flex-col min-h-screen">
        <Toaster richColors position="bottom-right" />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <GlobalCartRenderer />
      </body>
    </html>
  );
}
