import { error } from '@sveltejs/kit';
import { servicesExtendedData } from '$lib/servicesData';
import { parseFirestoreDoc, getServiceSlug, slugify } from '$lib/firestoreRest';

export async function load({ params, fetch }) {
  const { slug } = params;
  
  if (!servicesExtendedData[slug]) {
    throw error(404, 'Servicio no encontrado');
  }

  const extended = servicesExtendedData[slug];

  try {
    const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
    
    // 1. Fetch de servicios para obtener los campos de Firestore (como icon_svg o titulo original)
    const servicesUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/services?key=${apiKey}`;
    const servicesRes = await fetch(servicesUrl, { signal: AbortSignal.timeout(8000) });
    let firestoreService: any = null;

    if (servicesRes.ok) {
      const servicesData = await servicesRes.json() as any;
      if (servicesData.documents) {
        for (const doc of servicesData.documents) {
          const parsed = parseFirestoreDoc(doc);
          if (getServiceSlug(parsed.title || '') === slug) {
            firestoreService = parsed;
            break;
          }
        }
      }
    }

    // 2. Fetch de proyectos para proyectos relacionados
    let relatedProjects: any[] = [];
    if (extended.relatedProjectSlugs && extended.relatedProjectSlugs.length > 0) {
      const portfolioUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/portfolio?key=${apiKey}`;
      const portfolioRes = await fetch(portfolioUrl, { signal: AbortSignal.timeout(8000) });
      
      if (portfolioRes.ok) {
        const portfolioData = await portfolioRes.json() as any;
        if (portfolioData.documents) {
          const allProjects = portfolioData.documents.map((doc: any) => {
            const parsed = parseFirestoreDoc(doc);
            return { ...parsed, slug: slugify(parsed.title || '') };
          });

          // Filtrar por los relacionados
          relatedProjects = allProjects.filter(p => 
            extended.relatedProjectSlugs.includes(p.slug) || extended.relatedProjectSlugs.includes(p.id)
          );
        }
      }
    }

    return {
      service: {
        slug,
        title: firestoreService?.title || extended.commercialTitle,
        icon_svg: firestoreService?.icon_svg || '',
        ...extended
      },
      relatedProjects
    };

  } catch (err) {
    console.error("Error loading individual service via REST:", err);
    // Fallback estático
    return {
      service: {
        slug,
        title: extended.commercialTitle,
        icon_svg: '',
        ...extended
      },
      relatedProjects: []
    };
  }
}
