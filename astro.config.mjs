import { defineConfig } from "astro/config";
// https://astro.build/config
export default defineConfig({
  experimental: {
    redirects: true,
    redirects: {
      "/": {
        destination: "/es",
        status: 308,
      },
    },
    i18n: {
      defaultLocale: "es",
      locales: ["en", "es"],
      fallback: {
        en: "es",
      },
      routingStrategy: "prefix-always",
      trailingSlash: "always",
    },
  },
});
