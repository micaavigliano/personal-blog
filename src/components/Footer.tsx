import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { Link } from "@tanstack/react-router";
import { Linkedin, Github } from "lucide-react";
import { useI18n } from '@/lib/I18nProvider'

const Footer = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <footer className="border-t bg-background mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Mica Avigliano</h3>
          <p className="text-sm text-muted-foreground">
            {t("footer.description")}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">{t('footer.navigation')}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/$locale" params={{ locale }} className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link to="/$locale/experience" params={{ locale }} className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.experience')}
              </Link>
            </li>
            <li>
              <Link to="/$locale/blog" params={{ locale }} className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.blog')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">{t('footer.services')}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/$locale/services" params={{ locale }} className="text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.services.audits')}
              </Link>
            </li>
            <li>
              <Link to="/$locale/book" params={{ locale }} className="text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.services.development')}
              </Link>
            </li>
            <li>
              <Link to="/$locale/book" params={{ locale }} className="text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.services.training')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">{t('contact.title')}</h4>
          <div className="space-y-2 text-sm">
            <a
              href="mailto:micaela.avigliano@gmail.com"
              className="block text-muted-foreground hover:text-foreground transition-colors"
            >
              micaela.avigliano@gmail.com
            </a>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/micaelaavigliano/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t('footer.linkedin')}
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/micaavigliano"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t('footer.github')}
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="pt-6 border-t text-center pb-6 a11y-webring-club" aria-labelledby="a11y-webring-club">
        <h2 id="a11y-webring-club">a11y-webring.club</h2>
        <p className="text-sm text-muted-foreground mb-3">
          {t('footer.member')}{" "}
          <a
            href="https://a11y-webring.club"
            target="_blank"
            rel="external"
            className="text-foreground hover:underline font-medium"
          >
            a11y-webring.club
          </a>
        </p>
        <ul className="flex justify-center gap-4 text-sm">
          <li>
            <a
              href="https://a11y-webring.club/prev"
              target="_blank"
              rel="external"
              referrerPolicy="strict-origin"
              className="text-muted-foreground hover:text-foreground transition-colors underline decoration-transparent hover:decoration-foreground decoration-1 underline-offset-2"
            >
              <span aria-hidden="true">←</span>{t('footer.previous')}
            </a>
          </li>
          <li>
            <a
              href="https://a11y-webring.club/random"
              target="_blank"
              rel="external"
              referrerPolicy="strict-origin"
              className="text-muted-foreground hover:text-foreground transition-colors underline decoration-transparent hover:decoration-foreground decoration-1 underline-offset-2"
            >
              {t('footer.random')}
            </a>
          </li>
          <li>
            <a
              href="https://a11y-webring.club/next"
              target="_blank"
              rel="external"
              referrerPolicy="strict-origin"
              className="text-muted-foreground hover:text-foreground transition-colors underline decoration-transparent hover:decoration-foreground decoration-1 underline-offset-2"
            >
              {t('footer.next')}<span aria-hidden="true">→</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="pt-6 border-t text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mica Avigliano. {t('footer.made.with')} <span aria-hidden="true">♿✨</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
