import { error } from '@sveltejs/kit';
import { servicesExtendedData } from '$lib/servicesData';

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
    const servicesRes = await fetch(servicesUrl);
    let firestoreService: any = null;

    if (servicesRes.ok) {
      const servicesData = await servicesRes.json();
      
      const parseValue = (val: any): any => {
        if (!val) return null;
        if ('stringValue' in val) return val.stringValue;
        if ('integerValue' in val) return parseInt(val.integerValue, 10);
        if ('doubleValue' in val) return parseFloat(val.doubleValue);
        if ('booleanValue' in val) return val.booleanValue;
        if ('arrayValue' in val) return (val.arrayValue.values || []).map(parseValue);
        if ('mapValue' in val) {
          const map: any = {};
          const fields = val.mapValue.fields || {};
          for (const key in fields) {
            map[key] = parseValue(fields[key]);
          }
          return map;
        }
        return val;
      };

      const getSlug = (title: string): string => {
        const t = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (t.includes('e-commerce') || t.includes('ecommerce')) return 'e-commerce';
        if (t.includes('movil') || t.includes('app')) return 'aplicaciones-moviles';
        if (t.includes('base') || t.includes('datos')) return 'bases-de-datos';
        if (t.includes('medida') || t.includes('solucion')) return 'solucion-a-la-medida';
        return t.replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
      };

      if (servicesData.documents) {
        for (const doc of servicesData.documents) {
          const fields = doc.fields || {};
          const parsed: any = {};
          for (const key in fields) {
            parsed[key] = parseValue(fields[key]);
          }
          if (getSlug(parsed.title || '') === slug) {
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
      const portfolioRes = await fetch(portfolioUrl);
      
      if (portfolioRes.ok) {
        const portfolioData = await portfolioRes.json();
        
        const parseValue = (val: any): any => {
          if (!val) return null;
          if ('stringValue' in val) return val.stringValue;
          if ('integerValue' in val) return parseInt(val.integerValue, 10);
          if ('doubleValue' in val) return parseFloat(val.doubleValue);
          if ('booleanValue' in val) return val.booleanValue;
          if ('arrayValue' in val) return (val.arrayValue.values || []).map(parseValue);
          if ('mapValue' in val) {
            const map: any = {};
            const fields = val.mapValue.fields || {};
            for (const key in fields) {
              map[key] = parseValue(fields[key]);
            }
            return map;
          }
          return val;
        };

        const slugify = (text: string) => {
          return text
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        };

        if (portfolioData.documents) {
          const allProjects = portfolioData.documents.map((doc: any) => {
            const id = doc.name.split('/').pop();
            const fields = doc.fields || {};
            const parsed: any = {};
            for (const key in fields) {
              parsed[key] = parseValue(fields[key]);
            }
            const pSlug = slugify(parsed.title || '');
            return { id, slug: pSlug, ...parsed };
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
