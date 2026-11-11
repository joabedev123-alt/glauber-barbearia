import type { Metadata } from "next";
import { TextLink } from "@/components/Links";
import { getI18n } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    title: t.meta.notFoundTitle,
    description: t.notFound.body,
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const { t } = await getI18n();

  return (
    <section className="section">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1 className="block-title">{t.notFound.title}</h1>
        <p className="lede">{t.notFound.body}</p>
        <p className="section-link">
          <TextLink href="/">{t.notFound.home}</TextLink>
        </p>
      </div>
    </section>
  );
}
