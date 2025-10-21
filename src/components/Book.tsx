import { Calendar, Users, CheckCircle, Clock } from "lucide-react";
import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { useEffect } from "react";
import { useI18n } from "@/lib/I18nProvider";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Calendly: any
  }
}

const Book = () => {
  const { locale } = useI18n()
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
      duration: t("consultation.audit.time"),
      description: t("consultation.audit.desc"),
      bgColor: "bg-pink-100",
      textColor: "text-pink-700",
      borderColor: "border-pink-200",
    },
    {
      icon: Users,
      title: t("consultation.training.title"),
      duration: t("consultation.training.time"),
      description: t("consultation.training.desc"),
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
    },
    {
      icon: CheckCircle,
      title: t("consultation.discovery.title"),
      duration: t("consultation.discovery.time"),
      description: t("consultation.discovery.desc"),
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
    },
  ]

  return (
    <article>
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 container mx-auto max-w-6xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
          {t('booking.title')}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
          {t('booking.description')}
        </p>
      </section>

      <section className="px-2 sm:px-4 container mx-auto max-w-6xl grid md:grid-cols-3 gap-6 mb-16">
        {consultationTypes.map((type, index) => (
          <article className="rounded-lg bg-card text-card-foreground shadow-sm border-2 text-center h-full py-8 px-3" key={index} aria-labelledby={`consultation-type-${index}`}>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Calendar className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2 text-primary" id={`consultation-type-${index}`}>
              {type.title}
            </h3>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">{type.duration}</span>
            </div>
            <p className="text-center text-muted-foreground">
              {type.description}
            </p>
          </article>
        ))}
      </section>

      <section className="px-2 sm:px-4 container w-full mb-6 border-2 p-6 pt-0 rounded-lg bg-card text-card-foreground shadow-sm mx-auto" aria-labelledby="calendly-schedule-title">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4" id="calendly-schedule-title">
          {t('booking.schedule.title')}
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          {t('booking.schedule.desc')}
        </p>

        <div className="w-full min-h-[650px] rounded-lg overflow-hidden bg-muted/10">
          <div
            className="calendly-inline-widget rounded-2xl overflow-hidden"
            data-url="https://calendly.com/micaela-avigliano/30min"
            style={{ minWidth: "320px", height: "900px" }}
          ></div>
        </div>
      </section>

      <section className="mt-8 bg-muted/50 rounded-lg text-card-foreground shadow-sm border-2 text-center h-full py-8 px-3 mb-4 mx-auto w-1/2" aria-labelledby="what-to-expect-title">
        <h3 className="text-xl font-semibold mb-4" id="what-to-expect-title">{t('booking.expect.title')}</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-violet-500" aria-hidden="true" />
            <span>{t('booking.expect.1')}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-violet-500" aria-hidden="true" />
            <span>{t('booking.expect.2')}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-violet-500" aria-hidden="true" />
            <span>{t('booking.expect.3')}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-violet-500" aria-hidden="true" />
            <span>{t('booking.expect.4')}</span>
          </li>
        </ul>
      </section>

    </article>
  );
};

export default Book;
