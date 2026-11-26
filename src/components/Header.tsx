import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import LanguageSwitcher from "./LanguageSwitcher";
import LocalTime from "./LocalTime";
import LogoMark from "./LogoMark";
import NavLinks from "./NavLinks";

interface HeaderProps {
  dict: Dictionary;
  locale: string;
}

export default function Header({ dict, locale }: HeaderProps) {
  const navLinks = [
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="strip">
      <div className="strip-group">
        <Link href={`/${locale}`} className="strip-name">
          <LogoMark />
          Shady AS
        </Link>
        <span className="strip-muted strip-role">{dict.strip.role}</span>
      </div>

      <NavLinks links={navLinks} />

      <div className="strip-group">
        <span className="strip-muted strip-city">
          {dict.strip.city} <LocalTime />
        </span>
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}
