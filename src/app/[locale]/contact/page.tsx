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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${BASE_URL}/${l}/contact`])
      ),
    },
    openGraph: {
      title: `${dict.meta.contact.title} | Shady AS SRL`,
      description: dict.meta.contact.description,
      url: `${BASE_URL}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div>
      {/* Page Header */}
      <section
        className="py-20 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold md:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="mt-4 text-lg text-blue-100 md:text-xl">
            {dict.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Info - Centered Layout */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-sm">
            <h2 className="mb-8 text-center text-2xl font-bold text-[#1e3a5f]">
              {dict.contact.info.title}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-2xl">{"\u{1F4CD}"}</span>
                <div>
                  <p className="font-semibold text-[#1e3a5f]">
                    {dict.contact.info.addressLabel}
                  </p>
                  <p className="text-gray-600">{dict.contact.info.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-2xl">{"\u{1F4E7}"}</span>
                <div>
                  <p className="font-semibold text-[#1e3a5f]">
                    {dict.contact.info.emailLabel}
                  </p>
                  <a
                    href="mailto:contact@shadyas.com"
                    className="text-[#3b82f6] hover:underline"
                  >
                    {dict.contact.info.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-2xl">{"\u{1F550}"}</span>
                <div>
                  <p className="font-semibold text-[#1e3a5f]">
                    {dict.contact.info.hours}
                  </p>
                  <p className="text-gray-600">
                    {dict.contact.info.hoursValue}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Link
                href="mailto:contact@shadyas.com"
                className="inline-block bg-[#3b82f6] text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-[#2563eb] transition-colors"
              >
                {dict.contact.info.emailCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
