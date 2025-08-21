"use client"

import { CheckCircle, Users, Code, FileText, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Cards"
import { usePathname } from "next/navigation"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"
import { getServicesData } from "@/lib/services-trans"
import Link from "next/link"

const iconMap = {
  FileText,
  Code,
  Users,
}


interface ServicesProps {
  locale?: string
}

export function Services({ locale }: ServicesProps = {}) {
  const pathname = usePathname()
  const currentLocale = locale || getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(currentLocale, key)

  const getLocalizedPath = (path: string) => {
    return `${path}`
  }

  const services = getServicesData(currentLocale)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sunshine-50" id="services">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative flex flex-row gap-4 justify-center items-center">
            <span className="text-lavender-700">{t("services.title")}</span>
            <Sparkles className="w-6 h-6 text-sunshine-400 animate-subtle-pulse" aria-hidden="true" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-sunshine-300 rounded-full opacity-60"></div>
          </h2>
          <p className="text-xl text-lavender-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("services.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]

            return (
              <Card
                key={index}
                className={`border-2 ${service.borderColor} shadow-soft hover:shadow-soft-lg rounded-3xl bg-white/90 backdrop-blur-sm overflow-hidden group flex flex-col justify-center items-center`}
              >
                <CardHeader className="text-center relative bg-sky-50 w-full h-full">
                  <div
                    className={`w-24 h-24 mx-auto mb-6 rounded-2xl ${service.bgColor} flex items-center justify-center shadow-soft border-2 ${service.borderColor} transform group-hover:scale-110 transition-transform relative z-10`}
                  >
                    <IconComponent className={`w-12 h-12 ${service.textColor}`} aria-hidden="true" />
                  </div>
                  <CardTitle className={`text-2xl font-bold ${service.textColor} relative z-10`}>
                    {service.title}
                  </CardTitle>
                  <div className={`absolute top-2 right-2 w-4 h-4 ${service.bgColor} rounded-full opacity-60`}></div>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <p className="text-lavender-600 mb-6 leading-relaxed text-center font-medium">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 ${service.textColor} flex-shrink-0 mt-0.5`} />
                        <span className="text-lavender-600 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={getLocalizedPath("/book")}
                    className={`w-full m-auto text-${service.bgColor} text-white py-3 hover:shadow-soft-lg transform hover:-translate-y-1 transition-all underline underline-offset-2 hover:border-white/20`}
                    aria-label={`${t("services.learn.more")} ${service.title}`}
                  >
                    {t("services.learn.more")}
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <div className="inline-block bg-white/90 px-8 py-4 rounded-2xl border-2 border-sunshine-200 shadow-soft">
            <p className="text-lg text-sunshine-700 font-medium">{t("services.together")} 🤝</p>
          </div>
        </div>
      </div>
    </section>
  )
}
