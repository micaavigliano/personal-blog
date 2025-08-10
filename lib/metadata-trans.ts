import type { Metadata } from "next"
import type { Locale } from "./translations"

interface MetadataTranslations {
  title: string
  description: string
  keywords: string[]
  openGraph: {
    title: string
    description: string
  }
}

export const experienceMetadata: Record<Locale, MetadataTranslations> = {
  en: {
    title: "Professional Experience - Frontend Developer & Accessibility Analyst",
    description:
      "6+ years of experience building scalable, accessible web applications with React, Next.js, TypeScript. Proven track record in legacy system migration, SEO optimization, and WCAG compliance.",
    keywords: [
      "frontend developer experience",
      "React developer",
      "Next.js expert",
      "accessibility analyst",
      "TypeScript developer",
      "web development career",
      "WCAG compliance",
      "legacy system migration",
    ],
    openGraph: {
      title: "Professional Experience - Frontend Developer & Accessibility Analyst",
      description:
        "6+ years of experience building scalable, accessible web applications with React, Next.js, TypeScript. Proven track record in legacy system migration and WCAG compliance.",
    },
  },
  es: {
    title: "Experiencia Profesional - Desarrollador Frontend y Analista de Accesibilidad",
    description:
      "6+ años de experiencia construyendo aplicaciones web escalables y accesibles con React, Next.js, TypeScript. Historial comprobado en migración de sistemas legacy, optimización SEO y cumplimiento WCAG.",
    keywords: [
      "experiencia desarrollador frontend",
      "desarrollador React",
      "experto Next.js",
      "analista accesibilidad",
      "desarrollador TypeScript",
      "carrera desarrollo web",
      "cumplimiento WCAG",
      "migración sistemas legacy",
    ],
    openGraph: {
      title: "Experiencia Profesional - Desarrollador Frontend y Analista de Accesibilidad",
      description:
        "6+ años de experiencia construyendo aplicaciones web escalables y accesibles con React, Next.js, TypeScript. Historial comprobado en migración de sistemas legacy y cumplimiento WCAG.",
    },
  },
  it: {
    title: "Esperienza Professionale - Sviluppatore Frontend e Analista di Accessibilità",
    description:
      "6+ anni di esperienza nella costruzione di applicazioni web scalabili e accessibili con React, Next.js, TypeScript. Comprovata esperienza nella migrazione di sistemi legacy, ottimizzazione SEO e conformità WCAG.",
    keywords: [
      "esperienza sviluppatore frontend",
      "sviluppatore React",
      "esperto Next.js",
      "analista accessibilità",
      "sviluppatore TypeScript",
      "carriera sviluppo web",
      "conformità WCAG",
      "migrazione sistemi legacy",
    ],
    openGraph: {
      title: "Esperienza Professionale - Sviluppatore Frontend e Analista di Accessibilità",
      description:
        "6+ anni di esperienza nella costruzione di applicazioni web scalabili e accessibili con React, Next.js, TypeScript. Comprovata esperienza nella migrazione di sistemi legacy e conformità WCAG.",
    },
  },
}

export function getExperienceMetadata(locale: string): Metadata {
  const validLocale = (["en", "es", "it"].includes(locale) ? locale : "en") as Locale
  const meta = experienceMetadata[validLocale]

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: `https://micaavigliano.com/${locale === "en" ? "" : locale + "/"}experience`,
      type: "website",
    },
    alternates: {
      canonical: `/${locale === "en" ? "" : locale + "/"}experience`,
    },
  }
}
