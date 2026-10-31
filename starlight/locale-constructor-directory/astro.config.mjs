import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://example.com',
  integrations: [starlight({
    title: 'API docs',
    defaultLocale: 'root',
    locales: {
      root: { label: 'English', lang: 'en' },
      fr: { label: 'French' },
    },
  })],
});
