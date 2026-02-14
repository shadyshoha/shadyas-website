import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";
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
    title: dict.meta.services.title,
    description: dict.meta.services.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${BASE_URL}/${l}/services`])
      ),
    },
    openGraph: {
      title: `${dict.meta.services.title} | Shady AS SRL`,
      description: dict.meta.services.description,
      url: `${BASE_URL}/${locale}/services`,
    },
  };
}

const serviceKeys = [
  { key: "strategy" as const, icon: "\u{1F4A1}" },
  { key: "cloud" as const, icon: "\u2601\uFE0F" },
  { key: "security" as const, icon: "\u{1F6E1}\uFE0F" },
  { key: "development" as const, icon: "\u{1F4BB}" },
  { key: "data" as const, icon: "\u{1F4CA}" },
  { key: "support" as const, icon: "\u{1F3A7}" },
];

export default async function ServicesPage({
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
            {dict.services.title}
          </h1>
          <p className="mt-4 text-lg text-blue-100 md:text-xl">
            {dict.services.subtitle}
          </p>
        </div>
      </section>

      {/* Service Sections */}
      <section className="section-with-noise bg-section-bg py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-2">
            {serviceKeys.map(({ key, icon }) => {
              const service = dict.services[key];
              return (
                <div
                  key={key}
                  className="border border-gray-200 bg-white p-8 hover:border-gray-300 transition-colors"
                >
                  <div className="mb-4 text-4xl">{icon}</div>
                  <h2 className="mb-3 text-2xl font-bold text-primary">
                    {service.title}
                  </h2>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-light"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{dict.cta.subtitle}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-block bg-accent px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            {dict.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
