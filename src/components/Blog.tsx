import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { useI18n } from "@/lib/I18nProvider"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { calculateReadingTime } from "@/lib/readingTime"
import NewsletterSubscribe from "./SubscribeNewsletter"

type Props = {
  posts: {
    dateISO?: string
    updatedAtISO?: string
    slug: string
    title: string
    seoDescription: string
    description: string
  }[]
}

const Blog = ({ posts }: Props) => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <article className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6" aria-labelledby="blog-title">
      <div className="container mx-auto max-w-6xl pb-12 sm:pb-16 px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" id="blog-title">{t('blog.title')}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
          {t('blog.description')}
        </p>
      </div>
      <section className="pb-12 sm:pb-16 px-4 sm:px-6">
        <ul className="container mx-auto max-w-4xl space-y-8">
          {posts.map((post: any, index: number) => {
            const iso = post.dateISO || post.updatedAtISO
            const dateFmt = iso
              ? new Date(iso).toLocaleDateString(locale, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
              : null
            return (
              <li key={index} className="border-b pb-8 last:border-b-0 group">
                <article aria-labelledby={`post-title-${index}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {dateFmt}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {calculateReadingTime(post.description, t('blog.read.time'))}
                      </span>
                    </div>
                  </div>
                  <Link
                    className="block"
                    to="/$locale/blog/$slug"
                    params={{ locale, slug: post.slug }}
                    aria-label={`${t("blog.read.more")} ${t("blog.about")} ${post.title}`}
                  >
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors" id={`post-title-${index}`}>
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-3">
                      {post.seoDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                      {t('blog.read.more')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
        <NewsletterSubscribe />
      </section>
    </article>
  )
}

export default Blog;