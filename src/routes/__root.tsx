import { Outlet, createRootRoute, redirect, useLocation } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { defaultLocale, getLocaleFromPathname, type Locale } from '@/lib/i18n'
import { I18nProvider } from '@/lib/I18nProvider'
import LocaleHead from '@/components/LocaleHead'
import Error from '@/components/Error'

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const firstSeg = (location.pathname || '/').split('/')[1]
    if (!firstSeg) {
      // Use the route pattern and pass params so TypeScript types and runtime routing both work
      throw redirect({ to: '/$locale', params: { locale: defaultLocale } })
    }
  },
  component: RootShell,
  notFoundComponent: () => <Error />,
})

function RootShell() {
  const { pathname } = useLocation()
  const locale = getLocaleFromPathname(pathname) as Locale

  return (
    <I18nProvider locale={locale}>
      <LocaleHead />
      <Header />
      <main tabIndex={-1} id="main-content">
        <Outlet />
      </main>
      <Footer />
    </I18nProvider>
  )
}