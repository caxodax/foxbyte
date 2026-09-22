import { error } from '@sveltejs/kit';
import { parseFirestoreDoc, slugify } from '$lib/firestoreRest';

export async function load({ params, fetch }) {
  const { slug } = params;

  try {
    const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/portfolio?key=${apiKey}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json() as any;
    if (!data.documents) {
      throw error(404, 'Proyecto no encontrado');
    }

    let matchingProject: any = null;

    for (const doc of data.documents) {
      const parsedData = parseFirestoreDoc(doc);
      const pSlug = slugify(parsedData.title || '');
      if (pSlug === slug || parsedData.id === slug) {
        matchingProject = { ...parsedData, slug: pSlug };
        break;
      }
    }

    if (!matchingProject) {
      throw error(404, 'Proyecto no encontrado');
    }

    return { project: matchingProject };
  } catch (err: any) {
    console.error("Error loading project details via REST:", err);
    if (err.status === 404) {
      throw err;
    }
    throw error(500, 'Error interno del servidor al cargar los detalles del proyecto');
  }
}
