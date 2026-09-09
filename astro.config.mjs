import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://meshcalculator.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
