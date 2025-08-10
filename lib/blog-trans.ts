import type { Metadata } from "next"
import type { Locale } from "./translations"

interface MetadataTranslations {
  title: string
  description: string
  keywords: string[]
  openGraph: {
    title: string
    description: string
    url: string,
    type: string
  },
  alternates: {
    canonical: string
  }
}

export const blogMetadata: Record<Locale, MetadataTranslations> = {
  en: {
    title: "Blog - Web Accessibility & Frontend Development",
    description:
      "Latest articles and insights on web accessibility, WCAG compliance, frontend development, React, Next.js, and inclusive design practices.",
    keywords: [
      "web accessibility blog",
      "WCAG tutorials",
      "frontend development articles",
      "React accessibility",
      "inclusive design blog",
      "accessibility testing",
      "screen reader guides",
    ],
    openGraph: {
      title: "Blog - Web Accessibility & Frontend Development",
      description:
        "Latest articles and insights on web accessibility, WCAG compliance, frontend development, and inclusive design practices.",
      url: "https://micaavigliano.com/blog",
      type: "website",
    },
    alternates: {
      canonical: "/blog",
    },
  },
  es: {
    title: "Blog - Accesibilidad Web y Desarrollo Frontend",
    description:
      "Últimos artículos y perspectivas sobre accesibilidad web, cumplimiento de WCAG, desarrollo frontend, React, Next.js y prácticas de diseño inclusivo.",
    keywords: [
      "blog de accesibilidad web",
      "tutoriales WCAG",
      "artículos de desarrollo frontend",
      "accesibilidad en React",
      "blog de diseño inclusivo",
      "pruebas de accesibilidad",
      "guías de lectores de pantalla",
    ],
    openGraph: {
      title: "Blog - Accesibilidad Web y Desarrollo Frontend",
      description:
        "Últimos artículos y perspectivas sobre accesibilidad web, cumplimiento de WCAG, desarrollo frontend y prácticas de diseño inclusivo.",
      url: "https://micaavigliano.com/blog",
      type: "website",
    },
    alternates: {
      canonical: "/blog",
    },
  },
  it: {
    title: "Blog - Accessibilità Web e Sviluppo Frontend",
    description:
      "Ultimi articoli e approfondimenti su accessibilità web, conformità WCAG, sviluppo frontend, React, Next.js e pratiche di design inclusivo.",
    keywords: [
      "blog accessibilità web",
      "tutorial WCAG",
      "articoli sviluppo frontend",
      "accessibilità in React",
      "blog design inclusivo",
      "test di accessibilità",
      "guide per screen reader",
    ],
    openGraph: {
      title: "Blog - Accessibilità Web e Sviluppo Frontend",
      description:
        "Ultimi articoli e approfondimenti su accessibilità web, conformità WCAG, sviluppo frontend e pratiche di design inclusivo.",
      url: "https://micaavigliano.com/blog",
      type: "website",
    },
    alternates: {
      canonical: "/blog",
    },
  }
}

export function getBlogMetadata(locale: string): Metadata {
  const validLocale = (["en", "es", "it"].includes(locale) ? locale : "en") as Locale
  const meta = blogMetadata[validLocale]

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: `https://micaavigliano.com/${locale === "en" ? "" : locale + "/"}blog`,
      type: "website",
    },
    alternates: {
      canonical: `/${locale === "en" ? "" : locale + "/"}experience`,
    },
  }
}
