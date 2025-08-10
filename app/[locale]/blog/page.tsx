import { Blog } from "@/components/Blog"
import type { Metadata } from "next"
import { getBlogMetadata } from "@/lib/blog-trans"
import { client } from '@/lib/contentful'
import { EntrySkeletonType } from 'contentful'
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params
  return getBlogMetadata(locale)
}

export default async function BlogPage() {
  return (
    <Blog />
  )
}
