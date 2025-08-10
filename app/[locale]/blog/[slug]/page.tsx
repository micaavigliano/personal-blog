import { notFound } from "next/navigation"
import Post from "@/components/Post"
import { EntrySkeletonType, EntryFields } from "contentful"
import { client } from "@/lib/contentful"
import { Metadata } from "next"
import { cfLocale, getPostBySlug } from "@/lib/getPostBySlug"

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

const cfLocaleMap = { en: "en-US", es: "es", it: "it" } as const

function asNonEmptyString(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined
  const s = v.trim()
  return s.length ? s : undefined
}

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getPostBySlug(slug, cfLocale(locale))

  if (!post) {
    return {
      title: "Post not found",
      description: "The article could not be found.",
      robots: { index: false, follow: false },
    }
  }

  const title = asNonEmptyString(post.seoTitle) ?? asNonEmptyString(post.title)
  const description = asNonEmptyString(post.seoDescription) ?? ""
  const published = typeof post.dateISO === "string" ? post.dateISO : undefined
  const updated = typeof post.updatedAtISO === "string" ? post.updatedAtISO : undefined
  const other = {
    ...(published ? { "article:published_time": published } : {}),
    ...(updated ? { "article:modified_time": updated } : {}),
  } satisfies Record<string, string | number | (string | number)[]>
  const url = `https://micaavigliano.com/${locale}/blog/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `https://micaavigliano.com/en/blog/${slug}`,
        es: `https://micaavigliano.com/es/blog/${slug}`,
        it: `https://micaavigliano.com/it/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      locale,
    },
    other
  }
}

export default async function BlogPostPage({
  params,
}: { params: Promise<{ locale: "en" | "es" | "it"; slug: string }> }) {
  const { locale, slug } = await params
  const cfLocale = cfLocaleMap[locale] ?? "en-US"

  const query: Parameters<typeof client.getEntries<PostSkeleton>>[0] = {
    content_type: "blogPost",
    locale: cfLocale,
    limit: 1
  }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ; (query as any)["fields.slug"] = slug

  const { items } = await client.getEntries<PostSkeleton>(query)
  const post = items[0]

  if (!post) {
    notFound()
  }

  return <Post post={post.fields} locale={locale} />
}