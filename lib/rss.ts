export type RssPost = {
  slug: string
  title: string
  dateISO?: string
  updatedAtISO?: string
  seoDescription?: string
  excerpt?: string
}

const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export function buildRss({
  siteTitle,
  siteDescription,
  siteUrl,
  selfUrl,
  language,
  posts,
  makePostUrl,
}: {
  siteTitle: string
  siteDescription: string
  siteUrl: string
  selfUrl: string
  language: string
  posts: RssPost[]
  makePostUrl: (slug: string) => string
}) {
  const lastBuildDate =
    posts[0]?.updatedAtISO || posts[0]?.dateISO || new Date().toISOString()

  const items = posts
    .map((p) => {
      const link = makePostUrl(p.slug)
      const pub = p.dateISO ? new Date(p.dateISO).toUTCString() : undefined
      const mod = p.updatedAtISO ? new Date(p.updatedAtISO).toUTCString() : undefined
      const desc = xmlEscape(p.seoDescription || "")
      return `
      <item>
        <title>${xmlEscape(p.title)}</title>
        <link>${link}</link>
        <guid isPermaLink="true">${link}</guid>
        ${pub ? `<pubDate>${pub}</pubDate>` : ""}
        ${mod ? `<lastBuildDate>${mod}</lastBuildDate>` : ""}
        <description><![CDATA[${desc}]]></description>
      </item>`
    })
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(siteTitle)}</title>
    <link>${siteUrl}</link>
    <description>${xmlEscape(siteDescription)}</description>
    <language>${language}</language>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`
}
