"use client"

import { Calendar, MapPin, Code, Award, Briefcase, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Cards"
import { Badge } from "../components/ui/Badge"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getTranslation, TranslationKey } from "@/lib/translations"
import { getLocaleFromPathname } from "@/lib/i18n"
import { getExperienceData } from "@/lib/experiencedata"

export function Experience() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const experiencesData = getExperienceData(locale)

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`
  }

  const scrollToSection = (sectionId: string) => {
    if (!pathname.includes("/#") && pathname !== "/" && !pathname.match(/^\/[a-z]{2}$/)) {
      window.location.href = `/${locale}/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const skills = {
    languages: ["JavaScript", "TypeScript", "HTML5", "CSS3", "PHP", "Node.js"],
    frameworks: ["React", "Next.js", "Vue.js", "Redux", "GraphQL"],
    testing: ["React Testing Library", "Jest", "Cypress", "Enzyme", "Axe", "Lighthouse"],
    accessibility: ["WCAG 2.1 AA", "ARIA", "Screen Readers", "Keyboard Navigation"],
    tools: ["Git", "GitLab", "Bitbucket", "Contentful", "WordPress", "Drupal", "Mixpanel", "Optimizely"],
    styling: ["Tailwind CSS", "Sass", "Emotion", "Styled Components", "Material UI", "Vuetify"],
  }

  const languages = [
    { language: t("experience.spanish"), level: t("experience.level.native"), flag: "🇪🇸" },
    { language: t("experience.english"), level: t("experience.level.fluent"), flag: "🇺🇸" },
    { language: t("experience.italian"), level: t("experience.level.intermediate"), flag: "🇮🇹" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <Link
              href={getLocalizedPath("/")}
              className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 mb-6 font-medium link-focus"
            >
              ← {t("experience.back.home")}
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative flex flex-row justify-center items-center gap-4">
            <span className="text-neutral-800">{t("experience.title")}</span>
            <Briefcase className="w-6 h-6 text-lavender-400 animate-subtle-pulse" aria-hidden="true" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-lavender-300 rounded-full opacity-60"></div>
          </h1>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("experience.description")}
          </p>
        </div>

        {/* Professional Experience */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-neutral-800 mb-8 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-rose-600" aria-hidden="true" />
            {t("experience.work")}
          </h2>
          <div className="space-y-8">
            {experiencesData.map((exp, index) => (
              <Card
                key={index}
                className={`border-2 ${exp.borderColor} shadow-soft hover:shadow-soft-lg rounded-3xl bg-white/90 backdrop-blur-sm overflow-hidden group`}
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className={`text-2xl font-bold ${exp.textColor} mb-2`}>{exp.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" aria-hidden="true" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${exp.bgColor} ${exp.textColor} border-2 ${exp.borderColor} rounded-xl px-4 py-2`}
                      >
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-neutral-700 mb-6 leading-relaxed font-medium">{exp.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-rose-600" aria-hidden="true" />
                      {exp.projects ? t("experience.achievements") : t("experience.key")}
                    </h4>

                    {exp.projects ? (
                      <div className="space-y-6">
                        {exp.projects.map((project, projectIndex) => (
                          <div key={projectIndex} className="border-l-4 border-rose-300 pl-4">
                            <h5 className="font-bold text-lg text-neutral-800 mb-1">{project.name}</h5>
                            <p className="text-neutral-600 text-sm mb-3 italic">{project.description}</p>
                            <ul className="space-y-2">
                              {project.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-neutral-700 leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {exp.achievements?.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-neutral-700 leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                      <Code className="w-4 h-4 text-sky-600" aria-hidden="true" />
                      {t("experience.tech.used")}
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <li key={techIndex}>
                          <Badge
                            variant="outline"
                            className="bg-cream-100 text-cream-700 rounded-xl px-3 py-1 border border-cream-300 code-style text-xs"
                          >
                            {tech}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-neutral-800 mb-8 flex items-center gap-3">
            <Code className="w-8 h-8 text-sky-600" aria-hidden="true" />
            {t("experience.skills")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card
                key={index}
                className="border-2 border-neutral-300 shadow-soft hover:shadow-soft-lg rounded-2xl bg-white/90 backdrop-blur-sm"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-neutral-800 capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-sky-100 text-sky-700 hover:bg-sky-200 rounded-lg px-3 py-1 text-xs code-style"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-800 mb-8 flex items-center gap-3">
            <Globe className="w-8 h-8 text-peach-600" aria-hidden="true" />
            {t("experience.language")}
          </h2>
          <div className="flex flex-wrap gap-5 justify-center items-stretch">
            {languages.map((lang, index) => (
              <Card
                key={index}
                className="border-2 border-peach-300 shadow-soft hover:shadow-soft-lg rounded-2xl bg-white/90 backdrop-blur-sm flex flex-col justify-between w-[200px] sm:w-[220px]"
              >
                <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
                  <span className="text-2xl mb-2" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-peach-800">{lang.language}</h3>
                    <p className="text-neutral-600 text-md">{lang.level}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>

        <div className="text-center">
          <Card className="border-2 border-rose-300 shadow-soft-lg rounded-3xl bg-white/90 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <p className="text-neutral-700 mb-6 leading-relaxed font-medium">
                {t("experience.information")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={getLocalizedPath("/#contact")} className="link-focus bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl shadow-soft hover:shadow-soft-lg transform hover:-translate-y-1 transition-all">
                  {t("experience.get.in.touch")}
                </Link>
                <Link href={getLocalizedPath("/book")} className="border-2 border-rose-600 text-rose-700 hover:bg-rose-50 px-8 py-3 rounded-xl shadow-soft hover:shadow-soft-lg transform hover:-translate-y-1 transition-all bg-white link-focus">
                  {t("experience.call")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section >
  )
}
