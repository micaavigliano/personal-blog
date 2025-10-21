import { Link } from "@tanstack/react-router"
import { Accessibility, ArrowRight, Heart, Sparkles } from "lucide-react"
import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { useI18n } from "@/lib/I18nProvider"
import Stats from "./Stats"

const Introduction = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 text-center" aria-labelledby="name-title">
      <p className="text-muted-foreground mb-4 animate-fade-in">{t('hero.greeting')}</p>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in" id="name-title">
        Mica Avigliano
      </h1>
      <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 animate-fade-in">
        <span className="font-semibold">{t('hero.title.main')}</span>
        <br />
        <span className="text-accent">{t('hero.title.sub')}</span>
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
        {t('hero.description')}
      </p>
      <div className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent rounded-full mb-12 animate-fade-in">
        <Heart className="w-5 h-5 text-accent" aria-hidden="true" />
        <span className="font-medium">{t('hero.mission')}</span>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <p className="text-base sm:text-lg text-muted-foreground mb-8">
          {t('about.description')}
        </p>
        <div className="flex flex-wrap flex-row justify-center items-center group">
          <p className="text-lg sm:text-xl font-semibold align-middle mr-3">
            {t('about.mission')}
          </p>
          <Accessibility className="w-5 h-5 transition-transform duration-300 group-hover:rotate-20 text-blue-600" aria-hidden="true" />
          <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-20 text-yellow-500" aria-hidden="true" />
        </div>
      </div>

      <Stats />

      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
        <Link
          to="/$locale/experience"
          params={{ locale }}
          className="group inline-flex items-center gap-2 text-lg font-semibold text-primary transition-all duration-300 underline decoration-accent decoration-2 underline-offset-4 nav-link"
        >
          <span>{t('hero.cta.experience')}</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <a
          href="mailto:micaela.avigliano@gmail.com"
          className="group inline-flex items-center gap-2 text-lg font-bold text-accent transition-all duration-300 underline decoration-accent decoration-2 underline-offset-4 nav-link"
        >
          <span>{t('nav.book')}</span>
          <Heart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        </a>
        <Link
          to="/$locale/blog"
          params={{ locale }}
          className="group inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-all duration-300 underline decoration-accent decoration-2 underline-offset-4 nav-link"
        >
          <span>{t('hero.cta.blog')}</span>
          <Sparkles className="w-5 h-5 text-accent transition-transform duration-300 group-hover:rotate-20" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default Introduction