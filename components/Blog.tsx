"use client"

import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"
import { client } from '@/lib/contentful'
import { EntrySkeletonType, Entry, EntryFields } from 'contentful'
import { useEffect, useState } from "react"

export type PostFields = {
  title: EntryFields.Symbol
  slug: EntryFields.Symbol
  seoTitle?: EntryFields.Symbol
  seoDescription?: EntryFields.Text
  description?: EntryFields.RichText
  dateISO?: string
  updatedAtISO?: string
}

type PostSkeleton = EntrySkeletonType<PostFields, 'blogPost'>
type PostEntry = Entry<PostSkeleton>

export function Blog() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const [posts, setPosts] = useState<PostEntry[]>([])

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`
  }

  useEffect(() => {
    const cfLocaleMap = { en: "en-US", es: "es", it: "it" } as const
    const cfLocale = cfLocaleMap[locale] ?? "en-US"

    client.getEntries<PostSkeleton>({
      content_type: 'blogPost',
      locale: cfLocale,
    })
      .then(res => {
        setPosts(res.items)
      })
      .catch(err => {
        console.error("[Contentful] getEntries failed:", err)
      })
  }, [locale])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-mint-50 paper-texture mx-auto mt-10">
      <div className="mb-16">
        <Link
          href={getLocalizedPath("/")}
          className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("blog.back")}
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 relative flex flex-row justify-center items-center gap-4">
          <span className="text-lavender-700">{t("blog.title")}</span>
          <BookOpen className="w-6 h-6 text-mint-700 animate-subtle-pulse" aria-hidden="true" />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-mint-500 rounded-full opacity-60"></div>
        </h1>
        <p className="text-xl text-lavender-600 max-w-3xl mx-auto leading-relaxed font-medium">
          {t("blog.description")}
        </p>
      </div>

      <ul className="relative max-w-3xl mx-auto">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-rose-200" />

        {posts.map((post) => {
          const title = String(post.fields.title ?? "").trim() || "Untitled"
          const iso = post.sys.createdAt || post.sys.updatedAt
          const dateFmt = iso
            ? new Date(iso).toLocaleDateString(locale, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            : null

          return (
            <li key={post.sys.id} className="relative pl-10 pb-8">
              <span className="absolute left-1 top-2 w-4 h-4 rounded-full bg-rose-500 border-4 border-mint-50" />

              <Link
                href={getLocalizedPath(`/blog/${post.fields.slug}`)}
                className="group block"
              >
                {dateFmt && (
                  <time
                    dateTime={iso!}
                    className="text-sm text-gray-500"
                  >
                    {dateFmt}
                  </time>
                )}
                <h3 className="mt-1 text-xl font-semibold text-lavender-600 group-hover:text-rose-600 transition-colors underline underline-offset-1">
                  {title}
                </h3>
                <span className="inline-flex items-center gap-1 text-rose-600 text-sm mt-1">
                  Leer más
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
