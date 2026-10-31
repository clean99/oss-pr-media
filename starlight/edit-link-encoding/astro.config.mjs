import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Edit link reproduction',
      editLink: { baseUrl: 'https://github.com/clean99/starlight-edit-link-repro/edit/main/' },
    }),
  ],
});
