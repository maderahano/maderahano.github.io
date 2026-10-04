import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages user site (maderahano.github.io) is served from the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Keep hashed bundles apart from the static files copied from /public/assets
    assetsDir: 'bundle',
    target: 'es2020',
    sourcemap: false,
  },
});
