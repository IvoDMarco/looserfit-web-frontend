import * as React from 'react';
import Link from 'next/link';
import { Package, LayoutDashboard, Settings, ShoppingCart, ArrowLeft } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LogoutButton from '@/components/admin/LogoutButton';
import Image from 'next/image';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="h-20 flex flex-col justify-center px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/images/home/logo.png" alt="Looserfit" fill className="object-contain" />
            </div>
            <span className="font-heading text-lg tracking-widest font-bold mt-1">Panel del Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 relative flex flex-col">
          <div className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700">
              <LayoutDashboard className="w-5 h-5" /> Panel
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-black text-white">
              <Package className="w-5 h-5" /> Productos
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700">
              <ShoppingCart className="w-5 h-5" /> Pedidos
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700">
              <Settings className="w-5 h-5" /> Configuración
            </Link>


          </div>

          <div className="mt-auto space-y-2">
            <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700">
              <ArrowLeft className="w-5 h-5" /> Volver a la Tienda
            </Link>
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-end px-8">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Hola, {session?.user?.name || 'Admin'}</span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
              {session?.user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
