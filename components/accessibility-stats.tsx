"use client"

import { Users, Eye, Keyboard, Volume2, TrendingUp } from "lucide-react"
import { Card, CardContent } from "../components/ui/Cards"
import { usePathname } from "next/navigation"
import { getTranslation } from "@/lib/translations"
import { TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from '@/lib/i18n'

export function AccessibilityStats() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey): string => getTranslation(locale, key);

  const stats = [
    {
      icon: Users,
      number: "1.3B",
      label: t("stats.disabilities"),
      bgColor: "bg-rose-100",
      textColor: "text-rose-700",
      borderColor: "border-rose-200",
    },
    {
      icon: Eye,
      number: "285M",
      label: t("stats.visual"),
      bgColor: "bg-sky-100",
      textColor: "text-sky-700",
      borderColor: "border-sky-200",
    },
    {
      icon: Keyboard,
      number: "20%",
      label: t("stats.keyboard"),
      bgColor: "bg-lavender-100",
      textColor: "text-lavender-700",
      borderColor: "border-lavender-200",
    },
    {
      icon: Volume2,
      number: "466M",
      label: t("stats.hearing"),
      bgColor: "bg-sunshine-100",
      textColor: "text-sunshine-800",
      borderColor: "border-sunshine-200",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-rose-50 paper-texture">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
            <span className="text-lavender-700">{t("stats.title")}</span>
            <TrendingUp className="absolute -top-2 -right-8 w-6 h-6 text-rose-400 animate-subtle-pulse" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-rose-300 rounded-full opacity-60"></div>
          </h2>
          <p className="text-xl text-lavender-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {t("stats.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`border-2 ${stat.borderColor} shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-3 rounded-2xl bg-white/90 backdrop-blur-sm text-center overflow-hidden group`}
            >
              <CardContent className="p-8 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-current to-transparent"></div>
                </div>

                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${stat.bgColor} flex items-center justify-center shadow-soft border-2 ${stat.borderColor} transform group-hover:scale-110 transition-transform relative z-10`}
                >
                  <stat.icon className={`w-10 h-10 ${stat.textColor}`} />
                </div>
                <div className={`text-4xl font-bold mb-3 ${stat.textColor} code-style relative z-10`}>
                  {stat.number}
                </div>
                <p className="text-lavender-600 text-sm leading-relaxed relative z-10">{stat.label}</p>

                <div className={`absolute top-2 right-2 w-3 h-3 ${stat.bgColor} rounded-full opacity-60`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/90 px-8 py-4 rounded-2xl border-2 border-lavender-200 shadow-soft">
            <p className="text-xl text-lavender-700 font-medium">Every user deserves an accessible experience ✨</p>
          </div>
        </div>
      </div>
    </section>
  )
}
