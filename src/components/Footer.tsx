import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import LogoMark from "./LogoMark";

interface FooterProps {
  dict: Dictionary;
  locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
  const quickLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Company Info */}
        <div className="footer-col">
          <p className="mono footer-name">
            <LogoMark />
            Shady AS SRL
          </p>
          <p className="footer-text">{dict.footer.description}</p>
        </div>

        {/* Quick Links */}
        <nav className="footer-col" aria-label={dict.footer.quickLinks}>
          <h2 className="eyebrow">{dict.footer.quickLinks}</h2>
          <ul className="mono footer-list">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Info */}
        <div className="footer-col">
          <h2 className="eyebrow">{dict.footer.contactInfo}</h2>
          <address className="footer-text not-italic">
            {dict.contact.info.address}
            <br />
            <a href={`mailto:${dict.contact.info.email}`}>
              {dict.contact.info.email}
            </a>
          </address>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h2 className="eyebrow">{dict.footer.vatLabel}</h2>
          <p className="footer-text">{dict.footer.vat}</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mono footer-strip">
        <span>{dict.footer.copyright}</span>
        <span>{dict.footer.tagline}</span>
      </div>
    </footer>
  );
}
