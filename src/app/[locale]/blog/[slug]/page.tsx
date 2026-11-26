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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="grid-12 article-grid">
        {/* Article Meta */}
        <aside className="article-meta">
          <div>
            <span>{dict.blog.publishedOn}</span>
            <time dateTime={article.date}>
              {formatDate(article.date, locale)}
            </time>
          </div>
          <div>
            <span>{dict.home.colRead}</span>
            <span>
              {article.readTime} {dict.blog.minRead}
            </span>
          </div>
          <Link href={`/${locale}/blog`}>
            <span aria-hidden="true">←</span> {dict.blog.backToBlog}
          </Link>
        </aside>

        <div className="article">
          {/* Article Header */}
          <h1 className="article-title">{article.title[locale]}</h1>
          <p className="article-dek">{article.excerpt[locale]}</p>
          <hr />

          {/* Article Body */}
          <div className="prose">
            {sections.map((section, i) => (
              <section key={i}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          {/* Back to blog */}
          <div className="signoff">
            <Link href={`/${locale}/blog`}>
              <span aria-hidden="true">←</span> {dict.blog.backToBlog}
            </Link>
            <span>Shady AS SRL</span>
          </div>
        </div>
      </article>
    </>
  );
}
