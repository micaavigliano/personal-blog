"use client"

import { Code, Palette, Rocket, Heart, Sparkles, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Cards"
import { usePathname } from "next/navigation"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"

export function About() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const skills = [
    {
      icon: Code,
      title: t("skills.frontend.title"),
      description: t("skills.frontend.desc"),
      bgColor: "bg-sky-100",
      textColor: "text-sky-800",
      borderColor: "border-sky-400",
    },
    {
      icon: Heart,
      title: t("skills.accessibility.title"),
      description: t("skills.accessibility.desc"),
      bgColor: "bg-rose-100",
      textColor: "text-rose-800",
      borderColor: "border-rose-400",
    },
    {
      icon: Palette,
      title: t("skills.design.title"),
      description: t("skills.design.desc"),
      bgColor: "bg-lavender-100",
      textColor: "text-lavender-800",
      borderColor: "border-lavender-400",
    },
    {
      icon: Rocket,
      title: t("skills.performance.title"),
      description: t("skills.performance.desc"),
      bgColor: "bg-sunshine-100",
      textColor: "text-sunshine-800",
      borderColor: "border-sunshine-400",
    },
  ]

  return (
    <section id="about" className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 bg-cream-50 paper-texture" aria-labelledby="about-heading">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 id="about-heading" className="text-4xl md:text-5xl font-bold mb-6 flex flex-row justify-center relative items-center gap-4 text-neutral-800">
            {t("about.title")}
            <Sparkles className="w-6 h-6 text-rose-600 animate-subtle-pulse" aria-hidden="true" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-mint-600 rounded-full opacity-60"></div>
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("about.description")}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-stretch mb-16" aria-label="Technical skills">
          {skills.map((skill, index) => (
            <li key={index} className="h-full">
              <Card
                className={`h-full border-2 ${skill.borderColor} shadow-soft hover:shadow-soft-lg bg-white/90 backdrop-blur-sm overflow-hidden group`}
              >
                <CardContent className="p-8 text-center relative">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${skill.bgColor} flex items-center justify-center shadow-soft border-2 ${skill.borderColor} transform group-hover:scale-110 transition-transform`}
                    aria-hidden="true"
                  >
                    <skill.icon className={`w-10 h-10 ${skill.textColor}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${skill.textColor}`}>{skill.title}</h3>
                  <p className="text-neutral-700 leading-relaxed">{skill.description}</p>

                  <div className={`absolute top-2 right-2 w-3 h-3 ${skill.bgColor} rounded-full opacity-60`}></div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-soft-lg border-2 border-neutral-300 relative overflow-hidden">
          <div className="absolute inset-0 paper-texture opacity-30"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-neutral-800 flex items-center gap-3">
                <Users className="w-8 h-8 text-rose-600" aria-hidden="true" />
                {t("about.mission.title")}
              </h3>
              <div className="space-y-4">
                <p className="text-neutral-700 leading-relaxed font-medium">{t("about.mission.p1")}</p>
                <p className="text-neutral-700 leading-relaxed font-medium">{t("about.mission.p2")}</p>
              </div>

              <div className="mt-6 p-4 bg-rose-50 rounded-xl border-2 border-rose-300">
                <p className="text-lg text-rose-800 text-center font-medium">
                  {t("about.mission")}
                </p>
              </div>
            </div>

            {/* Illustration area */}
            <div className="relative" aria-hidden="true">
              <div className="w-full h-80 bg-lavender-100 rounded-3xl shadow-inner-soft border-2 border-lavender-300 relative overflow-hidden">
                <div className="absolute top-8 left-8 w-16 h-16 bg-rose-300 rounded-full opacity-60 animate-gentle-float"></div>
                <div
                  className="absolute top-20 right-12 w-12 h-12 bg-sky-300 rounded-full opacity-50"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute bottom-16 left-16 w-20 h-20 bg-sunshine-300 rounded-full opacity-40 animate-gentle-float"
                  style={{ animationDelay: "4s" }}
                ></div>
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-mint-400 rounded-full opacity-70"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-neutral-600 transform -rotate-12">♿✨</div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-rose-400 rounded-full opacity-60 transform rotate-45"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-sky-400 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
