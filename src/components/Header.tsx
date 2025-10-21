import { useEffect, useId, useMemo, useState } from "react"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { useI18n } from '@/lib/I18nProvider'
import { useFocusTrap } from "@/hook/useFocusTrap"
import { Link, useRouterState } from "@tanstack/react-router"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const titleId = useId()
  const panelId = useId()
  const pathname = useRouterState({ select: s => s.location.pathname })
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const mobileMenuRef = useFocusTrap()

  const { isPost, slug } = useMemo(() => {
    const seg = pathname.split("/").filter(Boolean)
    const isPost = seg.length >= 3 && seg[1] === "blog" && locale.includes(seg[0])
    return { isPost, slug: isPost ? seg[2] : "" }
  }, [pathname])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isMenuOpen) {
      setIsMenuOpen(false)
      const buttonToFocus = document.getElementById("mobile-menu-button")
      if (buttonToFocus instanceof HTMLElement) {
        buttonToFocus.focus()
      }
    }
  }

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isMenuOpen) {
      const interactiveElements = mobileMenuRef.current?.querySelectorAll("input, a, button")
      if (interactiveElements) {
        const firstInteractiveElement = interactiveElements[0]
        if (firstInteractiveElement instanceof HTMLElement) firstInteractiveElement.focus()
      }
    }
  }, [isMenuOpen, pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!isPost || !slug || !locale) {
        setTranslations({})
        return
      }
      try {
        const res = await fetch(`/api/translations?slug=${encodeURIComponent(slug)}&locale=${locale}`, { cache: "no-store" })
        const data = await res.json()
        if (!ignore && data?.translations) setTranslations(data.translations)
      } catch {
        if (!ignore) setTranslations({})
      }
    }
    load()
    return () => { ignore = true }
  }, [isPost, slug, locale])

  return (
    <header className="backdrop-blur-sm border-b border-t bg-background mx-auto px-4 sm:px-6 py-2 sm:py-4">
      {!isMenuOpen && (
        <a
          href="#main-content"
          className="skip-link hidden md:sr-only md:focus:not-sr-only md:block"
        >
          {t("nav.skip")}
        </a>
      )}

      <div className="flex justify-between items-center">
        <Link
          to="/$locale"
          params={{ locale }}
          className="text-lg sm:text-xl font-bold hover:opacity-70 transition-opacity"
        >
          Mica Avigliano
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:hidden lg:flex space-x-6 items-center" aria-label="Main navigation">
          <Link
            to="/$locale/experience"
            params={{ locale }}
            activeOptions={{ exact: false }}
            activeProps={{
              className: "text-foreground transition-colors nav-focus bg-violet-100 px-2 py-1 rounded-md"
            }}
            inactiveProps={{
              className: "text-black underline decoration-violet-400 decoration-3 underline-offset-4"
            }}
          >
            {t("nav.experience")}
          </Link>
          <Link
            to="/$locale/services"
            params={{ locale }}
            activeProps={{
              className: "text-foreground transition-colors nav-focus bg-violet-100 px-2 py-1 rounded-md"
            }}
            inactiveProps={{
              className: "text-black underline decoration-violet-400 decoration-3 underline-offset-4"
            }}
          >
            {t("nav.services")}
          </Link>
          <Link
            to="/$locale/blog"
            params={{ locale }}
            activeProps={{
              className: "text-foreground transition-colors nav-focus bg-violet-100 px-2 py-1 rounded-md"
            }}
            inactiveProps={{
              className: "text-black underline decoration-violet-400 decoration-3 underline-offset-4"
            }}
          >
            {t("nav.blog")}
          </Link>
          <LanguageSwitcher translations={translations} />
          <Link
            to="/$locale/book"
            params={{ locale }}
            activeProps={{
              className: "text-foreground transition-colors nav-focus bg-violet-100 px-2 py-1 rounded-md"
            }}
            inactiveProps={{
              className: "text-black underline decoration-violet-400 decoration-3 underline-offset-4"
            }}
          >
            {t("nav.book")}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher translations={translations} />
          <button
            onClick={openMenu}
            className="hover:bg-neutral-100 rounded-xl text-neutral-700 focus-enhanced"
            aria-expanded={isMenuOpen}
            aria-controls={panelId}
            aria-haspopup="dialog"
            aria-label={isMenuOpen ? t("nav.mobile.menu.close") : t("nav.mobile.menu.open")}
            id="mobile-menu-button"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4"
          ref={mobileMenuRef}
          aria-label={t("nav.mobile.menu")}
          onKeyUp={onKeyDown}
        >
          <div
            className="flex flex-col space-y-4"
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            hidden={!isMenuOpen}
          >
            <div className="flex justify-end-safe px-3 pb-2">
              <h2 id={titleId} className="sr-only">{t("nav.mobile.menu")}</h2>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  const buttonToFocus = document.getElementById("mobile-menu-button")
                  if (buttonToFocus instanceof HTMLElement) buttonToFocus.focus()
                }}
                className="hover:bg-neutral-100 rounded-xl text-neutral-700 focus-enhanced p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={t("nav.mobile.close")}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="menu items navigation">
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    to="/$locale/experience"
                    params={{ locale }}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 text-lg text-foreground hover:text-primary transition-colors font-medium nav-focus"
                  >
                    {t("nav.experience")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$locale/services"
                    params={{ locale }}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 text-lg text-foreground hover:text-primary transition-colors font-medium nav-focus"
                  >
                    {t("nav.services")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$locale/blog"
                    params={{ locale }}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 text-lg text-foreground hover:text-primary transition-colors font-medium nav-focus"
                  >
                    {t("nav.blog")}
                  </Link>
                </li>
                <li className="flex justify-center">
                  <Link
                    to="/$locale/book"
                    params={{ locale }}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 text-lg text-foreground hover:text-primary transition-colors font-medium nav-focus"
                  >
                    {t("nav.book")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header