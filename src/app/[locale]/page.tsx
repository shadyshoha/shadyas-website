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
  { key: "strategy" as const, icon: "\u{1F4A1}" },
  { key: "cloud" as const, icon: "\u2601\uFE0F" },
  { key: "security" as const, icon: "\u{1F6E1}\uFE0F" },
  { key: "development" as const, icon: "\u{1F4BB}" },
  { key: "data" as const, icon: "\u{1F4CA}" },
  { key: "support" as const, icon: "\u{1F3A7}" },
];

const statKeys = ["experience", "clients", "location"] as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="w-full py-24 px-6 md:py-32 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {dict.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            {dict.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-[#1e3a5f] font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {dict.hero.cta}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-block border-2 border-white text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {dict.hero.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="w-full py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.services.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.services.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceKeys.map(({ key, icon }) => (
              <div
                key={key}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {dict.services[key].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {dict.services[key].short}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/services`}
              className="inline-block bg-[#3b82f6] text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-[#2563eb] transition-colors"
            >
              {dict.hero.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {dict.whyUs.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.whyUs.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
            {statKeys.map((key) => (
              <div key={key} className="text-center p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#3b82f6] mb-2">
                  {dict.whyUs[key].value}
                </div>
                <div className="text-gray-600 font-medium">
                  {dict.whyUs[key].label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="w-full py-20 px-6 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {dict.cta.title}
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto leading-relaxed">
            {dict.cta.subtitle}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-[#1e3a5f] font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {dict.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
