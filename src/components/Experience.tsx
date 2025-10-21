import { Briefcase, Calendar, Code, Download, Users } from "lucide-react";
import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { getExperienceData } from "@/lib/experiencedata";
import { Badge } from "./ui/Badge";
import { useI18n } from "@/lib/I18nProvider";

const Experience = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const experiences = getExperienceData(locale)

  const skills = {
    hard: [
      "React", "Next.js", "Vue.js", "GraphQL",
      "TypeScript", "JavaScript",
      "HTML5", "CSS3",
      "React Testing Library", "Jest", "Cypress", "Enzyme", "Axe", "Lighthouse",
      "WCAG 2.1 AA", "WCAG 2.2 AA", "ARIA", "Screen Readers", "Keyboard Navigation",
      "Git", "GitLab", "Bitbucket", "Contentful", "WordPress", "Drupal", "Mixpanel", "Optimizely",
      "Tailwind CSS", "Sass", "Emotion", "Styled Components", "Material UI", "Vuetify"
    ],
    soft: [
      "Team Leadership",
      "Client Communication",
      "Technical Writing",
      "Public Speaking",
      "Mentoring & Training",
      "Cross-functional Collaboration",
      "Problem Solving",
      "Empathy & User Advocacy",
      "Project Management",
      "Continuous Learning",
    ],
  };

  const languages = [
    { language: t("experience.spanish"), level: t("experience.level.native"), flag: "🇪🇸" },
    { language: t("experience.english"), level: t("experience.level.fluent"), flag: "🇺🇸" },
    { language: t("experience.italian"), level: t("experience.level.intermediate"), flag: "🇮🇹" },
  ]

  return (
    <article className="min-h-screen pt-12 sm:pt-16 pb-12 sm:pb-16 container mx-auto max-w-4xl" aria-labelledby="experience-header-title">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-4">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" id="experience-header-title">
            {t('experience.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
            {t('experience.description')}
          </p>
        </div>
        <a
          href="/micaela-avigliano-frontend-cv.pdf"
          download
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-300 text-accent-foreground rounded-md transition-colors font-medium whitespace-nowrap self-start sm:self-auto underline decoration-transparent hover:decoration-accent-foreground decoration-2 underline-offset-4"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          {t('experience.download.cv')}
        </a>
      </div>
      <ul className="pb-12 sm:pb-20 container mx-auto max-w-4xl space-y-6 sm:space-y-8 px-4">
        {experiences.map((exp, index) => (
          <li key={index} className="border-2 transition-shadow rounded-lg bg-card text-card-foreground shadow-sm">
            <article aria-labelledby={`experience-job-title-${index}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 pb-4 space-y-1.5 p-6">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2" id={`experience-job-title-${index}`}>{exp.title}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Briefcase className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm sm:text-base">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm sm:text-base">
                      {exp.period} <span aria-hidden="true">•</span> {exp.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6 pt-0">
                <p className="text-muted-foreground text-sm sm:text-base">
                  {exp.description}
                </p>

                <h3 className="font-semibold mb-2 text-sm sm:text-base" id="experience-key-achievements experience-projects">
                  {t('experience.key')}:
                </h3>
                {exp.projects ? (
                  <ul className="space-y-6" id="experience-projects">
                    {exp.projects.map((project, projectIndex) => (
                      <li key={projectIndex}>
                        <div key={projectIndex} className="border-l-4 border-rose-300 pl-4">
                          <h3 className="font-bold text-lg text-neutral-800 mb-1">{project.name}</h3>
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
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2" id="experience-achievements">
                    {exp.achievements?.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-700 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <h3 className="font-semibold mb-2 text-sm sm:text-base" id="experience-tech-used">
                  {t('experience.tech.used')}:
                </h3>
                <ul className="flex flex-wrap gap-2" aria-labelledby="experience-tech-used">
                  {exp.technologies.map((tech, i) => (
                    <li key={i}>
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-2 text-xs sm:text-sm"
                      >
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6 bg-muted mx-auto pt-12 sm:pt-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">{t('experience.skills')}</h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <article className="border-2 rounded-lg bg-card text-card-foreground shadow-sm" aria-labelledby="hard-skills-title">
            <div className="flex items-center gap-3 mb-2 flex-col space-y-1.5 p-6">
              <div className="w-12 h-12 rounded-full bg-violet-200 flex items-center justify-center">
                <Code className="w-6 h-6 text-accent-foreground" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold" id="hard-skills-title">{t('experience.skills.hard')}</h3>
            </div>
            <ul className="flex flex-wrap gap-2 p-6 pt-0">
              {skills.hard.map((skill, index) => (
                <li key={index}>
                  <Badge
                    variant="outline"
                    className="border-2 text-sm"
                  >
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </article>

          {/* Soft Skills */}
          <article className="border-2 rounded-lg bg-card text-card-foreground shadow-sm" aria-labelledby="soft-skills-title">
            <div className="flex items-center gap-3 mb-2 flex-col space-y-1.5 p-6">
              <div className="w-12 h-12 rounded-full bg-violet-200 flex items-center justify-center">
                <Users className="w-6 h-6 text-violet-500" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold" id="soft-skills-title">{t('experience.skills.soft')}</h3>
            </div>
            <ul className="flex flex-wrap gap-2 p-6 pt-0">
              {skills.soft.map((skill, index) => (
                <li key={index}>
                  <Badge
                    key={skill}
                    variant="outline"
                    className="border-2 text-sm"
                  >
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6 bg-muted mx-auto pt-12 sm:pt-16" aria-labelledby="languages-title">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12" id="languages-title">{t('experience.language')}</h2>
        <ul className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {languages.map((lang, index) => (
            <li key={index} className="border-2 text-center rounded-lg bg-card text-card-foreground shadow-sm p-6">
              <article aria-labelledby={`language-${index}`}>
                <span className="text-2xl mb-2" aria-hidden="true">
                  {lang.flag}
                </span>
                <h3 className="font-bold text-lg mb-1" id={`language-${index}`}>{lang.language}</h3>
                <p className="sr-only">{t('experience.level')}</p>
                <p className="text-violet-700 font-semibold mb-1">{lang.level}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Experience;