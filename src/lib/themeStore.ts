import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// Store reactivo para el tema global
export const theme = writable<Theme>('light');

/**
 * Inicializa el tema en el cliente leyendo localStorage o por defecto 'light' (Opción B)
 */
export function initTheme(): void {
  if (!browser) return;

  const savedTheme = localStorage.getItem('foxbyte-theme') as Theme | null;
  const initialTheme: Theme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';

  theme.set(initialTheme);
  applyThemeToDOM(initialTheme);
}

/**
 * Conmuta entre Modo Claro (Opción B) y Modo Oscuro (Opción A)
 */
export function toggleTheme(): void {
  if (!browser) return;

  theme.update((current) => {
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('foxbyte-theme', next);
    applyThemeToDOM(next);
    return next;
  });
}

/**
 * Aplica el atributo data-theme en <html> y actualiza color-scheme
 */
function applyThemeToDOM(t: Theme): void {
  if (!browser) return;
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.style.colorScheme = t;
}
