import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE = "https://micaavigliano.com";
const LOCALES = ["en", "es", "it"];
const ROUTES = ["", "services", "blog", "contact", "book"];

const urls = LOCALES.flatMap(locale =>
  ROUTES.map(path =>
    `<url><loc>${BASE}/${locale}${path ? "/" + path : ""}</loc></url>`
  )
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log("✅ sitemap.xml created");
