export const locales = ["en", "es", "it"] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  it: "Italiano",
}

export function getLocaleFromPathname(pathname: string): Locale {
  const seg = pathname.split("/")[1] as Locale
  return (locales.includes(seg) ? seg : "en") as Locale // default to 'en'
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}