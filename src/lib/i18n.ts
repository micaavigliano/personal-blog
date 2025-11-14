export const locales = ['en', 'es', 'it'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
}

export const isValidLocale = (locale: string): locale is Locale => {
  return (locales as readonly string[]).includes(locale)
}

export const getLocaleFromPathname = (pathname: string): Locale => {
  const seg = pathname.split('/')[1]
  return isValidLocale(seg) ? (seg as Locale) : defaultLocale
}
