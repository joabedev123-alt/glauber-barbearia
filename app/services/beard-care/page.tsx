import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
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
    title: t.meta.beardTitle,
    description: t.meta.beardDescription,
    path: "/services/beard-care",
    locale,
  });
}

export default async function BeardPage() {
  const { locale, t } = await getI18n();
  const photos = media.gallery.filter((item) => item.category === "beard");

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { href: "/services", name: t.nav.services },
          { name: t.servicesMenu.beard },
        ]}
        eyebrow={t.beard.eyebrow}
        title={t.beard.title}
        accent={t.beard.accent}
        lede={t.beard.lede}
      />
      {t.beard.sections.map((section) => (
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
          <h2 className="block-title">{t.beard.pricesTitle}</h2>
          <p className="note">{t.beard.ask}</p>
          <PriceTable
            rows={serviceRows(["beard-trim", "beard-hairline", "beard-therapy", "haircut-beard", "haircut-beard-therapy"])}
            t={t}
            caption={t.beard.pricesTitle}
          />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <h2 className="block-title">{t.faqTitle}</h2>
          <FaqList items={t.beard.faq} />
        </div>
      </section>
      {photos.length > 0 ? (
        <section className="section">
          <div className="shell">
            <h2 className="block-title">{t.beard.photosTitle}</h2>
            <PhotoStrip images={photos} locale={locale} />
          </div>
        </section>
      ) : null}
      <section className="section">
        <div className="shell">
          <div className="related" aria-label={t.relatedTitle}>
            <TextLink href="/services/haircuts">{t.servicesMenu.haircuts}</TextLink>
            <TextLink href="/gallery">{t.nav.work}</TextLink>
            <TextLink href={business.instagram}>{t.instagram}</TextLink>
          </div>
        </div>
      </section>
      <CtaBand
        eyebrow={t.finalCta.eyebrow}
        title={t.finalCta.title}
        accent={t.finalCta.accent}
        body={t.beard.ask}
        href={generalBookingHref(t.services["beard-therapy"].book)}
        label={booksyReady ? t.bookOnBooksy : t.bookThisService}
        hint={booksyReady ? t.opensBooksy : t.opensWhatsapp}
      />
    </>
  );
}
