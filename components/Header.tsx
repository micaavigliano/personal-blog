"use client"

import { useEffect, useId, useState } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"
import { useFocusTrap } from "../hook/useFocusTrap"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const titleId = useId()
  const panelId = useId()
  const pathname = usePathname()
  const params = useParams<{ slug?: string }>()
  const locale = getLocaleFromPathname(pathname)
  const mobileMenuRef = useFocusTrap()
  const isSlug = !!params.slug

  const t = (key: TranslationKey) => getTranslation(locale, key)

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isMenuOpen) {
      setIsMenuOpen(false)
      const buttonToFocus = document.getElementById('mobile-menu-button')

      if (buttonToFocus instanceof HTMLElement) {
        buttonToFocus.focus();
      }
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      const interactiveElements = mobileMenuRef.current?.querySelectorAll("input, a, button")

      if (interactiveElements) {
        const firstInteractiveElement = interactiveElements[0];
        if (firstInteractiveElement instanceof HTMLElement) {
          firstInteractiveElement.focus();
        }
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(true)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 w-full bg-white backdrop-blur-md border-b-2 border-neutral-300 z-50 shadow-soft rounded-b-4xl">
      {/* Skip link for keyboard users */}
      {!isMenuOpen && (
        <Link
          href="#main-content"
          className="skip-link hidden md:sr-only md:focus:not-sr-only md:block"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("main-content");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {t("nav.skip")}
        </Link>
      )
      }

      <div className="flex justify-between items-center py-4 mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={getLocalizedPath("/")}
          className="text-2xl font-bold text-neutral-800 transform hover:scale-105 transition-transform focus-enhanced"
        >
          Mica Avigliano
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex lg:flex space-x-6 items-center" aria-label="Main navigation">
          <Link
            href="/#about"
            className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus 
            ${pathname.includes("/about")
                ? "text-purple-900 bg-purple-50"
                : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
              }`}
          >
            {t("nav.about")}
          </Link>
          <Link
            href={getLocalizedPath("/experience")}
            className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus 
            ${pathname.includes("/experience")
                ? "text-amber-900 bg-amber-50"
                : "text-amber-600 hover:text-amber-900 hover:bg-amber-50"
              }`}
          >
            {t("nav.experience")}
          </Link>
          <Link
            href="/#services"
            className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus 
            ${pathname.includes("/services")
                ? "text-emerald-900 bg-emerald-50"
                : "text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50"
              }`}
          >
            {t("nav.services")}
          </Link>
          <Link
            href={getLocalizedPath("/blog")}
            className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus 
            ${pathname.includes("/blog")
                ? "text-teal-900 bg-teal-50"
                : "text-teal-600 hover:text-sky-900 hover:bg-teal-50"
              }`}
          >
            {t("nav.blog")}
          </Link>
          <Link
            href="/#contact"
            className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus 
            ${pathname.includes("/contact")
                ? "text-sky-900 bg-sky-50"
                : "text-sky-600 hover:text-neutral-900 hover:bg-sky-50"
              }`}
          >
            {t("nav.contact")}
          </Link>
          {!isSlug ? <LanguageSwitcher /> : null}
          <Link
            href={getLocalizedPath("/book")}
            className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus 
            ${pathname.includes("/book")
                ? "text-orange-900 bg-orange-50"
                : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              }`}
          >
            {t("nav.book")}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          {!isSlug ? <LanguageSwitcher /> : null}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          className="md:hidden py-4 bg-white backdrop-blur-md border rounded-b-4xl rounded-t-4xl border-t border-neutral-200"
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
            hidden={!open}
          >
            {/* Header with close */}
            <div className="flex justify-end-safe px-3 pb-2">
              <h2 id={titleId} className="sr-only">{t("nav.mobile.menu")}</h2>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  const buttonToFocus = document.getElementById('mobile-menu-button')

                  if (buttonToFocus instanceof HTMLElement) {
                    buttonToFocus.focus();
                  }
                }}
                className="hover:bg-neutral-100 rounded-xl text-neutral-700 focus-enhanced p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={t("nav.mobile.close")}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="menu items navigation">
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    href="/#about"
                    className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus $${pathname.includes("/about")
                      ? "text-purple-700 bg-purple-50"
                      : "text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                      }`}
                  >
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={getLocalizedPath("/experience")}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium transition-colors px-3 py-2 rounded-lg nav-focus ${pathname.includes("/experience")
                      ? "text-amber-900 bg-amber-50"
                      : "text-amber-600 hover:text-amber-900 hover:bg-amber-50"
                      }`}
                  >
                    {t("nav.experience")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus ${pathname.includes("/services")
                      ? "text-emerald-900 bg-emerald-50"
                      : "text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50"
                      }`}
                  >
                    {t("nav.services")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={getLocalizedPath("/blog")}
                    onClick={() => setIsMenuOpen(false)}
                    className={`nline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus ${pathname.includes("/blog")
                      ? "text-teal-900 bg-teal-50"
                      : "text-teal-600 hover:text-sky-900 hover:bg-teal-50"
                      }`}
                  >
                    {t("nav.blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus ${pathname.includes("/contact")
                      ? "text-sky-900 bg-sky-50"
                      : "text-sky-600 hover:text-neutral-900 hover:bg-sky-50"
                      }`}
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
                <li className="flex justify-center">
                  <Link
                    href={getLocalizedPath("/book")}
                    onClick={() => setIsMenuOpen(false)}
                    className={`inline-block font-medium transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-size:1.5rem_2px] [background-position:center_calc(100%-0.25rem)] focus:bg-none px-3 py-2 rounded-lg nav-focus ${pathname.includes("/book")
                      ? "text-orange-900 bg-orange-50"
                      : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                      }`}
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
