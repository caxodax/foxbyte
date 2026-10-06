import type { PageLoad } from './$types';
import { servicesExtendedData } from '$lib/servicesData';
import { parseFirestoreDoc, getServiceSlug, slugify } from '$lib/firestoreRest';

export const load: PageLoad = async ({ fetch }) => {
  const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;

  // Fallback estático seguro de servicios sin claves duplicadas
  const fallbackServices = Object.entries(servicesExtendedData).map(([slug, detail]) => ({
    ...detail,
    id: slug,
    slug,
    title: detail.commercialTitle,
    icon_svg: ''
  }));

  // Carga paralela de portfolio y services con AbortSignal nativo de 8s
  const fetchCollection = async (collectionName: string) => {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}?key=${apiKey}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${collectionName}`);
    const data = await res.json() as any;
    if (!data.documents) return [];
    return data.documents.map((doc: any) => parseFirestoreDoc(doc));
  };

  const [portfolioResult, servicesResult] = await Promise.allSettled([
    fetchCollection('portfolio'),
    fetchCollection('services')
  ]);

  let portfolioItems: any[] | null = null;
  if (portfolioResult.status === 'fulfilled' && portfolioResult.value) {
    portfolioItems = portfolioResult.value.map((item: any) => {
      const slug = item.slug || slugify(item.title || item.id || '');
      const isPrivate = Boolean(
        item.is_private || 
        item.isPrivate || 
        item.confidential || 
        item.category?.toLowerCase().includes('nda') ||
        item.category?.toLowerCase().includes('confidencial')
      );
      return {
        ...item,
        slug,
        isPrivate
      };
    });
  } else if (portfolioResult.status === 'rejected') {
    console.error("SSR Error cargando portafolio:", portfolioResult.reason);
  }

  let services: any[] = fallbackServices;
  if (servicesResult.status === 'fulfilled' && servicesResult.value.length > 0) {
    services = servicesResult.value.map((item: any) => {
      const slug = getServiceSlug(item.title || '');
      const extended = servicesExtendedData[slug] || {};
      return {
        ...extended,
        ...item,
        slug
      };
    });
  } else if (servicesResult.status === 'rejected') {
    console.error("SSR Error cargando servicios, usando fallback extendido:", servicesResult.reason);
  }

  return {
    portfolioItems,
    services
  };
};
