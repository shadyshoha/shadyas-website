"use client";

import { usePathname } from "next/navigation";
import { i18n } from "@/i18n/config";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    // Remove current locale prefix and prepend new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/");
  }

  return (
    <div className="flex items-center gap-1">
      {i18n.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            locale === loc
              ? "bg-navy text-white"
              : "text-navy hover:bg-gray-100"
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
