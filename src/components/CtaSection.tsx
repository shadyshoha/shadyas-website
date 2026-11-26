import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";

interface CtaSectionProps {
  dict: Dictionary;
  locale: string;
}

export default function CtaSection({ dict, locale }: CtaSectionProps) {
  return (
    <section className="section">
      <h2 className="cta-title">{dict.cta.title}</h2>
      <div className="cta-row">
        <p className="cta-text">{dict.cta.subtitle}</p>
        <Link href={`/${locale}/contact`} className="button">
          {dict.cta.button}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
