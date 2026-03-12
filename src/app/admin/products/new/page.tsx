'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, UploadCloud, Plus, X } from 'lucide-react';
import { createProduct } from '@/app/actions/product';
import { uploadImage } from '@/app/actions/upload';
import { toast } from 'sonner';

interface Variant {
  id: string;
  size: string;
  color: string;
  stock: number;
  waist?: number;
  rise?: number;
  thigh?: number;
  length?: number;
  hem?: number;
  shoulders?: number;
  chest?: number;
  sleeve?: number;
}

export default function NewProductPage() {
  const router = useRouter();

  // Basic Info
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('Outerwear');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Variant Generators
  const [sizesInput, setSizesInput] = React.useState('S, M, L');
  const [colorsInput, setColorsInput] = React.useState('Black, Hamilton Brown');
  const [variants, setVariants] = React.useState<Variant[]>([]);

  // Images (Cloudinary mock -> Supabase Storage)
  const [images, setImages] = React.useState<string[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const generateVariants = () => {
    const sizes = sizesInput.split(',').map(s => s.trim()).filter(Boolean);
    const colors = colorsInput.split(',').map(c => c.trim()).filter(Boolean);

    const newVariants: Variant[] = [];
    colors.forEach((color) => {
      sizes.forEach((size) => {
        newVariants.push({
          id: `${size}-${color}-${Date.now()}`,
          size,
          color,
          stock: 0
        });
      });
    });
    setVariants(newVariants);
  };

  const updateVariantField = (id: string, field: keyof Variant, value: string | number | undefined) => {
    setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const removeVariant = (id: string) => {
    setVariants(prev => prev.filter(v => v.id !== id));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await uploadImage(formData);
      if (res.success && res.url) {
        setImages(prev => [...prev, res.url]);
      } else {
        toast.error(res.error || "Error al subir la imagen");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error inesperado al subir la imagen");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Por favor subí al menos una foto del producto.");
      return;
    }

    setIsSubmitting(true);
    const numericPrice = parseFloat(price.replace(/\./g, '').replace(',', '.'));
    const res = await createProduct({
      title: name,
      description,
      price: numericPrice,
      category,
      imageUrls: images,
      variants,
    });

    if (res.success) {
      router.push('/admin/products');
    } else {
      toast.error(res.error || "Error al guardar el producto.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button type="button" onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Agregar Nuevo Producto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Details */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium border-b border-gray-100 pb-2">Detalles Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
              <input
                type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Ej: Vintage Carhartt Jacket" className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio Base ($)</label>
              <input
                type="text" required value={price} onChange={e => {
                  const val = e.target.value;
                  if (/^[0-9.,]*$/.test(val)) setPrice(val);
                }}
                placeholder="Ej: 15.000" className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                value={category} onChange={e => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none bg-white font-sans"
              >
                <option value="Outerwear">Outerwear / Abrigos</option>
                <option value="Tops">Tops / Remeras</option>
                <option value="Bottoms">Bottoms / Pantalones</option>
                <option value="Footwear">Footwear / Calzado</option>
                <option value="Accessories">Accessories / Accesorios</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Ej: Original 1990s Carhartt Detroit Jacket in classic Hamilton Brown..."
              className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none resize-y"
            />
          </div>
        </div>

        {/* Cloudinary Images Integration */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <h2 className="text-lg font-medium">Imágenes del Producto</h2>
            <span className="text-xs text-gray-500 bg-gray-100 py-1 px-2 rounded">Optimizado</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square border border-gray-200 rounded bg-gray-50">
                <Image src={img} alt="Product upload" fill className="object-cover rounded" />
                <button type="button" onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-600 hover:bg-red-50">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button" onClick={triggerFileInput} disabled={isUploading}
              className="aspect-square border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded text-gray-500 hover:border-black hover:text-black transition-colors disabled:opacity-50 relative overflow-hidden"
            >
              <UploadCloud className="w-6 h-6 mb-2" />
              <span className="text-sm">{isUploading ? 'Subiendo...' : 'Subir Imagen'}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageSelected}
            />
          </div>
        </div>

        {/* Dynamic Variants Generator */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium border-b border-gray-100 pb-2">Generador de Variantes</h2>
          <p className="text-sm text-gray-500 -mt-4">Definí las combinaciones de talles y colores para generar el stock y medidas.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Talles (separados por coma)</label>
              <input type="text" value={sizesInput} onChange={e => setSizesInput(e.target.value)} placeholder="S, M, L, XL" className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colores (separados por coma)</label>
              <input type="text" value={colorsInput} onChange={e => setColorsInput(e.target.value)} placeholder="Negro, Verde Oliva, Óxido" className="w-full p-2 border border-gray-300 rounded focus:border-black focus:outline-none" />
            </div>
          </div>
          <Button type="button" variant="outline" onClick={generateVariants} className="w-full border-black border-2 py-6 flex gap-2">
            <Plus className="w-4 h-4" /> Generar Combinaciones
          </Button>

          {variants.length > 0 && (
            <div className="mt-8 border outline outline-1 outline-gray-200 rounded overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 uppercase tracking-widest text-[10px] text-gray-500">
                  <tr>
                    <th className="px-3 py-3 border-b">Talle</th>
                    <th className="px-3 py-3 border-b">Color</th>
                    <th className="px-3 py-3 border-b">Stock</th>

                    {/* Conditionally Render Top vs Bottom vs Footwear Measurements */}
                    {(category === 'Outerwear' || category === 'Tops') && (
                      <>
                        <th className="px-2 py-3 border-b" title="Hombros (cm)">Hombros</th>
                        <th className="px-2 py-3 border-b" title="Axila a axila (cm)">Axila</th>
                        <th className="px-2 py-3 border-b" title="Largo de manga (cm)">Mangas</th>
                        <th className="px-2 py-3 border-b" title="Largo total (cm)">Largo</th>
                      </>
                    )}

                    {category === 'Bottoms' && (
                      <>
                        <th className="px-2 py-3 border-b" title="Cintura (cm)">Cint.</th>
                        <th className="px-2 py-3 border-b" title="Tiro (cm)">Tiro</th>
                        <th className="px-2 py-3 border-b" title="Muslo (cm)">Muslo</th>
                        <th className="px-2 py-3 border-b" title="Largo (cm)">Largo</th>
                        <th className="px-2 py-3 border-b" title="Bota (cm)">Bota</th>
                      </>
                    )}

                    {category === 'Footwear' && (
                      <th className="px-2 py-3 border-b" title="Largo plantilla (cm)">Plantilla (Largo)</th>
                    )}

                    {category === 'Accessories' && (
                      <th className="px-2 py-3 border-b" title="Talle único o medida general">Medida</th>
                    )}

                    <th className="px-2 py-3 border-b w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {variants.map(v => (
                    <tr key={v.id} className="hover:bg-gray-50/50">
                      <td className="px-3 py-3 font-medium">{v.size}</td>
                      <td className="px-3 py-3 text-gray-600">{v.color}</td>
                      <td className="px-3 py-3">
                        <input type="number" min="0" value={v.stock} onChange={(e) => updateVariantField(v.id, 'stock', parseInt(e.target.value) || 0)} className="w-16 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" />
                      </td>

                      {/* Inputs change based on category */}
                      {(category === 'Outerwear' || category === 'Tops') && (
                        <>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.shoulders || ''} onChange={(e) => updateVariantField(v.id, 'shoulders', parseFloat(e.target.value) || undefined)} className="w-16 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.chest || ''} onChange={(e) => updateVariantField(v.id, 'chest', parseFloat(e.target.value) || undefined)} className="w-16 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.sleeve || ''} onChange={(e) => updateVariantField(v.id, 'sleeve', parseFloat(e.target.value) || undefined)} className="w-16 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.length || ''} onChange={(e) => updateVariantField(v.id, 'length', parseFloat(e.target.value) || undefined)} className="w-16 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                        </>
                      )}

                      {category === 'Bottoms' && (
                        <>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.waist || ''} onChange={(e) => updateVariantField(v.id, 'waist', parseFloat(e.target.value) || undefined)} className="w-14 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.rise || ''} onChange={(e) => updateVariantField(v.id, 'rise', parseFloat(e.target.value) || undefined)} className="w-14 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.thigh || ''} onChange={(e) => updateVariantField(v.id, 'thigh', parseFloat(e.target.value) || undefined)} className="w-14 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.length || ''} onChange={(e) => updateVariantField(v.id, 'length', parseFloat(e.target.value) || undefined)} className="w-14 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                          <td className="px-2 py-3"><input type="number" placeholder="cm" value={v.hem || ''} onChange={(e) => updateVariantField(v.id, 'hem', parseFloat(e.target.value) || undefined)} className="w-14 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                        </>
                      )}

                      {category === 'Footwear' && (
                        <td className="px-2 py-3"><input type="number" placeholder="cm (Largo)" value={v.length || ''} onChange={(e) => updateVariantField(v.id, 'length', parseFloat(e.target.value) || undefined)} className="w-20 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                      )}

                      {category === 'Accessories' && (
                        <td className="px-2 py-3"><input type="number" placeholder="Medida" value={v.length || ''} onChange={(e) => updateVariantField(v.id, 'length', parseFloat(e.target.value) || undefined)} className="w-20 p-1 border border-gray-300 rounded text-center focus:border-black focus:outline-none" /></td>
                      )}

                      <td className="px-2 py-3 text-right">
                        <button type="button" onClick={() => removeVariant(v.id)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Global Save */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
          </Button>
        </div>

      </form>
    </div>
  );
}
