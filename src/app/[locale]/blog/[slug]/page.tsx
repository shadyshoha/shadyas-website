import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";
import { getArticleBySlug, getAllSlugs, formatDate } from "@/data/blog";
import Link from "next/link";
import { notFound } from "next/navigation";

const BASE_URL = "https://www.shadyas.com";

export async function generateStaticParams() {
  return getAllSlugs().flatMap((slug) =>
    i18n.locales.map((locale) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title[locale],
    description: article.excerpt[locale],
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${BASE_URL}/${l}/blog/${slug}`])
      ),
    },
    openGraph: {
      title: `${article.title[locale]} | Shady AS SRL`,
      description: article.excerpt[locale],
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const dict = await getDictionary(locale);
  const sections = article.content[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title[locale],
    description: article.excerpt[locale],
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Shady AS SRL",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Shady AS SRL",
    },
    mainEntityOfPage: `${BASE_URL}/${locale}/blog/${slug}`,
    inLanguage: locale,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-4 flex items-center justify-center gap-3 text-sm text-blue-100">
            <time dateTime={article.date}>
              {dict.blog.publishedOn} {formatDate(article.date, locale)}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>
              {article.readTime} {dict.blog.minRead}
            </span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
            {article.title[locale]}
          </h1>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white py-16">
        <article className="mx-auto max-w-3xl px-4">
          {sections.map((section, i) => (
            <div key={i} className={i > 0 ? "mt-10" : ""}>
              {section.heading && (
                <h2 className="mb-4 text-2xl font-bold text-primary">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((paragraph, j) => (
                <p
                  key={j}
                  className="mb-4 text-lg leading-relaxed text-gray-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {/* Back to blog */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-light hover:text-accent-hover transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              {dict.blog.backToBlog}
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
