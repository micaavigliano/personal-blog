import { defineConfig } from "astro/config";
import { remarkModifiedTime } from "./remark-modified-time.mjs";
import partytown from "@astrojs/partytown";

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
  site: "https://micaavigliano.com",
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
