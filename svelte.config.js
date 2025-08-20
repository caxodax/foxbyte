import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // Opciones por defecto son perfectas para Firebase
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // Opcional, pero bueno para SPAs
      precompress: false
    })
  }
};

export default config;