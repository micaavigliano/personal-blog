export interface Service {
  icon: string
  title: string
  description: string
  features: string[]
  bgColor: string
  textColor: string
  borderColor: string
  buttonColor: string
}

export const servicesData: Record<"en" | "es" | "it", Service[]> = {
  en: [
    {
      icon: "FileText",
      title: "Accessibility Audits",
      description: "Comprehensive WCAG 2.1/2.2 compliance assessments with detailed reports and remediation guidance.",
      features: [
        "Manual and automated testing",
        "Screen reader evaluation",
        "Keyboard navigation testing",
        "Color contrast analysis",
        "Detailed remediation plan",
      ],
      bgColor: "rose-500",
      textColor: "text-rose-700",
      borderColor: "border-rose-200",
      buttonColor: "bg-rose-500 hover:bg-rose-600",
    },
    {
      icon: "Code",
      title: "Frontend Development",
      description: "Building accessible, performant web applications with modern frameworks and best practices.",
      features: [
        "React/Next.js development",
        "Semantic HTML structure",
        "ARIA implementation",
        "Progressive enhancement",
        "Performance optimization",
      ],
      bgColor: "sky-600",
      textColor: "text-sky-700",
      borderColor: "border-sky-200",
      buttonColor: "bg-sky-500 hover:bg-sky-600",
    },
    {
      icon: "Users",
      title: "Accessibility Training",
      description: "Empowering teams with knowledge and skills to create inclusive digital experiences.",
      features: [
        "Developer workshops",
        "Design team training",
        "WCAG guidelines overview",
        "Hands-on testing sessions",
        "Best practices documentation",
      ],
      bgColor: "lavender-600",
      textColor: "text-lavender-700",
      borderColor: "border-lavender-200",
      buttonColor: "bg-lavender-500 hover:bg-lavender-600",
    },
  ],
  es: [
    {
      icon: "FileText",
      title: "Auditorías de Accesibilidad",
      description:
        "Evaluaciones integrales de cumplimiento WCAG 2.1/2.2 con informes detallados y guías de remediación.",
      features: [
        "Pruebas manuales y automatizadas",
        "Evaluación con lectores de pantalla",
        "Pruebas de navegación por teclado",
        "Análisis de contraste de color",
        "Plan detallado de remediación",
      ],
      bgColor: "rose-600",
      textColor: "text-rose-700",
      borderColor: "border-rose-200",
      buttonColor: "bg-rose-600 hover:bg-rose-700",
    },
    {
      icon: "Code",
      title: "Desarrollo Frontend",
      description:
        "Construcción de aplicaciones web accesibles y eficientes con frameworks modernos y mejores prácticas.",
      features: [
        "Desarrollo React/Next.js",
        "Estructura HTML semántica",
        "Implementación ARIA",
        "Mejora progresiva",
        "Optimización de rendimiento",
      ],
      bgColor: "sky-600",
      textColor: "text-sky-700",
      borderColor: "border-sky-200",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      icon: "Users",
      title: "Capacitación en Accesibilidad",
      description: "Empoderando equipos con conocimiento y habilidades para crear experiencias digitales inclusivas.",
      features: [
        "Talleres para desarrolladores",
        "Capacitación de equipos de diseño",
        "Resumen de pautas WCAG",
        "Sesiones de pruebas prácticas",
        "Documentación de mejores prácticas",
      ],
      bgColor: "bg-lavender-100",
      textColor: "text-lavender-700",
      borderColor: "border-lavender-200",
      buttonColor: "bg-lavender-600 hover:bg-lavender-700",
    },
  ],
  it: [
    {
      icon: "FileText",
      title: "Audit di Accessibilità",
      description:
        "Valutazioni complete della conformità WCAG 2.1/2.2 con report dettagliati e guide per la risoluzione.",
      features: [
        "Test manuali e automatizzati",
        "Valutazione con screen reader",
        "Test di navigazione da tastiera",
        "Analisi del contrasto dei colori",
        "Piano dettagliato di risoluzione",
      ],
      bgColor: "rose-500",
      textColor: "text-rose-700",
      borderColor: "border-rose-200",
      buttonColor: "bg-rose-500 hover:bg-rose-600",
    },
    {
      icon: "Code",
      title: "Sviluppo Frontend",
      description: "Costruzione di applicazioni web accessibili e performanti con framework moderni e best practice.",
      features: [
        "Sviluppo React/Next.js",
        "Struttura HTML semantica",
        "Implementazione ARIA",
        "Miglioramento progressivo",
        "Ottimizzazione delle prestazioni",
      ],
      bgColor: "sky-600",
      textColor: "text-sky-700",
      borderColor: "border-sky-200",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      icon: "Users",
      title: "Formazione sull'Accessibilità",
      description: "Potenziare i team con conoscenze e competenze per creare esperienze digitali inclusive.",
      features: [
        "Workshop per sviluppatori",
        "Formazione team di design",
        "Panoramica linee guida WCAG",
        "Sessioni di test pratici",
        "Documentazione best practice",
      ],
      bgColor: "lavender-600",
      textColor: "text-lavender-700",
      borderColor: "border-lavender-200",
      buttonColor: "bg-lavender-600 hover:bg-lavender-700",
    },
  ],
}

export function getServicesData(locale: string): Service[] {
  const validLocale = ["en", "es", "it"].includes(locale) ? (locale as "en" | "es" | "it") : "en"
  return servicesData[validLocale]
}
