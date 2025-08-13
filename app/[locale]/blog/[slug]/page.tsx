import { notFound } from "next/navigation"
import Post from "@/components/Post"
import { EntrySkeletonType, EntryFields } from "contentful"
import { client } from "@/lib/contentful"
import { Metadata } from "next"
import { getPostBySlug, getTranslationsMapForPost } from "@/lib/getPostBySlug"
import JsonLdPost from "@/components/json-ld"
import { toCfLocale } from "@/lib/locales"
import { BlogPostFields } from "@/lib/contentful-types"

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
  const { slug, locale } = params
  const post = await getPostBySlug(slug, locale)
  const title = asNonEmptyString(post?.seoTitle) ?? asNonEmptyString(post?.title) ?? "Article"
  const description = asNonEmptyString(post?.seoDescription) ?? ""
  const published = typeof post?.dateISO === "string" ? post.dateISO : undefined
  const updated = typeof post?.updatedAtISO === "string" ? post.updatedAtISO : published
  const url = `https://micaavigliano.com/${locale}/blog/${slug}`

  if (!post) {
    return {
      title: "Post not found",
      description: "The article could not be found.",
      robots: { index: false, follow: false },
    }
  }

  const translations = await getTranslationsMapForPost(slug, locale)
  const languages: Record<string, string> = {}
  for (const [loc, translatedSlug] of Object.entries(translations)) {
    languages[loc] = `https://micaavigliano.com/${loc}/blog/${translatedSlug}`
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length ? { languages } : {}),
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      locale,
      ...(post.dateISO ? { publishedTime: post.dateISO } : {}),
      ...(post.updatedAtISO ? { modifiedTime: post.updatedAtISO } : {}),
      authors: ["Mica Avigliano"], // TODO: or from CMS
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    },
  }
}

export default async function BlogPostPage({
  params,
}: { params: Promise<{ locale: "en" | "es" | "it"; slug: string }> }) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  return (
    <>
      <JsonLdPost post={post} locale={locale} />
      <Post post={post} locale={locale} />
    </>)
}