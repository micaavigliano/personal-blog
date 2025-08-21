"use client"

import { useEffect } from "react"
import { Calendar, Clock, Users, CheckCircle, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Cards"
import { usePathname } from "next/navigation"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Calendly: any
  }
}

export function CalendlyBooking() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const consultationTypes = [
    {
      icon: Calendar,
      title: t("consultation.audit.title"),
      duration: "30 minutes",
      description: t("consultation.audit.desc"),
      bgColor: "bg-rose-100",
      textColor: "text-rose-700",
      borderColor: "border-rose-200",
    },
    {
      icon: Users,
      title: t("consultation.training.title"),
      duration: "60 minutes",
      description: t("consultation.training.desc"),
      bgColor: "bg-sky-100",
      textColor: "text-sky-700",
      borderColor: "border-sky-200",
    },
    {
      icon: CheckCircle,
      title: t("consultation.discovery.title"),
      duration: "45 minutes",
      description: t("consultation.discovery.desc"),
      bgColor: "bg-lavender-100",
      textColor: "text-lavender-700",
      borderColor: "border-lavender-200",
    },
  ]

  return (
    <section className="py-30 px-4 sm:px-6 lg:px-8 bg-sunshine-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative flex flex-row justify-center items-center gap-4">
            <span className="text-lavender-700">{t("booking.title")}</span>
            <Sparkles className="w-6 h-6 text-sunshine-400 animate-subtle-pulse" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-sunshine-300 rounded-full opacity-60"></div>
          </h1>
          <p className="text-xl text-lavender-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("booking.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {consultationTypes.map((type, index) => (
            <Card
              key={index}
              className={`border-2 ${type.borderColor} shadow-soft hover:shadow-soft-lg rounded-3xl bg-white/90 backdrop-blur-sm overflow-hidden group`}
            >
              <CardHeader className="text-center pb-4 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-current to-transparent"></div>
                </div>

                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl ${type.bgColor} flex items-center justify-center shadow-soft border-2 ${type.borderColor} transform group-hover:scale-110 transition-transform relative z-10`}
                >
                  <type.icon className={`w-10 h-10 ${type.textColor}`} aria-hidden="true" />
                </div>
                <CardTitle className={`text-xl font-bold ${type.textColor} mb-2 relative z-10`}>{type.title}</CardTitle>
                <div className="flex items-center justify-center gap-2 text-lavender-600 relative z-10">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm code-style">{type.duration}</span>
                </div>
                <div className={`absolute top-2 right-2 w-3 h-3 ${type.bgColor} rounded-full opacity-60`}></div>
              </CardHeader>
              <CardContent className="pt-0 text-center relative z-10">
                <p className="text-lavender-600 leading-relaxed font-medium">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft-lg border-2 border-lavender-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-lavender-700 mb-4">{t("booking.schedule.title")}</h2>
            <p className="text-lavender-600 font-medium">{t("booking.schedule.desc")}</p>
          </div>

          <div
            className="calendly-inline-widget rounded-2xl overflow-hidden"
            data-url="https://calendly.com/micaela-avigliano/30min"
            style={{ minWidth: "320px", height: "900px" }}
          ></div>
        </div>

        <div className="mt-16 text-center bg-sky-50 rounded-3xl p-8 max-w-2xl mx-auto border-2 border-sky-200 shadow-soft">
          <h3 className="text-xl font-bold text-sky-700 mb-4">{t("booking.expect.title")}</h3>
          <ul className="text-left space-y-3 text-lavender-600">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="font-medium">{t("booking.expect.1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="font-medium">{t("booking.expect.2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="font-medium">{t("booking.expect.3")}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="font-medium">{t("booking.expect.4")}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
