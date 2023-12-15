import { defineConfig } from "astro/config";
import { remarkModifiedTime } from './remark-modified-time.mjs';
// import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // build: {
  //   redirects: false
  // },
  redirects: {
    '/': '/es/'
  },
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
  // output: "server",
  // adapter: node({
  //   mode: 'standalone',
  // }),
});
