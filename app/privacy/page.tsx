import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getI18n } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({
    title: t.meta.privacyTitle,
    description: t.meta.privacyDescription,
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage() {
  const { t } = await getI18n();

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { name: t.footer.privacy },
        ]}
        eyebrow={t.privacy.eyebrow}
        title={t.privacy.title}
        accent=""
        lede={t.privacy.lede}
      />
      {t.privacy.sections.map((section) => (
        <section className="section" key={section.title}>
          <div className="shell">
            <h2 className="block-title">{section.title}</h2>
            <div className="stack">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
