import { Helmet } from "react-helmet-async";

type Locale = "en" | "es" | "it";

export const PostSEOHelmet =({
  baseUrl,
  siteName,
  locale,
  locales,
  post,
  isDraft = false,
}: {
  baseUrl: string;
  siteName: string;
  locale: Locale;
  locales: Locale[];
  isDraft?: boolean;
  post: {
    title: string;
    slug: string;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    dateISO?: string;
    updatedAtISO?: string;
    imageUrl?: string;
  };
}) => {
  const path = `/${locale}/blog/${post.slug}`;
  const canonical = `${baseUrl}${path}`;
  const title = post.seoTitle || `${post.title} • ${siteName}`;
  const description = post.seoDescription || `Read ${post.title} on ${siteName}.`;
  const image = post.imageUrl || `${baseUrl}/og-image.jpg`;
  const published = post.dateISO || post.updatedAtISO;
  const modified = post.updatedAtISO || post.dateISO;
  const ogLocaleMap: Record<Locale, string> = { en: "en_US", es: "es_ES", it: "it_IT" };

  const alternates = locales.map((l) => ({
    rel: "alternate",
    href: `${baseUrl}/${l}/blog/${post.slug}`,
    hreflang: l,
  }));

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    name: post.title,
    description,
    inLanguage: locale,
    mainEntityOfPage: canonical,
    datePublished: published,
    dateModified: modified,
    image,
    author: { "@type": "Person", name: siteName },
    publisher: {
      "@type": "Person",
      name: siteName,
      logo: { "@type": "ImageObject", url: `${baseUrl}/favicon-512x512.png` },
    },
    keywords: (post.keywords || []).join(", "),
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${baseUrl}/${locale}/blog` },
      { "@type": "ListItem", position: 2, name: post.title, item: canonical },
    ],
  };

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      {alternates.map((a) => (
        <link key={a.hreflang} rel="alternate" href={a.href} hrefLang={a.hreflang} />
      ))}
      <link rel="alternate" href={canonical} hrefLang="x-default" />

      {isDraft ? <meta name="robots" content="noindex, nofollow, noarchive" /> : null}

      <meta name="description" content={description} />
      {post.keywords?.length ? <meta name="keywords" content={post.keywords.join(", ")} /> : null}

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={ogLocaleMap[locale]} />
      {published ? <meta property="article:published_time" content={published} /> : null}
      {modified ? <meta property="article:modified_time" content={modified} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(jsonLdArticle)}</script>
      <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumbs)}</script>
    </Helmet>
  );
}
