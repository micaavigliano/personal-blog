import { getAllPosts } from "@/lib/getPostBySlug"


export const revalidate = 3600

const baseUrl = "https://micaavigliano.com"
const defaultLocale = "en" as const

export async function GET() {
  const posts = await getAllPosts(defaultLocale)

  const urls = posts.map((p) => {
    const loc = `${baseUrl}/${defaultLocale}/blog/${p.slug}`
    return `
  <url>
    <loc>${loc}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
  }).join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
