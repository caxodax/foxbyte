import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase, leída de forma segura desde las variables de entorno.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID
};

// Inicializa Firebase, pero evita reinicializar si ya existe (importante para HMR en desarrollo)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Exporta el servicio de Firestore para que podamos usarlo en nuestros componentes
export const db = getFirestore(app);