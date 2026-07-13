import { servicesExtendedData } from '$lib/servicesData';

export async function load({ fetch }) {
  try {
    const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/services?key=${apiKey}`;
    
    const fetchPromise = fetch(url).then(res => {
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return res.json();
    });
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('TIMEOUT')), 8000)
    );
    
    const data = await Promise.race([fetchPromise, timeoutPromise]) as any;
    
    if (!data.documents) {
      return { services: [] };
    }

    const parseValue = (val: any): any => {
      if (!val) return null;
      if ('stringValue' in val) return val.stringValue;
      if ('integerValue' in val) return parseInt(val.integerValue, 10);
      if ('doubleValue' in val) return parseFloat(val.doubleValue);
      if ('booleanValue' in val) return val.booleanValue;
      if ('arrayValue' in val) {
        return (val.arrayValue.values || []).map(parseValue);
      }
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

    const services = data.documents.map((doc: any) => {
      const id = doc.name.split('/').pop();
      const fields = doc.fields || {};
      
      const parsedData: any = {};
      for (const key in fields) {
        parsedData[key] = parseValue(fields[key]);
      }
      
      const slug = getSlug(parsedData.title || '');
      const extended = servicesExtendedData[slug] || {};
      
      return { 
        id, 
        slug, 
        ...parsedData, 
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
