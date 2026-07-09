import { json } from '@sveltejs/kit';
import { uploadImageToR2 } from '$lib/server/cloudflare-r2';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;

        if (!file) {
            return json({ error: 'No se envió ninguna imagen.' }, { status: 400 });
        }

        // Validamos que el archivo sea del tipo correcto
        if (!file.type.startsWith('image/')) {
            return json({ error: 'El archivo debe ser una imagen válida.' }, { status: 400 });
        }

        // Subimos a la carpeta uploads/ por defecto (puedes cambiarlo)
        const publicUrl = await uploadImageToR2(file, 'uploads/');
        
        return json({ success: true, url: publicUrl });
    } catch (error: any) {
        return json({ error: error.message || 'Error interno del servidor.' }, { status: 500 });
    }
};
