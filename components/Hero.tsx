"use client"

import { ArrowDown, Github, Linkedin, Mail, Heart, Star } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"

export function Hero() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-cream-50 paper-texture">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto" id="main-content">
          <div className="mb-8">
            <div className="inline-block relative">
              <div
                className="bg-white rounded-3xl p-8 shadow-soft-lg border-2 border-neutral-300 relative overflow-hidden"
                role="banner"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lavender-50 via-rose-50 to-sunshine-50 opacity-60"></div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-rose-400 rounded-full opacity-60"></div>
                <div className="absolute top-6 right-6 w-2 h-2 bg-mint-400 rounded-full opacity-70"></div>
                <div className="absolute bottom-4 left-6 w-4 h-4 bg-sky-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-6 right-4 w-3 h-3 bg-sunshine-400 rounded-full opacity-60"></div>

                {/* Small decorative stars */}
                <Star className="absolute top-3 right-3 w-4 h-4 text-lavender-400 opacity-60" />
                <Star className="absolute bottom-3 left-3 w-3 h-3 text-rose-400 opacity-50" />

                {/* Name content */}
                <div className="relative z-10">
                  <div className="text-sm font-medium text-neutral-600 mb-2 tracking-wide uppercase">{t("hero.greeting")}</div>
                  <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-2 leading-tight">Mica Avigliano</h1>
                  <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-lavender-600 rounded-full mx-auto"></div>
                </div>

                {/* Subtle corner decoration */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-rose-300 rounded-full opacity-40"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-lavender-300 rounded-full opacity-30"></div>
              </div>

              {/* Floating decorative elements around the card */}
              <div className="absolute -top-4 -left-6 w-8 h-8 bg-mint-300 rounded-2xl opacity-60"></div>
              <div
                className="absolute -top-2 -right-8 w-6 h-6 bg-sunshine-300 rounded-full opacity-50"
              ></div>
              <div
                className="absolute -bottom-4 -right-6 w-10 h-10 bg-rose-300 rounded-2xl opacity-40"
              ></div>
              <div
                className="absolute -bottom-2 -left-8 w-5 h-5 bg-sky-300 rounded-full opacity-60"
              ></div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative">
            <span className="text-neutral-800 block">{t("hero.title.main")}</span>
            <span className="text-2xl md:text-3xl text-sky-700 block mt-2">{t("hero.title.sub")}</span>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-rose-500 rounded-full opacity-60"></div>
          </h2>

          <p className="text-xl md:text-2xl text-neutral-700 mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
            {t("hero.description")}
          </p>

          <div
            className="inline-block bg-sunshine-100 px-6 py-3 rounded-lg border-2 border-sunshine-400 shadow-soft mb-8 focus-enhanced"
          >
            <p className="text-lg text-neutral-800 flex items-center gap-2 font-medium">
              <Heart className="w-5 h-5 text-rose-600" />
              {t("hero.mission")}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <button
            onClick={() => scrollToSection("about")}
            className="animate-gentle-float cursor-pointer p-2 rounded-full hover:bg-lavender-100 transition-colors focus-enhanced"
            aria-label="Scroll down to who I am section"
          >
            <ArrowDown className="w-8 h-8 mx-auto text-neutral-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
