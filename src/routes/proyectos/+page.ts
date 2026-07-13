export async function load({ fetch }) {
  try {
    const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/portfolio?key=${apiKey}`;
    
    const fetchPromise = fetch(url).then(res => {
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return res.json();
    });
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('TIMEOUT')), 8000)
    );
    
    const data = await Promise.race([fetchPromise, timeoutPromise]) as any;
    
    if (!data.documents) {
      return { projects: [] };
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

    const projects = data.documents.map((doc: any) => {
      const id = doc.name.split('/').pop();
      const fields = doc.fields || {};
      
      const parsedData: any = {};
      for (const key in fields) {
        parsedData[key] = parseValue(fields[key]);
      }
      
      const slug = slugify(parsedData.title || '');
      return { id, slug, ...parsedData };
    });
    
    return { projects };
  } catch (error) {
    console.error("SSR Error cargando proyectos en listado via REST:", error);
    return { projects: null };
  }
}
