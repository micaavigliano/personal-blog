"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
//import { Menu, X } from "lucide-react"
// import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-pink-100 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-purple-500">
            Mica Avigliano
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <button
              onClick={() => scrollToSection("about")}
              className="font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              Projects
            </button>
            <Link
              href="/blog"
              className={`font-medium transition-colors ${pathname === "/blog" ? "text-pink-500" : "text-gray-600 hover:text-pink-500"
                }`}
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              Contact
            </button>
            <Link
              href="/book"
              className="bg-rose-400 hover:bg-rose-500 text-black px-4 py-2 rounded-full font-medium transition-colors"
            >
              Book a Call
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          {/* <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button> */}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-pink-100">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="font-medium text-gray-600 hover:text-pink-500 transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="font-medium text-gray-600 hover:text-pink-500 transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="font-medium text-gray-600 hover:text-pink-500 transition-colors text-left"
              >
                Projects
              </button>
              <Link
                href="/blog"
                className={`font-medium transition-colors ${pathname === "/blog" ? "text-pink-500" : "text-gray-600 hover:text-pink-500"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="font-medium text-gray-600 hover:text-pink-500 transition-colors text-left"
              >
                Contact
              </button>
              <Link
                href="/book"
                className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-3 rounded-xl font-medium transition-all text-center shadow-soft"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Call
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
