import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Mica Avigliano - Frontend Developer & Accessibility Analyst",
  description:
    "Expert frontend developer and accessibility analyst specializing in WCAG compliance, React/Next.js development, and inclusive web design. Creating accessible digital experiences for everyone.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
