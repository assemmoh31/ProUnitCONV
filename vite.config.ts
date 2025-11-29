import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are linked correctly on GitHub Pages
  define: {
    'process.env': {} // Polyfill to prevent crashes in libraries expecting node env
  }
});