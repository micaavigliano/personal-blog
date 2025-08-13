import { EntryFields } from "contentful"
import { client } from "./contentful"
import { toCfLocale, toRouteLocale } from "./locales"
import { BlogPostSkeleton } from "./contentful-types"

export type PostView = {
  title: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  dateISO?: string
  updatedAtISO?: string
}

export async function getPostBySlug(slug: string, routeLocale: string) {
  const res = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
    // ...({ ["fields.slug"]: slug } as Record<"fields.slug", string>),
    // locale: toCfLocale(routeLocale),
    ["fields.slug"]: slug,
    locale: toCfLocale(routeLocale),
    limit: 1,
  })

  const entry = res.items[0]
  if (!entry) return null

  const f = entry.fields

  const view: PostView & { id: string } = {
    id: entry.sys.id,
    slug: f.slug,
    title: f.title,
    seoTitle: f.seoTitle,
    seoDescription: f.seoDescription,
    dateISO: f.dateISO,
    updatedAtISO: f.updatedAtISO,
  }

  return view
}

export async function getEntryIdBySlug(slug: string, routeLocale: string) {
  const res = await client.getEntries({
    content_type: "blogPost",
    ...({ ["fields.slug"]: slug } as Record<"fields.slug", string>),
    locale: toCfLocale(routeLocale),
    limit: 1,
  })
  return res.items[0]?.sys.id as string | undefined
}

export async function getTranslationsMapForPost(
  slug: string,
  routeLocale: string
): Promise<Record<string, string>> {
  const entryId = await getEntryIdBySlug(slug, routeLocale)
  if (!entryId) return {}

  const entryAll = await client.withAllLocales.getEntry<BlogPostSkeleton>(entryId)
  const raw = entryAll.fields.slug as unknown
  const translations: Record<string, string> = {}

  if (raw && typeof raw === "object") {
    for (const [cfLoc, value] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof value === "string" && value.trim()) {
        translations[toRouteLocale(cfLoc) as string] = value
      }
    }
  } else if (typeof raw === "string" && raw.trim()) {
    const cfLocales = ["en-US", "es", "it"]
    for (const cfLoc of cfLocales) {
      translations[toRouteLocale(cfLoc) as string] = raw
    }
  }

  return translations
}