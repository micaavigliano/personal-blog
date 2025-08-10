"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"

export function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`
  }

  return (
    <footer className="bg-lavender-800 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-3xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href={getLocalizedPath("/")} className="text-2xl font-bold text-sunshine-200 mb-6">
              Mica Avigliano
            </Link>
            <p className="text-lavender-200 mb-6 leading-relaxed font-medium max-w-md">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/micaavigliano"
                target="_blank"
                rel="noreferrer"
                aria-label={t("footer.github")}
                className="p-3 rounded-2xl bg-rose-400 hover:bg-rose-500 transition-all shadow-soft hover:shadow-soft-lg hover:scale-110 transform"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/micaelaavigliano/"
                aria-label={t("footer.linkedin")}
                className="p-3 rounded-2xl bg-sky-400 hover:bg-sky-500 transition-all shadow-soft hover:shadow-soft-lg hover:scale-110 transform"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="mailto:micaela.avigliano@gmail.com"
                aria-label={t("footer.email")}
                className="p-3 rounded-2xl bg-peach-400 hover:bg-peach-500 transition-all shadow-soft hover:shadow-soft-lg hover:scale-110 transform"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-sunshine-200">{t("footer.navigation")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getLocalizedPath("/")}
                  className="inline-block text-lavender-300 hover:text-white transition-colors text-left bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:0_100%] pb-1"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="inline-block text-lavender-300 hover:text-white transition-colors text-left bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:0_100%] pb-1"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath("/experience")}
                  className="inline-block text-lavender-300 hover:text-white transition-colors text-left bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:0_100%] pb-1"
                >
                  {t("nav.experience")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="inline-block text-lavender-300 hover:text-white transition-colors text-left bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:0_100%] pb-1"
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath("/blog")}
                  className="inline-block text-lavender-300 hover:text-white transition-colors text-left bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:0_100%] pb-1"
                >
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="inline-block text-lavender-300 hover:text-white transition-colors text-left bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:0_100%] pb-1"
                >
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath("/book")}
                  className="inline-block text-lavender-300 hover:text-white transition-colors text-left bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:0_100%] pb-1"
                >
                  {t("nav.book")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-sunshine-200">{t("footer.services")}</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-lavender-300">{t("footer.services.audits")}</span>
              </li>
              <li>
                <span className="text-lavender-300">{t("footer.services.development")}</span>
              </li>
              <li>
                <span className="text-lavender-300">{t("footer.services.consulting")}</span>
              </li>
              <li>
                <span className="text-lavender-300">{t("footer.services.training")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-lavender-700 pt-8 text-center">
          <p className="text-lavender-300 flex items-center justify-center gap-2 text-lg font-medium">
            {t("footer.made.with")} <Heart className="w-4 h-4 text-rose-400" aria-label={t("footer.love")} /> {t("footer.by")}
          </p>
        </div>
      </div>
    </footer>
  )
}
