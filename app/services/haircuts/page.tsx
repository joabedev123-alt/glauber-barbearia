import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { TextLink } from "@/components/Links";
import { PageHero } from "@/components/PageHero";
import { PhotoStrip } from "@/components/PhotoStrip";
import { PriceTable, serviceRows } from "@/components/PriceTable";
import { getI18n } from "@/lib/i18n";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";
import { booksyReady, business, generalBookingHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({
    title: t.meta.hairTitle,
    description: t.meta.hairDescription,
    path: "/services/haircuts",
    locale,
  });
}

export default async function HaircutsPage() {
  const { locale, t } = await getI18n();
  const photos = media.gallery.filter((item) => item.category === "haircut" || item.category === "fade");

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { href: "/services", name: t.nav.services },
          { name: t.servicesMenu.haircuts },
        ]}
        eyebrow={t.hair.eyebrow}
        title={t.hair.title}
        accent={t.hair.accent}
        lede={t.hair.lede}
      />
      {t.hair.sections.map((section) => (
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
      <section className="section">
        <div className="shell">
          <h2 className="block-title">{t.hair.pricesTitle}</h2>
          <PriceTable rows={serviceRows(["mens-haircut", "fade", "haircut-beard"])} t={t} caption={t.hair.pricesTitle} />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <h2 className="block-title">{t.hair.photosTitle}</h2>
          {photos.length > 0 ? <PhotoStrip images={photos} locale={locale} /> : <p className="lede">{t.hair.photosEmpty}</p>}
          <div className="related" aria-label={t.relatedTitle}>
            <TextLink href="/gallery">{t.nav.work}</TextLink>
            <TextLink href={business.instagram}>{t.instagram}</TextLink>
            <TextLink href="/services/beard-care">{t.servicesMenu.beard}</TextLink>
            <TextLink href="/services/kids-and-freestyle">{t.servicesMenu.kids}</TextLink>
          </div>
        </div>
      </section>
      <CtaBand
        eyebrow={t.finalCta.eyebrow}
        title={t.finalCta.title}
        accent={t.finalCta.accent}
        body={t.finalCta.body}
        href={generalBookingHref(t.generalBookingMessage)}
        label={booksyReady ? t.bookOnBooksy : t.bookAppointment}
        hint={booksyReady ? t.opensBooksy : t.opensWhatsapp}
      />
    </>
  );
}
