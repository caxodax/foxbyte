import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '$env/dynamic/private';
import { env as envPublic } from '$env/dynamic/public';

// Initialize the S3 Client for Cloudflare R2
const s3 = new S3Client({
    region: 'auto',
    endpoint: env.CLOUDFLARE_R2_S3_ENDPOINT || '',
    credentials: {
        accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
        secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
    }
});

/**
 * Sube un archivo a Cloudflare R2
 * @param file El objeto File nativo a subir
 * @param folder La carpeta opcional dentro del bucket (ej. "admin/")
 * @returns La URL pública de la imagen
 */
export async function uploadImageToR2(file: File, folder: string = ''): Promise<string> {
    if (!env.CLOUDFLARE_R2_BUCKET_NAME || !envPublic.PUBLIC_CLOUDFLARE_R2_DEV_URL) {
        throw new Error("Variables de Cloudflare R2 no están configuradas.");
    }

    const arrayBuffer = await file.arrayBuffer();
    const body = new Uint8Array(arrayBuffer);
    
    // Generamos un nombre único para evitar que se sobreescriban
    const ext = file.name.split('.').pop() || 'jpg';
    const uniqueId = crypto.randomUUID();
    const fileName = `${folder}${uniqueId}.${ext}`;

    const command = new PutObjectCommand({
        Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: fileName,
        Body: body,
        ContentType: file.type,
    });

    try {
        await s3.send(command);
        // Retornamos la URL final desde donde el frontend podrá verla
        return `${envPublic.PUBLIC_CLOUDFLARE_R2_DEV_URL}/${fileName}`;
    } catch (error) {
        console.error("Error subiendo a R2:", error);
        throw new Error("Fallo la subida al servidor de imágenes.");
    }
}
