import { defineConfig } from "astro/config";
// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/es",
  },
  experimental: {
    i18n: {
      defaultLocale: "es",
      locales: ["en", "es"],
      fallback: {
        en: "es",
      },

      routingStrategy: "prefix-always",
    },
  },
});
