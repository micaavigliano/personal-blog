import type { MetadataRoute } from "next"
import { getAllPosts, getTranslationsMapForPost } from "@/lib/getPostBySlug"

export const revalidate = 3600

const baseUrl = "https://micaavigliano.com"
const locales = ["en", "es", "it"] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...locales.map((loc) => ({
      url: `${baseUrl}/${loc}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]

  const canonicalPosts = await getAllPosts("en")

  for (const post of canonicalPosts) {
    const locales = ["en", "es", "it"] as const
    type Locale = (typeof locales)[number]
    type TranslationMap = Partial<Record<Locale, string>>
    const translations = (await getTranslationsMapForPost(post.slug, "en")) as TranslationMap
    const withEn: TranslationMap = { ...translations, en: post.slug }

    const languages: Record<string, string> = {}
    for (const loc of locales) {
      const slugForLoc = withEn[loc]
      if (!slugForLoc) continue
      languages[loc] = `${baseUrl}/${loc}/blog/${slugForLoc}`
    }

    languages["x-default"] = `${baseUrl}/en/blog/${withEn["en"]}`

    for (const loc of locales) {
      const slugForLoc = withEn[loc]
      if (!slugForLoc) continue

      items.push({
        url: `${baseUrl}/${loc}/blog/${slugForLoc}`,
        lastModified: new Date(post.updatedAtISO ?? post.dateISO ?? new Date().toISOString()),
        changeFrequency: "daily",
        priority: 0.7,
        alternates: { languages },
      })
    }
  }

  return items
}
