import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";
import CtaSection from "@/components/CtaSection";
import PageHead from "@/components/PageHead";

const BASE_URL = "https://www.shadyas.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${BASE_URL}/${l}/about`])
      ),
    },
    openGraph: {
      title: `${dict.meta.about.title} | Shady AS SRL`,
      description: dict.meta.about.description,
      url: `${BASE_URL}/${locale}/about`,
    },
  };
}

const valueKeys = [
  "innovation",
  "integrity",
  "excellence",
  "partnership",
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHead
        eyebrow={`Shady AS / ${dict.nav.about}`}
        title={dict.about.title}
        subtitle={dict.about.subtitle}
      />

      {/* Story Section */}
      <section className="section grid-12 split">
        <h2 className="split-title">{dict.about.story.title}</h2>
        <div className="split-body lead-prose">
          <p>{dict.about.story.p1}</p>
          <p>{dict.about.story.p2}</p>
          <p>{dict.about.story.p3}</p>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">{dict.about.values.title}</h2>
        </div>
        <div className="cards cards-4">
          {valueKeys.map((key, index) => {
            const value = dict.about.values[key];
            return (
              <div key={key} className="card">
                <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="card-title">{value.title}</h3>
                <p className="card-text">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section grid-12 split">
        <h2 className="split-title">{dict.about.expertise.title}</h2>
        <div className="split-body lead-prose">
          <p>{dict.about.expertise.description}</p>
        </div>
      </section>

      {/* Brussels Section */}
      <section className="section grid-12 split">
        <h2 className="split-title">{dict.about.brussels.title}</h2>
        <div className="split-body lead-prose">
          <p>{dict.about.brussels.description}</p>
        </div>
      </section>

      <CtaSection dict={dict} locale={locale} />
    </>
  );
}
