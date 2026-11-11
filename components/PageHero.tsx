import { Breadcrumbs } from "./Breadcrumbs";

export function PageHero({
  crumbLabel,
  crumbs,
  eyebrow,
  title,
  accent,
  lede,
}: {
  crumbLabel: string;
  crumbs: { href?: string; name: string }[];
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
}) {
  return (
    <header className="page-hero shell">
      <Breadcrumbs label={crumbLabel} items={crumbs} />
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title}
        {accent ? <em>{accent}</em> : null}
      </h1>
      <p className="lede">{lede}</p>
    </header>
  );
}
