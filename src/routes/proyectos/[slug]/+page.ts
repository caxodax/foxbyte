import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const { slug } = params;

  try {
    const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/portfolio?key=${apiKey}`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    
    const data = await res.json();
    
    if (!data.documents) {
      throw error(404, 'Proyecto no encontrado');
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

    let matchingProject: any = null;

    for (const doc of data.documents) {
      const id = doc.name.split('/').pop();
      const fields = doc.fields || {};
      
      const parsedData: any = {};
      for (const key in fields) {
        parsedData[key] = parseValue(fields[key]);
      }
      
      const pSlug = slugify(parsedData.title || '');
      if (pSlug === slug || id === slug) {
        matchingProject = { id, slug: pSlug, ...parsedData };
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
