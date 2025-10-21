import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/blog', changefreq: 'weekly', priority: 0.9 },
  { url: '/blog/accessible-pagination', changefreq: 'monthly', priority: 0.8 },
  { url: '/blog/focus-management', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'yearly', priority: 0.6 }
];

const sitemap = new SitemapStream({ hostname: 'https://micaavigliano.com' });
const outputPath = resolve('./dist/sitemap.xml');
const writeStream = createWriteStream(outputPath);

streamToPromise(sitemap).then(() => console.log(`✅ Sitemap generated at ${outputPath}`));
links.forEach(link => sitemap.write(link));
sitemap.end();
sitemap.pipe(writeStream);

// 1. when finished the web run 'npm run postbuild' to generate the sitemap.xml file
// 2. verify that the file is in the /dist folder
// 3. deploy the /dist folder to your hosting provider
// 4. submit the sitemap URL to Google Search Console: https://search.google.com/search-console/sitemaps
// 5. monitor the indexing status and performance of your site in search results