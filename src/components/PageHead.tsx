interface PageHeadProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/** Heading block shared by the inner pages. */
export default function PageHead({ eyebrow, title, subtitle }: PageHeadProps) {
  return (
    <header className="grid-12 page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="intro">{subtitle}</p>}
    </header>
  );
}
