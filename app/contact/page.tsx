import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { GoldLink, TextLink } from "@/components/Links";
import { PageHero } from "@/components/PageHero";
import { getI18n } from "@/lib/i18n";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { booksyDisplay, booksyReady, booksyUrl, business, generalBookingHref, whatsappHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({
    title: t.meta.contactTitle,
    description: t.meta.contactDescription,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage() {
  const { t } = await getI18n();
  const bookingHref = generalBookingHref(t.generalBookingMessage);
  const options = services.map((service) => ({
    value: service.id,
    label: t.services[service.id as keyof typeof t.services].name,
  }));

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { name: t.nav.contact },
        ]}
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        accent={t.contact.accent}
        lede={t.contact.lede}
      />
      <section className="section">
        <div className="shell">
          <div className="contact-list">
            <article className="contact-item">
              <i className="bi bi-calendar-check" aria-hidden="true" />
              <div>
                <h2>{t.contact.bookingTitle}</h2>
                <p>{t.contact.bookingBody}</p>
                {booksyReady ? (
                  <a className="booking-url" href={booksyUrl} target="_blank" rel="noopener noreferrer">
                    {booksyDisplay}
                  </a>
                ) : (
                  <p>{t.contact.bookingPending}</p>
                )}
              </div>
              <GoldLink href={bookingHref} hint={booksyReady ? t.opensBooksy : t.opensWhatsapp}>
                {booksyReady ? t.bookOnBooksy : t.bookAppointment}
              </GoldLink>
            </article>
            <article className="contact-item">
              <i className="bi bi-whatsapp" aria-hidden="true" />
              <div>
                <h2>{t.whatsapp}</h2>
                <p className="contact-number">{business.whatsappDisplay}</p>
                <p>{t.contact.whatsappBody}</p>
              </div>
              <TextLink href={whatsappHref(t.generalBookingMessage)}>{t.whatsapp}</TextLink>
            </article>
            <article className="contact-item">
              <i className="bi bi-chat-dots" aria-hidden="true" />
              <div>
                <h2>{t.sms}</h2>
                <p className="contact-number">{business.smsDisplay}</p>
                <p>{t.contact.smsBody}</p>
              </div>
              <TextLink href={business.smsHref}>{t.sms}</TextLink>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell split">
          <div>
            <h2 className="block-title">{t.contact.includeTitle}</h2>
            <ul className="include-list">
              {t.contact.include.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2 className="block-title" style={{ marginTop: "2rem" }}>
              {t.contact.regionTitle}
            </h2>
            <p className="lede">{t.contact.regionBody}</p>
            <p className="note">{t.contactForAvailability}</p>
            <div className="social-row">
              <TextLink href={business.instagram}>{t.instagram}</TextLink>
              <TextLink href={business.facebook}>{t.facebook}</TextLink>
            </div>
          </div>
          <div>
            <h2 className="block-title">{t.contact.formTitle}</h2>
            <p className="lede">{t.contact.formLede}</p>
            <ContactForm
              greeting={t.generalBookingMessage}
              options={options}
              labels={{
                name: t.contact.name,
                service: t.contact.service,
                day: t.contact.day,
                dayHint: t.contact.dayHint,
                message: t.contact.message,
                messageHint: t.contact.messageHint,
                servicePlaceholder: t.contact.servicePlaceholder,
                submit: t.contact.submit,
                nameMissing: t.contact.nameMissing,
                serviceMissing: t.contact.serviceMissing,
                fallback: t.contact.fallback,
                opensWhatsapp: t.opensWhatsapp,
              }}
            />
            <p className="quiet">{t.contact.directNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
