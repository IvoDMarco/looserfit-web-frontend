'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProducts, deleteProduct } from '@/app/actions/product';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrls: string[];
  variants: { stock: number }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchProducts = async () => {
    const res = await getProducts();
    if (res.success && res.products) {
      setProducts(res.products);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que querés borrar este producto?")) return;
    const res = await deleteProduct(id);
    if (res.success) {
      fetchProducts();
    } else {
      alert("Error al borrar el producto");
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Cargando productos...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
          <p className="text-sm text-gray-500 mt-1">Administrá tu catálogo, inventario y variantes.</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new" className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Agregar Producto
          </Link>
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200 uppercase tracking-widest text-xs font-semibold text-gray-500">
            <tr>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Inventario</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay productos creados todavia.</td>
              </tr>
            )}
            {products.map((prod) => {
              const totalStock = prod.variants.reduce((acc, v) => acc + v.stock, 0);
              const status = totalStock > 0 ? 'Activo' : 'Sin Stock';

              return (
                <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="relative w-12 h-16 bg-gray-100 rounded overflow-hidden">
                      {prod.imageUrls?.[0] ? (
                        <Image src={prod.imageUrls[0]} alt={prod.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{prod.title}</p>
                      <p className="text-gray-500">${prod.price.toLocaleString('es-AR')}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {totalStock > 0 ? `${totalStock} en stock` : <span className="text-red-600">Sin stock</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{prod.category}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button className="hover:text-black transition-colors" title="Editar"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(prod.id)} className="hover:text-red-600 transition-colors" title="Borrar"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
