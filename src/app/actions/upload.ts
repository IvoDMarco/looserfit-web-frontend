'use server'

import { supabaseAdmin } from '@/lib/supabase'

export async function uploadImage(formData: FormData) {
    try {
        const file = formData.get('file') as File
        if (!file) return { success: false, error: 'No se encontró el archivo.' }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

        const { data, error } = await supabaseAdmin.storage
            .from('product-images')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (error) {
            console.error('Supabase upload error:', error)
            return { success: false, error: error.message }
        }

        const { data: publicUrlData } = supabaseAdmin.storage
            .from('product-images')
            .getPublicUrl(fileName)

        return { success: true, url: publicUrlData.publicUrl }
    } catch (error) {
        console.error('Upload catch error:', error)
        return { success: false, error: 'Error del servidor al subir la imagen.' }
    }
}
