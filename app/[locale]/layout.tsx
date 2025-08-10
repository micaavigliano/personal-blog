import type { Metadata } from 'next';
import { Inter, Caveat, Roboto_Mono } from 'next/font/google';
import "../globals.css"
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from "@/components/json-ld"
import { locales, isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { ClarityScript } from '@/components/clarity-script';
import { BackToTop } from '@/components/BackToTop';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ['400', '500', '600'],
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    en: 'Mica Avigliano - Frontend Developer & Accessibility Analyst',
    es: 'Mica Avigliano - Desarrollador Frontend y Analista de Accesibilidad',
    it: 'Mica Avigliano - Sviluppatore Frontend e Analista di Accessibilità',
  };

  const descriptions = {
    en: 'Expert frontend developer and accessibility analyst...',
    es: 'Desarrollador frontend experto y analista de accesibilidad...',
    it: 'Sviluppatore frontend esperto e analista di accessibilità...',
  };

  return {
    title: {
      default: titles[locale as keyof typeof titles] || titles.en,
      template: `%s | ${titles[locale as keyof typeof titles] || titles.en}`,
    },
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${caveat.variable} ${robotoMono.variable}`}
    >
      <head>
        <link rel="alternate" hrefLang="en" href="https://micaavigliano.com/en" />
        <link rel="alternate" hrefLang="es" href="https://micaavigliano.com/es" />
        <link rel="alternate" hrefLang="it" href="https://micaavigliano.com/it" />
        <link rel="alternate" hrefLang="x-default" href="https://micaavigliano.com/en" />
      </head>
      <body className={inter.className}>
        <JsonLd />
        <ClarityScript />
        <Header />
        <main className="bg-gradient-to-br from-lavender-50 via-rose-50 to-sunshine-50" id="main-content" tabIndex={-1}>
          {children}
          <BackToTop />
        </main>
        <Footer />
      </body>
    </html>
  );
}