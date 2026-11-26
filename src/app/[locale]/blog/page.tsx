import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";
import { formatShortDate, getNumberedArticles } from "@/data/blog";
import PageHead from "@/components/PageHead";
import Link from "next/link";

const BASE_URL = "https://www.shadyas.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${BASE_URL}/${l}/blog`])
      ),
    },
    openGraph: {
      title: `${dict.meta.blog.title} | Shady AS SRL`,
      description: dict.meta.blog.description,
      url: `${BASE_URL}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const articles = getNumberedArticles();

  return (
    <>
      <PageHead
        eyebrow={`Shady AS / ${dict.nav.blog}`}
        title={dict.blog.title}
        subtitle={dict.blog.subtitle}
      />

      {/* Articles List */}
      <section className="section">
        <div className="row row-head essay-row" aria-hidden="true">
          <span>{dict.home.colNo}</span>
          <span>{dict.home.writing}</span>
          <span className="col-read">{dict.home.colRead}</span>
          <span className="col-end">{dict.home.colDate}</span>
        </div>
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/${locale}/blog/${article.slug}`}
                className="row essay-row"
              >
                <span>{article.no}</span>
                <div className="essay-main">
                  <h2 className="col-title">{article.title[locale]}</h2>
                  <p className="essay-excerpt">{article.excerpt[locale]}</p>
                </div>
                <span className="col-read">{article.readTime} min</span>
                <time className="col-end" dateTime={article.date}>
                  {formatShortDate(article.date, locale)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
