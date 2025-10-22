import { Helmet } from 'react-helmet-async'
import { useI18n } from '@/lib/I18nProvider'
import { locales } from '@/lib/i18n'

export default function LocaleHead() {
  const { locale } = useI18n()
  const site = 'https://micaavigliano.com'
  const title = {
    en: 'Mica Avigliano - Frontend Developer & Accessibility Engineer',
    es: 'Mica Avigliano - Desarrollador Frontend e Ingeniera de Accesibilidad',
    it: 'Mica Avigliano - Sviluppatore Frontend e Ingegnere di Accessibilità',
  }[locale]

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content="Frontend developer and accessibility engineer" />
      {locales.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${site}/${l}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${site}/en`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${site}/${locale}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content="Frontend developer and accessibility engineer" />
      <meta property="og:image" content={`${site}/og-image.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content="Frontend developer and accessibility engineer" />
      <meta name="twitter:image" content={`${site}/og-image.png`} />
    </Helmet>
  )
}
