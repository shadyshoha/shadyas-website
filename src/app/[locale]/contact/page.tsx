import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale, i18n } from "@/i18n/config";
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
  const info = dict.contact.info;

  return (
    <>
      <PageHead
        eyebrow={`Shady AS / ${dict.nav.contact}`}
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
      />

      {/* Contact Info */}
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">{info.title}</h2>
        </div>
        <dl className="details">
          <div className="grid-12 detail-row">
            <dt className="mono detail-label">{info.emailLabel}</dt>
            <dd className="detail-value">
              <a href={`mailto:${info.email}`}>{info.email}</a>
            </dd>
          </div>
          <div className="grid-12 detail-row">
            <dt className="mono detail-label">{info.addressLabel}</dt>
            <dd className="detail-value">{info.address}</dd>
          </div>
          <div className="grid-12 detail-row">
            <dt className="mono detail-label">{info.hours}</dt>
            <dd className="detail-value">{info.hoursValue}</dd>
          </div>
        </dl>
        <div className="cta-row">
          <a href={`mailto:${info.email}`} className="button">
            {info.emailCta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
