import { defineConfig } from "astro/config";
import { remarkModifiedTime } from './remark-modified-time.mjs';

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
  build: {
    redirects: false
  }
});
