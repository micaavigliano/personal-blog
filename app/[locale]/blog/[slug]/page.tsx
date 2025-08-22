import { notFound } from "next/navigation"
import Post from "@/components/Post"
import type { Metadata } from "next"
import { getPostBySlug } from "@/lib/getPostBySlug"
import JsonLdPost from "@/components/json-ld"

type RouteParams = { slug: string; locale: "en" | "es" | "it" }
type Props = { params: Promise<RouteParams> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: "Post not found",
      description: "The article could not be found.",
      robots: { index: false, follow: false },
    }
  }
  const title = post.title
  const description = post.seoDescription?.trim() || ""
  const published = post.dateISO
  const updated = post.updatedAtISO ?? post.dateISO
  const url = `https://micaavigliano.com/${locale}/blog/${slug}`

  return {
    title,
    description,
    keywords: post.keywords.join(', '),
    openGraph: {
      type: "article",
      url,
      title,
      description,
      locale,
      ...(published ? { publishedTime: published } : {}),
      ...(updated ? { modifiedTime: updated } : {}),
      authors: ["Mica Avigliano"],
      ...(post.keywords?.length ? { tags: post.keywords } : {})
    },
  }
}

export default async function BlogPostPage(
  { params }: { params: RouteParams }
) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) notFound()

  return (
    <>
      <JsonLdPost post={post} locale={locale} />
      <Post post={post} locale={locale} />
    </>
  )
}
