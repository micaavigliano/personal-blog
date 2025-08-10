export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://micaavigliano.com/#person",
        name: "YourName",
        url: "https://micaavigliano.com",
        image: {
          "@type": "ImageObject",
          url: "https://micaavigliano.com/profile-image.jpg",
          width: 400,
          height: 400,
        },
        sameAs: [
          "https://github.com/micaavigliano",
          "https://linkedin.com/in/micaelaavigliano",
        ],
        jobTitle: "Frontend Developer & Accessibility Analyst",
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
        },
        knowsAbout: [
          "Web Accessibility",
          "WCAG Compliance",
          "Frontend Development",
          "React",
          "Next.js",
          "TypeScript",
          "Javascript",
          "HTML",
          "Inclusive Design",
          "Screen Reader Optimization",
        ],
        email: "micaela.avigliano@gmail.com",
      },
      {
        "@type": "WebSite",
        "@id": "https://micaavigliano.com/#website",
        url: "https://micaavigliano.com",
        name: "Mica Avigliano - Frontend Developer & Accessibility Analyst",
        description:
          "Expert frontend developer and accessibility analyst specializing in WCAG compliance, React/Next.js development, and inclusive web design.",
        publisher: {
          "@id": "https://micaavigliano.com/#person",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://micaavigliano.com/blog?search={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://micaavigliano.com/#service",
        name: "Frontend Development & Accessibility Services",
        description:
          "Professional frontend development and web accessibility services including WCAG audits, React/Next.js development, and accessibility training.",
        provider: {
          "@id": "https://micaavigliano.com/#person",
        },
        areaServed: "Worldwide",
        serviceType: [
          "Frontend Development",
          "React Development",
          "Next.js Development",
          "Web Accessibility Audit",
          "WCAG Compliance Consulting",
          "Accessibility Training",
        ],
        url: "https://micaavigliano.com",
        email: "micaela.avigliano@gmail.com",
      },
      {
        "@type": "Blog",
        "@id": "https://micaavigliano.com/blog#blog",
        url: "https://micaavigliano.com/blog",
        name: "Web Accessibility & Frontend Development Blog",
        description:
          "Articles and insights on web accessibility, WCAG compliance, frontend development, and inclusive design practices.",
        publisher: {
          "@id": "https://micaavigliano.com/#person",
        },
        inLanguage: "en-US",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
