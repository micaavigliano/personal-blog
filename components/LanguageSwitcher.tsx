"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Globe, ChevronDown, Check } from "lucide-react"
import { locales, localeNames, type Locale, getLocaleFromPathname } from "@/lib/i18n"
import { getTranslation, TranslationKey } from "@/lib/translations"

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [newLocale, setNewLocale] = useState("")
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  const currentLocale = getLocaleFromPathname(pathname)
  const currentLanguageName = localeNames[currentLocale]

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, locales.length)
  }, [])

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split("/")
    const isCurrentLocaleInPath = locales.includes(segments[1] as Locale)

    let newPathname: string
    if (isCurrentLocaleInPath) {
      segments[1] = newLocale
      newPathname = segments.join("/")
    } else {
      newPathname = `/${newLocale}${pathname}`
    }

    router.push(newPathname)
    setIsOpen(false)
    setFocusedIndex(-1)

    setNewLocale(localeNames[newLocale])
  }

  const updateFocusedIndex = (newIndex: number) => {
    setFocusedIndex(newIndex)
    if (optionRefs.current[newIndex]) {
      optionRefs.current[newIndex]?.focus()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault()
        setIsOpen(true)
        setTimeout(() => updateFocusedIndex(0), 0)
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
      case "ArrowDown":
        event.preventDefault()
        const nextIndex = focusedIndex < locales.length - 1 ? focusedIndex + 1 : 0
        updateFocusedIndex(nextIndex)
        break
      case "ArrowUp":
        event.preventDefault()
        const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : locales.length - 1
        updateFocusedIndex(prevIndex)
        break
      case "Enter":
      case " ":
        event.preventDefault()
        if (focusedIndex >= 0) {
          switchLanguage(locales[focusedIndex])
        }
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
      case "ArrowDown":
        event.preventDefault()
        const nextIndex = index < locales.length - 1 ? index + 1 : 0
        updateFocusedIndex(nextIndex)
        break
      case "ArrowUp":
        event.preventDefault()
        const prevIndex = index > 0 ? index - 1 : locales.length - 1
        updateFocusedIndex(prevIndex)
        break
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
    const handleClickOutside = (event: MouseEvent) => {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          const newIsOpen = !isOpen
          setIsOpen(newIsOpen)
          if (newIsOpen) {
            setTimeout(() => updateFocusedIndex(0), 0)
          } else {
            setFocusedIndex(-1)
          }
        }}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 text-peach-800 hover:text-peach-900 px-3 py-2 rounded-lg bg-peach-100 hover:bg-peach-200 border border-peach-300 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 nav-focus"
        aria-label={`Current language: ${currentLanguageName}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="language-button"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="flex items-center gap-2">
          <span className="hidden sm:inline font-medium">{currentLanguageName}</span>
          <span className="sm:hidden font-medium text-xs code-style">{currentLocale.toUpperCase()}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-soft-lg border-2 border-peach-200 py-2 z-50 min-w-[180px] backdrop-blur-sm"
          role="listbox"
          aria-labelledby="language-button"
          aria-activedescendant={focusedIndex >= 0 ? `language-option-${locales[focusedIndex]}` : undefined}
        >
          <div className="px-3 py-2 text-xs font-medium text-peach-600 border-b border-peach-100">{t("nav.select.language")}</div>
          {locales.map((loc, index) => {
            const isSelected = currentLocale === loc
            const isFocused = focusedIndex === index

            return (
              <button
                key={loc}
                ref={(el) => {
                  optionRefs.current[index] = el
                }}
                id={`language-option-${loc}`}
                onClick={() => switchLanguage(loc)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                onMouseEnter={() => {
                  if (document.activeElement !== optionRefs.current[index]) {
                    setFocusedIndex(index)
                  }
                }}
                onFocus={() => {
                  setFocusedIndex(index)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-peach-50 transition-colors flex items-center gap-3 rounded-lg focus:outline-none focus:bg-peach-50 ${isSelected ? "bg-peach-100 text-peach-800" : "text-peach-600"
                  } ${isFocused ? "bg-peach-50 ring-2 ring-peach-400 ring-offset-1" : ""}`}
                role="option"
                aria-selected={isSelected}
                aria-current={isSelected ? "true" : "false"}
                tabIndex={isFocused ? 0 : -1}
              >
                <span className="font-medium flex-1">{localeNames[loc]}</span>
                <span className="text-xs text-peach-400 code-style">{loc}</span>
                {isSelected && <Check className="w-4 h-4 text-peach-600 flex-shrink-0" aria-hidden="true" />}
              </button>
            )
          })}
          <div className="px-3 py-2 text-xs text-peach-400 border-t border-peach-100 mt-1">
            {t("nav.extraInfo")}
          </div>
        </div>
      )}

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isOpen && `Language menu opened. ${locales.length} options available. ${t("nav.extraInfo")}`}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Language changed to ${newLocale}`}
      </div>
    </div>
  )
}
