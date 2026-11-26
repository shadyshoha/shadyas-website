"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, type Locale } from "@/i18n/config";

const languageNames: Record<Locale, string> = {
  nl: "Nederlands",
  fr: "Français",
  en: "English",
};

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  function localizedPath(newLocale: string) {
    // Swap the current locale prefix for the new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  }

  return (
    <div className="lang-switch">
      {i18n.locales.map((loc) => (
        <Link
          key={loc}
          href={localizedPath(loc)}
          hrefLang={loc}
          lang={loc}
          aria-label={languageNames[loc]}
          aria-current={locale === loc ? "true" : undefined}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
