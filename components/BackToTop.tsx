"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
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

      setIsScrolling(true)
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

    const announcement = "Scrolling to top of page"
    const ariaLive = document.createElement("div")
    ariaLive.setAttribute("aria-live", "polite")
    ariaLive.setAttribute("aria-atomic", "true")
    ariaLive.className = "sr-only"
    ariaLive.textContent = announcement
    document.body.appendChild(ariaLive)
    setTimeout(() => document.body.removeChild(ariaLive), 1000)

    setTimeout(() => {
      const mainHeading = document.querySelector("h1")
      if (mainHeading) {
        mainHeading.focus()
      }
    }, 200)
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-soft-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-rose-600 hover:border-rose-700 focus-enhanced scale-100"
      aria-label="Scroll to top of page"
      title="Back to top"
    >
      <ArrowUp className="w-6 h-6" aria-hidden="true" />
      <span className="sr-only">Click to smoothly scroll back to the top of the page</span>
    </button>
  )
}
