'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

import { z } from 'zod'

const VariantSchema = z.object({
  size: z.string().min(1, 'El talle es requerido'),
  color: z.string().min(1, 'El color es requerido'),
  stock: z.coerce.number().int().min(0),
  waist: z.coerce.number().optional(),
  rise: z.coerce.number().optional(),
  thigh: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  hem: z.coerce.number().optional(),
  shoulders: z.coerce.number().optional(),
  chest: z.coerce.number().optional(),
  sleeve: z.coerce.number().optional()
})

const ProductSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  price: z.coerce.number().min(0, 'El precio no puede ser negativo'),
  description: z.string().optional(),
  category: z.string().min(1, 'La categoría es requerida'),
  imageUrls: z.array(z.string()).min(1, 'Debe haber al menos 1 imagen'),
  variants: z.array(VariantSchema)
})

export async function createProduct(rawData: unknown) {
  try {
    const parsedData = ProductSchema.safeParse(rawData)
    
    if (!parsedData.success) {
      console.error('Validation Error', parsedData.error.format())
      return { success: false, error: 'Datos no válidos. Revisa el formulario.' }
    }

    const data = parsedData.data

    const product = await prisma.product.create({
      data: {
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        imageUrls: data.imageUrls,
        variants: {
          create: data.variants.map((v) => ({
            size: v.size,
            color: v.color,
            stock: v.stock,
            waist: v.waist,
            rise: v.rise,
            thigh: v.thigh,
            length: v.length,
            hem: v.hem,
            shoulders: v.shoulders,
            chest: v.chest,
            sleeve: v.sleeve,
          })),
        },
      },
    })

    // Purge cache to reflect new product immediately
    revalidatePath('/admin/products')
    revalidatePath('/shop')
    revalidatePath('/')

    return { success: true, product }
  } catch (error) {
    console.error('Failed to create product:', error)
    return { success: false, error: 'Failed to create product via Prisma' }
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, products }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return { success: false, products: [], error: 'Failed to fetch products' }
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
      },
    })
    return { success: true, product }
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return { success: false, product: null, error: 'Failed to fetch product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    })
    revalidatePath('/admin/products')
    revalidatePath('/shop')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete product:', error)
    return { success: false, error: 'Failed to delete product' }
  }
}
