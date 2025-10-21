import { useI18n } from "@/lib/I18nProvider";
import { getTranslation, type TranslationKey } from "@/lib/translations";
import { Sparkles } from "lucide-react";

const Stats = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const stats = [
    { value: "1.3B", label: `${t('stats.disabilities')}`, color: "lavender" },
    { value: "285M", label: `${t('stats.visual')}`, color: "mint" },
    { value: "20%", label: `${t('stats.keyboard')}`, color: "peach" },
    { value: "466M", label: `${t('stats.hearing')}`, color: "sky" },
  ];

  return (
    <article className="mb-12 bg-muted py-8 px-3 container mx-auto max-w-6xl" aria-labelledby="stats-title">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center" id="stats-title">
        {t('stats.title')}
      </h2>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        {t('stats.description')}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-stretch mb-16">
        {stats.map((stat, index) => (
          <li key={index} className="text-center">
            <article key={stat.value} className="rounded-lg bg-card text-card-foreground shadow-sm border-2 text-center h-full py-8 px-3">
              <p className="sr-only">{stat.value} {stat.label}</p>
              <div
                className="text-5xl font-bold mb-3"
                style={{ color: `hsl(var(--${stat.color}))` }}
                aria-hidden="true"
              >
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground text-center pt-0" aria-hidden="true">{stat.label}</p>
            </article>
          </li>
        ))}
      </ul>

      <p className="text-center text-xl font-semibold">
        {t('stats.message')}
        <Sparkles className="w-6 h-6 inline-block ml-2 text-yellow-500" aria-hidden="true" />
      </p>
    </article>
  );
};

export default Stats;
