type JsonLdPostProps = {
  locale: string
  post: {
    title: string
    slug: string
    seoTitle?: string
    seoDescription?: string
    dateISO?: string
    updatedAtISO?: string
    keywords?: string[]
    section?: string
    wordCount?: number
  }
}

export default function JsonLdPost({ post, locale }: JsonLdPostProps) {
  const url = `https://micaavigliano.com/${locale}/blog/${post.slug}`
  const headline = post.seoTitle || post.title
  const description = post.seoDescription || ""

  const data = [
    {
      "@context": "https://schema.org",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `https://micaavigliano.com/${locale}/blog` },
        { "@type": "ListItem", position: 2, name: post.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#blogposting`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline,
      description,
      inLanguage: locale,
      isAccessibleForFree: true,
      datePublished: post.dateISO,
      dateModified: post.updatedAtISO || post.dateISO,
      author: { "@id": "https://micaavigliano.com/#person" },
      publisher: { "@id": "https://micaavigliano.com/#person" },
      keywords: post.keywords?.join(", "),
      wordCount: post.wordCount,
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, (_k, v) => (v ?? undefined)) }}
    />
  )
}
