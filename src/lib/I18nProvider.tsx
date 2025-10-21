import { createContext, useContext, type ReactNode } from 'react'
import type { Locale } from './i18n'

type I18nContextValue = {
  locale: Locale
  setLocale?: (l: Locale) => void // if you later add a switcher
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode
  locale: Locale
}) {
  return <I18nContext.Provider value={{ locale }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}
