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
  "strategy",
  "cloud",
  "security",
  "development",
  "data",
  "support",
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHead
        eyebrow={`Shady AS / ${dict.nav.services}`}
        title={dict.services.title}
        subtitle={dict.services.subtitle}
      />

      {/* Service Sections */}
      <section className="section">
        {serviceKeys.map((key, index) => {
          const service = dict.services[key];
          return (
            <div key={key} className="grid-12 service-row">
              <p className="mono service-no">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="service-title">{service.title}</h2>
              <div className="service-body">
                <p className="service-text">{service.description}</p>
                <ul className="mono feature-list">
                  {service.features.map((feature: string) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      <CtaSection dict={dict} locale={locale} />
    </>
  );
}
