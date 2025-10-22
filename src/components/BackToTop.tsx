import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { useI18n } from "@/lib/I18nProvider"
import { getTranslation, type TranslationKey } from "@/lib/translations"

export function BackToTop() {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const toggleVisibility = () => {

      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setIsScrolling(true)

    setTimeout(() => {
      const mainHeading = document.getElementById("post-title")
      if (mainHeading) {
        mainHeading.focus()
      }
    }, 200)
  }

  if (!isVisible) {
    return null
  }

  return (
    <>
      <button
        onClick={scrollToTop}
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background  fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-soft-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-violet-600 hover:border-violet-700 nav-link scale-100"
        aria-label={t('footer.back.to.top.process')}
      >
        <ArrowUp className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">{t('footer.back.to.top')}</span>
      </button>
      {
        isScrolling && (
          <div aria-live="polite" className="sr-only" aria-atomic="true">
            <p>{t("footer.back.to.top.process")}</p>
          </div>
        )
      }
    </>
  )
}