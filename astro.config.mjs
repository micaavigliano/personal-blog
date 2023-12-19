import { defineConfig } from "astro/config";
import { remarkModifiedTime } from './remark-modified-time.mjs';

export default defineConfig({
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
});
