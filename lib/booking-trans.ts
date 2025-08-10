import type { Metadata } from "next"
import type { Locale } from "./translations"

interface MetadataTranslations {
  title: string
  description: string
}

export const bookingMetadata: Record<Locale, MetadataTranslations> = {
  en: {
    title: "Professional Experience - Frontend Developer & Accessibility Analyst",
    description: "6+ years of experience building scalable, accessible web applications with React, Next.js, TypeScript. Proven track record in legacy system migration, SEO optimization, and WCAG compliance.",
  },
  es: {
    title: "Reserva una consulta – Auditoría de accesibilidad y desarrollo frontend",
    description: "Más de 6 años de experiencia desarrollando aplicaciones web escalables y accesibles con React, Next.js y TypeScript. Historial comprobado en migración de sistemas heredados, optimización SEO y cumplimiento con las normas WCAG.",
  },
  it: {
    title: "Prenota una consulenza – Audit di accessibilità e sviluppo frontend",
    description: "Oltre 6 anni di esperienza nello sviluppo di applicazioni web scalabili e accessibili con React, Next.js e TypeScript. Comprovata esperienza nella migrazione di sistemi legacy, nell'ottimizzazione SEO e nella conformità alle linee guida WCAG.",
  },
}

export function getBookingMetadata(locale: string): Metadata {
  const validLocale = (["en", "es", "it"].includes(locale) ? locale : "en") as Locale
  const meta = bookingMetadata[validLocale]

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale === "en" ? "" : locale + "/"}book`,
    },
  }
}
