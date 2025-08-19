import { Blog } from "@/components/Blog"
import type { Metadata } from "next"
import { getBlogMetadata } from "@/lib/blog-trans"
import { getAllPosts } from "@/lib/getPostBySlug"

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

type RouteParams = { slug: string; locale: "en" | "es" | "it" }

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params
  return getBlogMetadata(locale)
}

export default async function BlogPage({ params }: { params: RouteParams }) {
  const { locale } = await params
  const posts = await getAllPosts(locale)
  console.log(posts)
  return (
    <Blog posts={posts} locale={locale} />
  )
}
