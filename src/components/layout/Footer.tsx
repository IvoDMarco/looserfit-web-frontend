'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-foreground text-background py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          {/* Logo and Location */}
          <div className="flex flex-col items-start w-full">
            <Link href="/" className="block relative w-[300px] sm:w-[500px] h-[100px] sm:h-[180px] mb-2">
              <Image
                src="/images/home/logo.png"
                alt="Looserfit"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-gray-400 text-sm tracking-widest uppercase font-medium pl-2">
              Buenos Aires, Argentina
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-8 pb-1">
            <Link href="https://instagram.com" className="hover:text-white transition-colors uppercase tracking-widest text-sm text-gray-400">Instagram</Link>
            <Link href="https://tiktok.com" className="hover:text-white transition-colors uppercase tracking-widest text-sm text-gray-400">TikTok</Link>
            <Link href="https://twitter.com" className="hover:text-white transition-colors uppercase tracking-widest text-sm text-gray-400">Twitter</Link>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Looserfit. All rights reserved.</p>
      </div>
    </footer>
  );
}
