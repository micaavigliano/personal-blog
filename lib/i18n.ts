export const locales = ["en", "es", "it"] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  it: "Italiano",
}

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  it: "🇮🇹",
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/")
  const potentialLocale = segments[1] as Locale
  return locales.includes(potentialLocale) ? potentialLocale : "en"
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
