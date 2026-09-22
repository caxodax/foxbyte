export function parseFirestoreValue(val: any): any {
  if (!val) return null;
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return parseInt(val.integerValue, 10);
  if ('doubleValue' in val) return parseFloat(val.doubleValue);
  if ('booleanValue' in val) return val.booleanValue;
  if ('arrayValue' in val) return (val.arrayValue.values || []).map(parseFirestoreValue);
  if ('mapValue' in val) {
    const map: any = {};
    const fields = val.mapValue.fields || {};
    for (const key in fields) map[key] = parseFirestoreValue(fields[key]);
    return map;
  }
  return val;
}

export function parseFirestoreDoc(doc: any): any {
  const id = doc.name?.split('/').pop();
  const fields = doc.fields || {};
  const data: any = { id };
  for (const key in fields) data[key] = parseFirestoreValue(fields[key]);
  return data;
}

export function slugify(text: string): string {
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
}

export function getServiceSlug(title: string): string {
  const t = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (t.includes('e-commerce') || t.includes('ecommerce')) return 'e-commerce';
  if (t.includes('movil') || t.includes('app')) return 'aplicaciones-moviles';
  if (t.includes('base') || t.includes('datos')) return 'bases-de-datos';
  if (t.includes('medida') || t.includes('solucion')) return 'solucion-a-la-medida';
  return t.replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
}

