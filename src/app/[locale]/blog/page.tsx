import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";
import { blogArticles, formatDate } from "@/data/blog";
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

const sortedArticles = [...blogArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div>
      {/* Page Header */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold md:text-5xl">{dict.blog.title}</h1>
          <p className="mt-4 text-lg text-blue-100 md:text-xl">
            {dict.blog.subtitle}
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="section-with-noise bg-section-bg py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-8">
            {sortedArticles.map((article) => (
              <article
                key={article.slug}
                className="border border-gray-200 bg-white p-8 hover:border-gray-300 transition-colors"
              >
                <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
                  <time dateTime={article.date}>
                    {formatDate(article.date, locale)}
                  </time>
                  <span aria-hidden="true">&middot;</span>
                  <span>
                    {article.readTime} {dict.blog.minRead}
                  </span>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-primary">
                  <Link
                    href={`/${locale}/blog/${article.slug}`}
                    className="hover:text-accent-light transition-colors"
                  >
                    {article.title[locale]}
                  </Link>
                </h2>
                <p className="mb-4 leading-relaxed text-gray-600">
                  {article.excerpt[locale]}
                </p>
                <Link
                  href={`/${locale}/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  {dict.blog.readMore}
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
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
