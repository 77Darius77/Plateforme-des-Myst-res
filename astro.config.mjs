import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  outDir: './dist',
  site: 'https://plateforme-des-mysteres.com',
  build: {
    format: 'directory'
  },
  integrations: [sitemap()]
});
