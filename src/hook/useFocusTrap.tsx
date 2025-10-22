import { useRef, useEffect } from "react"

export const FOCUSABLE_ELEMENTS = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'

export const useFocusTrap = () => {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleFocus = (event: KeyboardEvent) => {
      const container = ref.current
      if (!container) return

      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
      ).filter(el => !el.hasAttribute("disabled") && el.tabIndex !== -1)

      if (focusableElements.length === 0) return

      const firstEl = focusableElements[0]
      const lastEl = focusableElements[focusableElements.length - 1]

      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstEl) {
            event.preventDefault()
            lastEl.focus()
          }
        } else {
          if (document.activeElement === lastEl) {
            event.preventDefault()
            firstEl.focus()
          }
        }
      }
    }

    document.addEventListener("keydown", handleFocus)
    return () => document.removeEventListener("keydown", handleFocus)
  }, [])

  return ref
}