import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  outDir: './dist',
  site: 'https://mysteres.fr',
  build: {
    format: 'directory'
  },
  integrations: [sitemap()]
});
