import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { PhotoStrip } from "@/components/PhotoStrip";
import { TextLink } from "@/components/Links";
import { getI18n } from "@/lib/i18n";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";
import { booksyReady, business, generalBookingHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    path: "/about",
    locale,
  });
}

export default async function AboutPage() {
  const { locale, t } = await getI18n();
  const bookingHref = generalBookingHref(t.generalBookingMessage);
  const photos = media.about ? [media.about] : media.gallery.slice(0, 3);

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { name: t.nav.about },
        ]}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        accent={t.about.accent}
        lede={t.about.lede}
      />
      {t.about.sections.map((section) => (
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
          <h2 className="block-title">{t.about.workTitle}</h2>
          {photos.length > 0 ? <PhotoStrip images={photos} locale={locale} /> : <p className="lede">{t.about.workEmpty}</p>}
          <div className="related">
            <TextLink href="/gallery">{t.nav.work}</TextLink>
            <TextLink href={business.instagram}>{t.instagram}</TextLink>
            <TextLink href="/services">{t.exploreServices}</TextLink>
          </div>
        </div>
      </section>
      <CtaBand
        eyebrow={t.finalCta.eyebrow}
        title={t.finalCta.title}
        accent={t.finalCta.accent}
        body={t.finalCta.body}
        href={bookingHref}
        label={booksyReady ? t.bookOnBooksy : t.bookAppointment}
        hint={booksyReady ? t.opensBooksy : t.opensWhatsapp}
      />
    </>
  );
}
