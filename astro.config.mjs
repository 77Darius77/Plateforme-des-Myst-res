import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  outDir: './dist',
  site: 'https://mysteres.fr', // Set target canonical site URL
  build: {
    format: 'file'
  }
});
