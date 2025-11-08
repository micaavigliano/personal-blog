import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { RichText } from "@/components/RichText"
import { useI18n } from "@/lib/I18nProvider"
import { Link } from "@tanstack/react-router"
import { calculateReadingTime } from "@/lib/readingTime"
import { PostSEOHelmet } from "./PostSEOHelmet"
import { BackToTop } from "./BackToTop"
import NewsletterSubscribe from "./NewsletterSubscribe"
import type { PostSummary } from "@/lib/getPostBySlug"

type Props = {
  post: PostSummary
}

export default function Post({ post }: Props) {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  const iso = post.dateISO || post.updatedAtISO
  const dateFmt = iso
    ? new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : null

  return (
    <article className="container mx-auto py-12 sm:py-16 max-w-4xl focus:outline-none" aria-labelledby="post-title">
      <PostSEOHelmet
        baseUrl="https://micaavigliano.com"
        siteName="Mica Avigliano"
        locale={locale as "en" | "es" | "it"}
        locales={["en", "es", "it"]}
        post={{
          title: post.title,
          slug: post.slug,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          keywords: post.keywords,
          dateISO: post.dateISO,
          updatedAtISO: post.updatedAtISO,
        }}
      />
      <Link to="/$locale/blog" params={{ locale }} className="nav-link flex flex-row items-center pb-6 w-fit">
        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        {t("blog.back")}
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" id="post-title" tabIndex={-1}>
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time>{dateFmt}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>{calculateReadingTime(post.description, t('blog.read.time'))}</span>
          </div>
          <button
            onClick={handleShare}
            aria-label={t("blog.shareLabel")}
            className="inline-flex items-center gap-2 border-2 border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl bg-transparent px-3 py-1.5"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
            {t("blog.share")}
          </button>
        </div>
      </header>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <RichText doc={post.description} />
        <NewsletterSubscribe />
        <BackToTop />
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <Link to="/$locale/blog" params={{ locale }} className="nav-link flex flex-row items-center w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          {t("blog.back")}
        </Link>
      </div>
    </article>
  )
}