import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PhotoStrip } from "@/components/PhotoStrip";
import { TextLink } from "@/components/Links";
import { getI18n } from "@/lib/i18n";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";
import { business, generalBookingHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({
    title: t.meta.kidsTitle,
    description: t.meta.kidsDescription,
    path: "/services/kids-and-freestyle",
    locale,
  });
}

export default async function KidsPage() {
  const { locale, t } = await getI18n();
  const photos = media.gallery.filter((item) => item.category === "kids" || item.category === "freestyle");

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { href: "/services", name: t.nav.services },
          { name: t.servicesMenu.kids },
        ]}
        eyebrow={t.kids.eyebrow}
        title={t.kids.title}
        accent={t.kids.accent}
        lede={t.kids.lede}
      />
      <section className="section">
        <div className="shell">
          <h2 className="block-title">{t.kids.kidsTitle}</h2>
          <p className="price">{t.kids.priceLabel}</p>
          <div className="stack">
            {t.kids.kidsParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="section-link">
            <TextLink href={generalBookingHref(t.services.kids.book)}>{t.kids.kidsBook}</TextLink>
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <h2 className="block-title">{t.kids.freeTitle}</h2>
          <p className="price">{t.kids.priceLabel}</p>
          <div className="stack">
            {t.kids.freeParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="section-link">
            <TextLink href={generalBookingHref(t.services.freestyle.book)}>{t.kids.freeBook}</TextLink>
          </p>
        </div>
      </section>
      {photos.length > 0 ? (
        <section className="section">
          <div className="shell">
            <PhotoStrip images={photos} locale={locale} />
          </div>
        </section>
      ) : null}
      <section className="section">
        <div className="shell related" aria-label={t.relatedTitle}>
          <TextLink href="/services/haircuts">{t.servicesMenu.haircuts}</TextLink>
          <TextLink href="/services">{t.servicesMenu.all}</TextLink>
          <TextLink href={business.instagram}>{t.instagram}</TextLink>
          <TextLink href="/contact">{t.nav.contact}</TextLink>
        </div>
      </section>
    </>
  );
}
