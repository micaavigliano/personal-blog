"use client"

import { ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { RichText } from "@/components/RichText"
import { EntryFields } from "contentful"
import ViewCounter from "./ViewCounter"

export interface BlogPostProps {
  locale: string
  post: {
    title: EntryFields.Symbol
    slug: EntryFields.Symbol
    seoTitle?: EntryFields.Symbol
    seoDescription?: EntryFields.Text
    description?: EntryFields.RichText
    dateISO?: string
    updatedAtISO?: string
    keywords?: string[],
  }
}

export default function Post({ post, locale }: BlogPostProps) {
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const getLocalizedPath = (path: string) => `/${locale}${path}`
  const params = useParams<{ slug?: string }>()

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  return (
    <article className="py-20 px-4 sm:px-6 lg:px-8 bg-mint-50 paper-texture mt-10 mx-auto">
      <div className="mb-8">
        <Link
          href={getLocalizedPath("/blog")}
          className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("blog.all")}
        </Link>
      </div>

      <header className="mb-8 flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-lavender-700 leading-tight text-wrap">
            {post.title}
          </h1>
          <ViewCounter slug={params.slug!} locale={locale} />
        </div>
        <button
          onClick={handleShare}
          aria-label={t("blog.shareLabel")}
          className="inline-flex items-center gap-2 border-2 border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl bg-transparent px-3 py-1.5"
        >
          <Share2 className="w-4 h-4" />
          {t("blog.share")}
        </button>
      </header>

      <section className="prose prose-lg max-w-none">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-soft-lg border-2 border-cream-200">
          <RichText doc={post.description} locale={locale} />
        </div>
      </section>
    </article>
  )
}
