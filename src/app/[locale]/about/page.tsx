import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";

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

const values = [
  { key: "innovation" as const, icon: "\u{1F680}" },
  { key: "integrity" as const, icon: "\u{1F91D}" },
  { key: "excellence" as const, icon: "\u2B50" },
  { key: "partnership" as const, icon: "\u{1F91D}" },
];

export default async function AboutPage({
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
          <h1 className="text-4xl font-bold md:text-5xl">
            {dict.about.title}
          </h1>
          <p className="mt-4 text-lg text-blue-100 md:text-xl">
            {dict.about.subtitle}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-primary">
            {dict.about.story.title}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-gray-600">
            <p>{dict.about.story.p1}</p>
            <p>{dict.about.story.p2}</p>
            <p>{dict.about.story.p3}</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-with-noise bg-section-bg py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            {dict.about.values.title}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ key, icon }) => {
              const value = dict.about.values[key];
              return (
                <div
                  key={key}
                  className="border border-gray-200 bg-white p-6 text-center hover:border-gray-300 transition-colors"
                >
                  <div className="mb-4 text-4xl">{icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-primary">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-3xl font-bold text-primary">
            {dict.about.expertise.title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            {dict.about.expertise.description}
          </p>
        </div>
      </section>

      {/* Brussels Section */}
      <section className="section-with-noise bg-section-bg py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-3xl font-bold text-primary">
            {dict.about.brussels.title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            {dict.about.brussels.description}
          </p>
        </div>
      </section>
    </div>
  );
}
