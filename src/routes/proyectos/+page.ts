import { parseFirestoreDoc, slugify } from '$lib/firestoreRest';

export async function load({ fetch }) {
  try {
    const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/portfolio?key=${apiKey}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json() as any;
    if (!data.documents) {
      return { projects: [] };
    }

    const projects = data.documents.map((doc: any) => {
      const parsedData = parseFirestoreDoc(doc);
      return { ...parsedData, slug: slugify(parsedData.title || '') };
    });

    return { projects };
  } catch (error) {
    console.error("SSR Error cargando proyectos en listado via REST:", error);
    return { projects: null };
  }
}
