import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/messages?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          name: { stringValue: String(name).trim() },
          email: { stringValue: String(email).trim() },
          message: { stringValue: String(message).trim() },
          sentAt: { timestampValue: new Date().toISOString() }
        }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Error escribiendo en Firestore REST:', errText);
      return json({ error: 'Error registrando mensaje en la base de datos.' }, { status: 502 });
    }

    return json({ success: true });
  } catch (err: any) {
    console.error('Error interno en /api/contact:', err);
    return json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
};
