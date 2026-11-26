import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";
import { formatShortDate, getNumberedArticles } from "@/data/blog";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import FaqAccordion from "@/components/FaqAccordion";

const BASE_URL = "https://www.shadyas.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
    openGraph: {
      title: `${dict.meta.home.title} | Shady AS SRL`,
      description: dict.meta.home.description,
      url: `${BASE_URL}/${locale}`,
    },
  };
}

const serviceKeys = [
  "strategy",
  "cloud",
  "security",
  "development",
  "data",
  "support",
] as const;

const statKeys = ["experience", "clients", "location"] as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const allArticles = getNumberedArticles();
  const latestArticles = allArticles.slice(0, 5);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="grid-12 hero">
        <h1 className="display">{dict.hero.title}</h1>
        <p className="intro">{dict.hero.subtitle}</p>
        <div className="aside-links">
          <Link href={`/${locale}/contact`} className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            {dict.hero.pill}
          </Link>
          <div className="mono-links">
            <Link href={`/${locale}/contact`}>
              {dict.hero.cta} <span aria-hidden="true">→</span>
            </Link>
            <Link href={`/${locale}/services`}>
              {dict.hero.learnMore} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest writing */}
      <section className="section">
        <div className="row row-head essay-row" aria-hidden="true">
          <span>{dict.home.colNo}</span>
          <span>{dict.home.writing}</span>
          <span className="col-read">{dict.home.colRead}</span>
          <span className="col-end">{dict.home.colDate}</span>
        </div>
        <ul aria-label={dict.home.writing}>
          {latestArticles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/${locale}/blog/${article.slug}`}
                className="row essay-row"
              >
                <span>{article.no}</span>
                <span className="col-title">{article.title[locale]}</span>
                <span className="col-read">{article.readTime} min</span>
                <time className="col-end" dateTime={article.date}>
                  {formatShortDate(article.date, locale)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
        <div className="table-foot mono-links">
          <Link href={`/${locale}/blog`}>
            {dict.home.allArticles} ({allArticles.length}){" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Services overview */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">{dict.services.title}</h2>
          <p className="section-sub">{dict.services.subtitle}</p>
        </div>
        <div className="cards">
          {serviceKeys.map((key, index) => (
            <div key={key} className="card">
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="card-title">{dict.services[key].title}</h3>
              <p className="card-text">{dict.services[key].short}</p>
              <p className="card-note">
                {dict.services[key].features.join(" · ")}
              </p>
            </div>
          ))}
        </div>
        <div className="table-foot mono-links">
          <Link href={`/${locale}/services`}>
            {dict.hero.learnMore} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">{dict.whyUs.title}</h2>
          <p className="section-sub">{dict.whyUs.subtitle}</p>
        </div>
        <div className="figures">
          {statKeys.map((key) => (
            <div key={key} className="figure">
              <div className="figure-value">{dict.whyUs[key].value}</div>
              <div className="eyebrow">{dict.whyUs[key].label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">{dict.faq.title}</h2>
          <p className="section-sub">{dict.faq.subtitle}</p>
        </div>
        <FaqAccordion items={dict.faq.items} />
      </section>

      <CtaSection dict={dict} locale={locale} />
    </>
  );
}
