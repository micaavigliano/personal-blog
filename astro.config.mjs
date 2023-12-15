import { defineConfig } from "astro/config";
import { remarkModifiedTime } from './remark-modified-time.mjs';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  output: 'static',
  adapter: node({
    mode: 'standalone',
    build: {
      redirects: false
    }
  }),

});
