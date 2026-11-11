import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { TextLink } from "@/components/Links";
import { getI18n } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { booksyReady, business, generalBookingHref } from "@/lib/site";
import { GoldLink } from "@/components/Links";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({
    title: t.meta.areaTitle,
    description: t.meta.areaDescription,
    path: "/service-area",
    locale,
  });
}

export default async function ServiceAreaPage() {
  const { t } = await getI18n();
  const bookingHref = generalBookingHref(t.generalBookingMessage);

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { name: t.nav.capeCod },
        ]}
        eyebrow={t.area.eyebrow}
        title={t.area.title}
        accent={t.area.accent}
        lede={t.area.lede}
      />
      <section className="section">
        <div className="shell split">
          <div className="stack">
            {t.area.sections.map((section) => (
              <article key={section.title}>
                <h2 className="block-title">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
            <p className="note">
              <i className="bi bi-geo-alt" aria-hidden="true" /> {business.region}. {t.contactForAvailability}
            </p>
            <div className="related">
              <TextLink href="/services">{t.area.servicesLink}</TextLink>
              <TextLink href="/contact">{t.area.contactLink}</TextLink>
            </div>
            <GoldLink href={bookingHref} hint={booksyReady ? t.opensBooksy : t.opensWhatsapp}>
              {booksyReady ? t.bookOnBooksy : t.bookAppointment}
            </GoldLink>
          </div>
          <div className="hero-fallback" aria-hidden="true">
            <p>Cape Cod</p>
            <span>Massachusetts</span>
          </div>
        </div>
      </section>
    </>
  );
}
