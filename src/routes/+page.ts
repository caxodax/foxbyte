import { db } from '$lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function load() {
  try {
    const fetchPromise = getDocs(collection(db, 'portfolio'));
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('TIMEOUT')), 8000)
    );
    
    const querySnapshot = await Promise.race([fetchPromise, timeoutPromise]) as any;
    
    const portfolioItems = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      portfolioItems
    };
  } catch (error) {
    console.error("SSR Error cargando portafolio:", error);
    // Si falla el SSR, devolvemos null para que el cliente haga fallback y muestre el loading o error
    return {
      portfolioItems: null
    };
  }
}
