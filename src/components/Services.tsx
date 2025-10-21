import { Check, Code, FileText, Users } from "lucide-react"
import Contact from "./Contact"
import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { getServicesData } from "@/lib/services-trans"
import { useI18n } from "@/lib/I18nProvider"

const iconMap = {
  FileText,
  Code,
  Users,
}

const Services = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const services = getServicesData(locale)

  return (
    <section className="min-h-screen px-4" aria-labelledby="services-header-title">
      <div className="container mx-auto max-w-6xl pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" id="services-header-title">{t('services.title')}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
          {t('services.description')}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 container mx-auto max-w-6xl pb-12 sm:pb-20 px-4 sm:px-6">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.icon as keyof typeof iconMap]
          return (
            <article key={index} className="border-2 flex flex-col hover:shadow-lg transition-shadow rounded-lg bg-card text-card-foreground shadow-sm" aria-labelledby={`service-title-${index}`}>
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="w-18 h-18 rounded-full bg-violet-200 flex items-center justify-center p-6">
                  <IconComponent className="text-black w-12 h-12" aria-hidden="true" />
                </div>
                <div className="">
                  <h2 className="text-2xl font-semibold leading-none tracking-tight" id={`service-title-${index}`}>{service.title}</h2>
                </div>
              </div>
              <div className="flex-grow p-6 pt-0">
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center p-6 pt-0">
                <a
                  href="/#contact"
                  className="w-full text-center py-2 text-foreground hover:text-primary transition-colors font-medium underline decoration-foreground hover:decoration-primary decoration-2 underline-offset-4 inline-block"
                >
                  {t('contact.title')}
                </a>
              </div>
            </article>
          )
        })}
      </div>
      <Contact />
    </section>
  )
}

export default Services