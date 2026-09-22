import { servicesExtendedData } from '$lib/servicesData';
import { parseFirestoreDoc, getServiceSlug } from '$lib/firestoreRest';

export async function load({ fetch }) {
  try {
    const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/services?key=${apiKey}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json() as any;
    if (!data.documents) {
      return { services: [] };
    }

    const services = data.documents.map((doc: any) => {
      const parsedData = parseFirestoreDoc(doc);
      const slug = getServiceSlug(parsedData.title || '');
      const extended = servicesExtendedData[slug] || {};

      return {
        ...parsedData,
        slug,
        ...extended
      };
    });

    return { services };
  } catch (error) {
    console.error("SSR Error cargando servicios via REST:", error);
    // Fallback estático con los datos enriquecidos si Firestore falla
    const fallbackServices = Object.entries(servicesExtendedData).map(([slug, detail]) => {
      return {
        id: slug,
        slug,
        title: detail.commercialTitle,
        description: detail.description,
        icon_svg: '', // sin icono, o usar un SVG por defecto
        ...detail
      };
    });
    return { services: fallbackServices };
  }
}
