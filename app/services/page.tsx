import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { TextLink } from "@/components/Links";
import { PageHero } from "@/components/PageHero";
import { PriceTable } from "@/components/PriceTable";
import { getI18n } from "@/lib/i18n";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { booksyReady, generalBookingHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({
    title: t.meta.servicesTitle,
    description: t.meta.servicesDescription,
    path: "/services",
    locale,
  });
}

export default async function ServicesPage() {
  const { t } = await getI18n();
  const bookingHref = generalBookingHref(t.generalBookingMessage);

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { name: t.nav.services },
        ]}
        eyebrow={t.servicesPage.eyebrow}
        title={t.servicesPage.title}
        accent={t.servicesPage.accent}
        lede={t.servicesPage.lede}
      />
      <section className="section">
        <div className="shell">
          <PriceTable rows={services} t={t} caption={t.servicesPage.tableCaption} />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <h2 className="block-title">{t.servicesPage.categoriesTitle}</h2>
          <article className="category-block">
            <h3>{t.servicesPage.hairTitle}</h3>
            <p className="lede">{t.servicesPage.hairText}</p>
            <TextLink href="/services/haircuts">{t.servicesPage.linkHair}</TextLink>
          </article>
          <article className="category-block">
            <h3>{t.servicesPage.beardTitle}</h3>
            <p className="lede">{t.servicesPage.beardText}</p>
            <TextLink href="/services/beard-care">{t.servicesPage.linkBeard}</TextLink>
          </article>
          <article className="category-block">
            <h3>{t.servicesPage.kidsTitle}</h3>
            <p className="lede">{t.servicesPage.kidsText}</p>
            <TextLink href="/services/kids-and-freestyle">{t.servicesPage.linkKids}</TextLink>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <h2 className="block-title">{t.faqTitle}</h2>
          <FaqList items={t.servicesPage.faq} />
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
