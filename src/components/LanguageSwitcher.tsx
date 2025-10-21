import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Globe, ChevronDown, Check } from "lucide-react"
import { locales, localeNames, type Locale, getLocaleFromPathname } from "@/lib/i18n"
import { getTranslation, type TranslationKey } from "@/lib/translations"
import { useLocation, useRouter } from '@tanstack/react-router'
import { useI18n } from "@/lib/I18nProvider"

type Props = {
  translations: Partial<Record<Locale, string>>
}

function detectIsPost(pathname: string): { isPost: boolean; slug?: string } {
  const parts = pathname.split("/").filter(Boolean)
  const isPost = parts.length >= 3 && parts[1] === "blog" && locales.includes(parts[0] as Locale)
  return { isPost, slug: isPost ? parts[2] : undefined }
}

export function LanguageSwitcher({ translations }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [newLocaleName, setNewLocaleName] = useState("")

  const location = useLocation()
  const router = useRouter()
  const pathname = location.pathname
  const searchStr = location.searchStr
  const hashStr = location.hash

  const { locale } = useI18n()
  const currentLocale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const { isPost } = detectIsPost(pathname)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => { optionRefs.current = optionRefs.current.slice(0, locales.length) }, [])

  const updateFocusedIndex = (i: number) => {
    setFocusedIndex(i)
    optionRefs.current[i]?.focus()
  }

  const buildTargetHref = (fromPath: string, targetLocale: Locale): string => {
    const [pathOnly] = fromPath.split(/[?#]/)
    const parts = pathOnly.split("/")
    const hasLocale = locales.includes(parts[1] as Locale)
    if (hasLocale) parts[1] = targetLocale
    else parts.splice(1, 0, targetLocale)

    const blogIndex = parts.indexOf("blog")
    if (blogIndex !== -1 && parts[blogIndex + 1]) {
      const translatedSlug = translations?.[targetLocale]
      if (translatedSlug) parts[blogIndex + 1] = translatedSlug
    }

    const newPath = parts.join("/").replace(/\/{2,}/g, "/")

    return `${newPath}${searchStr}${hashStr}`
  }

  const switchLanguage = (targetLocale: Locale) => {
    const href = buildTargetHref(pathname, targetLocale)
    router.navigate({ to: href })
    setIsOpen(false)
    setFocusedIndex(-1)
    setNewLocaleName(localeNames[targetLocale])
    document.documentElement.lang = targetLocale
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault()
        setIsOpen(true)
        const idx = Math.max(0, locales.indexOf(currentLocale))
        setTimeout(() => updateFocusedIndex(idx), 0)
      }
      return
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        buttonRef.current?.focus()
        break
      case "ArrowDown": {
        event.preventDefault()
        const nextIndex = focusedIndex < locales.length - 1 ? focusedIndex + 1 : 0
        updateFocusedIndex(nextIndex)
        break
      }
      case "ArrowUp": {
        event.preventDefault()
        const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : locales.length - 1
        updateFocusedIndex(prevIndex)
        break
      }
      case "Enter":
      case " ":
        event.preventDefault()
        if (focusedIndex >= 0) switchLanguage(locales[focusedIndex])
        break
      case "Home":
        event.preventDefault()
        updateFocusedIndex(0)
        break
      case "End":
        event.preventDefault()
        updateFocusedIndex(locales.length - 1)
        break
      case "Tab":
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }

  const handleOptionKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "Escape":
        event.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        buttonRef.current?.focus()
        break
      case "ArrowDown": {
        event.preventDefault()
        const nextIndex = index < locales.length - 1 ? index + 1 : 0
        updateFocusedIndex(nextIndex)
        break
      }
      case "ArrowUp": {
        event.preventDefault()
        const prevIndex = index > 0 ? index - 1 : locales.length - 1
        updateFocusedIndex(prevIndex)
        break
      }
      case "Enter":
      case " ":
        event.preventDefault()
        switchLanguage(locales[index])
        break
      case "Home":
        event.preventDefault()
        updateFocusedIndex(0)
        break
      case "End":
        event.preventDefault()
        updateFocusedIndex(locales.length - 1)
        break
      case "Tab":
        if (event.shiftKey && index === 0) {
          event.preventDefault()
          setIsOpen(false)
          setFocusedIndex(-1)
          buttonRef.current?.focus()
        } else if (!event.shiftKey && index === locales.length - 1) {
          setIsOpen(false)
          setFocusedIndex(-1)
        }
        break
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus()
    }
  }, [isOpen, focusedIndex])

  const allowSwitch = (loc: Locale) => {
    return !isPost || Boolean(translations?.[loc])
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          const open = !isOpen
          setIsOpen(open)
          if (open) {
            const idx = Math.max(0, locales.indexOf(currentLocale))
            setTimeout(() => updateFocusedIndex(idx), 0)
          } else {
            setFocusedIndex(-1)
          }
        }}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 text-peach-800 hover:text-peach-900 px-3 py-2 rounded-lg bg-peach-100 hover:bg-peach-200 border border-peach-300 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 nav-focus min-w-[44px] min-h-[44px]"
        aria-label={`Current language: ${localeNames[currentLocale]}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="language-button"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="flex items-center gap-2">
          <span className="hidden sm:inline font-medium">{localeNames[currentLocale]}</span>
          <span className="sm:hidden font-medium text-xs code-style">{currentLocale.toUpperCase()}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-soft-lg border-2 border-peach-200 py-2 z-50 min-w-[180px] backdrop-blur-sm"
          role="listbox"
          aria-labelledby="language-button"
        >
          <div className="px-3 py-2 text-xs font-medium text-peach-600 border-b border-peach-100">
            {t("nav.select.language")}
          </div>

          {locales.map((loc, index) => {
            const isSelected = currentLocale === loc
            const allow = allowSwitch(loc)
            const isFocused = focusedIndex === index

            return (
              <button
                key={loc}
                ref={(el) => { optionRefs.current[index] = el }}
                id={`language-option-${loc}`}
                onClick={() => allow && switchLanguage(loc)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                onMouseEnter={() => document.activeElement !== optionRefs.current[index] && setFocusedIndex(index)}
                onFocus={() => setFocusedIndex(index)}
                className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 rounded-lg focus:outline-none
                  ${isSelected ? "bg-peach-100 text-peach-800" : "text-peach-600 hover:bg-peach-50"}
                  ${isFocused ? "bg-peach-50 ring-2 ring-peach-400 ring-offset-1" : ""}
                  ${!allow ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={!allow}
                tabIndex={isFocused ? 0 : -1}
              >
                <span className="font-medium flex-1">{localeNames[loc]}</span>
                <span className="text-xs text-peach-600 code-style">{loc}</span>
                {isSelected && <Check className="w-4 h-4 text-peach-600 flex-shrink-0" aria-hidden="true" />}
              </button>
            )
          })}

          <div className="px-3 py-2 text-xs text-peach-600 border-t border-peach-400 mt-1">
            {t("nav.extraInfo")}
          </div>
        </div>
      )}

      {/* SR announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isOpen && `Language menu opened. ${locales.length} options available.`}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {newLocaleName && `Language changed to ${newLocaleName}`}
      </div>
    </div>
  )
}