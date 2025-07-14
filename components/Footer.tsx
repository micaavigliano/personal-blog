"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-3xl mt-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-purple-300 mb-6 block">
              YourName
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Frontend developer and accessibility analyst passionate about building beautiful, functional, and
              inclusive digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="p-3 rounded-full bg-pink-300 hover:bg-pink-400 transition-all shadow-lg hover:shadow-xl hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-3 rounded-full bg-purple-300 hover:bg-purple-400 transition-all shadow-lg hover:shadow-xl hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-3 rounded-full bg-blue-300 hover:bg-blue-400 transition-all shadow-lg hover:shadow-xl hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Projects
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link href="/book" className="text-gray-400 hover:text-white transition-colors">
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Accessibility Audits</span>
              </li>
              <li>
                <span className="text-gray-400">Frontend Development</span>
              </li>
              <li>
                <span className="text-gray-400">WCAG Consulting</span>
              </li>
              <li>
                <span className="text-gray-400">Team Training</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-pink-400" /> by Mica Avigliano © 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
