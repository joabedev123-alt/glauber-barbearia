import { GoldLink } from "./Links";

export function CtaBand({
  eyebrow,
  title,
  accent,
  body,
  href,
  label,
  hint,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  href: string;
  label: string;
  hint?: string;
}) {
  return (
    <section className="cta-band">
      <div className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {title} <em>{accent}</em>
        </h2>
        <p className="lede">{body}</p>
        <GoldLink href={href} hint={hint}>
          {label}
        </GoldLink>
      </div>
    </section>
  );
}
