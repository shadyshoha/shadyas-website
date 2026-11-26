import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Instrument_Serif,
} from "next/font/google";
import type { Metadata, Viewport } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { i18n } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const fontVariables = [plexSans, instrumentSerif, plexSerif, plexMono]
  .map((font) => font.variable)
  .join(" ");

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
};

const BASE_URL = "https://www.shadyas.com";

const ogLocaleMap: Record<string, string> = {
  en: "en_US",
  fr: "fr_BE",
  nl: "nl_BE",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: `${dict.meta.home.title} | Shady AS SRL`,
      template: "%s | Shady AS SRL",
    },
    description: dict.meta.home.description,
    keywords: [
      "IT consulting",
      "Brussels",
      "cloud solutions",
      "cybersecurity",
      "software development",
      "data analytics",
      "managed IT services",
      "Shady AS",
      "Belgium",
    ],
    authors: [{ name: "Shady AS SRL" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale] || "en_US",
      alternateLocale: i18n.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocaleMap[l] || l),
      siteName: "Shady AS SRL",
      title: `${dict.meta.home.title} | Shady AS SRL`,
      description: dict.meta.home.description,
      url: `${BASE_URL}/${locale}`,
    },
    twitter: {
      card: "summary",
      title: `${dict.meta.home.title} | Shady AS SRL`,
      description: dict.meta.home.description,
    },
  };
}

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Shady AS SRL",
    url: BASE_URL,
    email: "contact@shadyas.com",
    description:
      "IT consulting and solutions based in Brussels. Helping businesses thrive in the digital age.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Boulevard du Souverain 25",
      addressLocality: "Brussels",
      postalCode: "1170",
      addressCountry: "BE",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "Country", name: "Belgium" },
      { "@type": "Place", name: "European Union" },
    ],
    serviceType: [
      "IT Consulting",
      "Cloud Solutions",
      "Cybersecurity",
      "Software Development",
      "Data Analytics",
      "IT Support & Managed Services",
    ],
    knowsLanguage: ["en", "fr", "nl"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <JsonLd />
        <div className="page">
          <Header dict={dict} locale={locale} />
          <main>{children}</main>
          <Footer dict={dict} locale={locale} />
        </div>
      </body>
    </html>
  );
}
