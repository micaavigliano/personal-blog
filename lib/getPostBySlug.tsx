import { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { client } from "./contentful";


export const cfLocale = (appLocale: string) =>
  ({ en: "en-US", es: "es", it: "it" } as const)[appLocale] ?? "en-US"

type PostFields = {
  title: EntryFields.Symbol
  slug: EntryFields.Symbol
  seoTitle?: EntryFields.Symbol
  seoDescription?: EntryFields.Text
  description?: EntryFields.RichText
  dateISO?: string
  updatedAtISO?: string
}
type PostSkeleton = EntrySkeletonType<PostFields, "blogPost">
type PostEntry = Entry<PostSkeleton>

export type PostView = {
  title: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  description: unknown
  dateISO?: string
  updatedAtISO?: string
}

export async function getPostBySlug(slug: string, locale: string): Promise<PostView | null> {
  // const res = await client.getEntries({
  //   content_type: "blogPost",
  //   "fields.slug": slug,
  //   limit: 1,
  //   locale,
  // });

  const res = await client.getEntries<PostSkeleton>({
    content_type: "blogPost",
    limit: 1,
    locale,
    ...({ ["fields.slug"]: slug } as Record<"fields.slug", string>),
  })

  const entry = res.items[0]
  if (!entry) return null

  const f = entry.fields
  return {
    title: typeof f.title === "string" ? f.title : "",
    slug: f.slug as string,
    seoTitle: typeof f.seoTitle === "string" ? f.seoTitle : undefined,
    seoDescription: typeof f.seoDescription === "string" ? f.seoDescription : undefined,
    description: f.description,
    dateISO: f.dateISO ?? entry.sys.createdAt,
    updatedAtISO: f.updatedAtISO ?? entry.sys.updatedAt,
  }
}