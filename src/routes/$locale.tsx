import {
  Outlet,
  createFileRoute,
  redirect,
} from '@tanstack/react-router'
import { I18nProvider } from '@/lib/I18nProvider'
import { isValidLocale, type Locale } from '@/lib/i18n'
import LocaleHead from './$locale/_head'


export const Route = createFileRoute('/$locale')({
  beforeLoad: ({ params }) => {
    if (!isValidLocale(params.locale)) {
      throw redirect({ to: '/$locale', params: { locale: 'en' } })
    }
  },
  component: LocaleLayout,
})

function LocaleLayout() {
  const { locale } = Route.useParams() as { locale: Locale }
  return (
    <I18nProvider locale={locale}>
      <LocaleHead />
      <Outlet />
    </I18nProvider>
  )
}
