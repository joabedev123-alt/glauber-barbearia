import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { GoldLink, TextLink } from "@/components/Links";
import { PhotoStrip } from "@/components/PhotoStrip";
import { getI18n } from "@/lib/i18n";
import { media } from "@/lib/media";
import { featuredServices, formatPrice } from "@/lib/services";
import { booksyDisplay, booksyReady, booksyUrl, business, generalBookingHref, whatsappHref } from "@/lib/site";

export default async function HomePage() {
  const { locale, t } = await getI18n();
  const bookingHref = generalBookingHref(t.generalBookingMessage);
  const hint = booksyReady ? t.opensBooksy : t.opensWhatsapp;
  const bookingLabel = booksyReady ? t.bookOnBooksy : t.bookAppointment;
  const photos = media.gallery;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>
            <span className="line">{t.hero.line1}</span>
            <span className="line">{t.hero.line2}</span>
            <em>{t.hero.line3}</em>
          </h1>
          <p className="lede">{t.hero.description}</p>
          <div className="hero-actions">
            <GoldLink href={bookingHref} hint={hint}>
              {bookingLabel}
            </GoldLink>
            <TextLink href="/services">{t.exploreServices}</TextLink>
          </div>
          {booksyReady ? (
            <a className="booking-url" href={booksyUrl} target="_blank" rel="noopener noreferrer">
              {booksyDisplay}
            </a>
          ) : null}
        </div>
        <div className={`hero-media${media.hero ? " has-photo" : ""}`}>
          {media.hero ? (
            <figure className="hero-photo">
              <img
                src={media.hero.src}
                width={media.hero.width}
                height={media.hero.height}
                alt={media.hero.alt[locale]}
                fetchPriority="high"
                decoding="async"
                style={{ objectFit: media.hero.fit ?? "cover", objectPosition: media.hero.position ?? "center center" }}
              />
            </figure>
          ) : (
            <div className="hero-fallback" aria-hidden="true">
              <p>Cape Cod</p>
              <span>Massachusetts</span>
            </div>
          )}
        </div>
      </section>

      <div className="steps-band">
        <div className="shell steps">
          {t.steps.map((step, index) => (
            <article className="step" key={step.title}>
              <p className="step-index">0{index + 1}</p>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="shell split">
          <div>
            <div className="section-heading">
              <p className="eyebrow">{t.approach.eyebrow}</p>
              <h2>
                {t.approach.title} <em>{t.approach.accent}</em>
              </h2>
            </div>
            <div className="stack">
              {t.approach.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="block-title">{t.offerings.title}</h3>
            <ul className="offering-list">
              {t.offerings.items.map((item) => (
                <li key={item}>
                  <i className="bi bi-check2" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">{t.featured.eyebrow}</p>
            <h2>
              {t.featured.title} <em>{t.featured.accent}</em>
            </h2>
            <p className="lede">{t.featured.lede}</p>
          </div>
          <div className="service-list">
            {featuredServices.map((service) => {
              const copy = t.services[service.id as keyof typeof t.services];
              return (
                <article className="service-row" key={service.id}>
                  <h3>
                    <Link href={service.href}>{copy.name}</Link>
                  </h3>
                  <p>{copy.summary}</p>
                  <p className="price">{formatPrice(service.price, t.contactForPricing)}</p>
                  <TextLink href={service.href}>{t.details}</TextLink>
                </article>
              );
            })}
          </div>
          <p className="section-link">
            <TextLink href="/services">{t.seeAllServices}</TextLink>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell about-grid">
          <div>
            <div className="section-heading">
              <p className="eyebrow">{t.aboutTeaser.eyebrow}</p>
              <h2>
                {t.aboutTeaser.title} <em>{t.aboutTeaser.accent}</em>
              </h2>
            </div>
            <p className="lede">{t.aboutTeaser.body}</p>
            <p className="section-link">
              <TextLink href="/about">{t.aboutTeaser.link}</TextLink>
            </p>
          </div>
          {media.about ? (
            <figure className="gallery" style={{ columns: 1 }}>
              <img
                src={media.about.src}
                width={media.about.width}
                height={media.about.height}
                alt={media.about.alt[locale]}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ) : null}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">{t.workTeaser.eyebrow}</p>
            <h2>
              {t.workTeaser.title} <em>{t.workTeaser.accent}</em>
            </h2>
            <p className="lede">{photos.length > 0 ? t.workTeaser.lede : t.workTeaser.empty}</p>
          </div>
          <PhotoStrip images={photos} locale={locale} />
          <div className="related">
            <TextLink href="/gallery">{t.workTeaser.page}</TextLink>
            <TextLink href={business.instagram}>{t.instagram}</TextLink>
            <TextLink href={whatsappHref(t.similarStyleMessage)}>{t.workTeaser.request}</TextLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell area-home">
          <div>
            <div className="section-heading">
              <p className="eyebrow">{t.areaTeaser.eyebrow}</p>
              <h2>
                {t.areaTeaser.title} <em>{t.areaTeaser.accent}</em>
              </h2>
            </div>
            <p className="lede">{t.areaTeaser.body}</p>
            <p className="section-link">
              <TextLink href="/service-area">{t.areaTeaser.link}</TextLink>
            </p>
          </div>
          <p className="note">
            <i className="bi bi-geo-alt" aria-hidden="true" /> {business.region}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <h2>{t.faqTitle}</h2>
          </div>
          <FaqList items={t.homeFaq} />
        </div>
      </section>

      <CtaBand
        eyebrow={t.finalCta.eyebrow}
        title={t.finalCta.title}
        accent={t.finalCta.accent}
        body={t.finalCta.body}
        href={bookingHref}
        label={bookingLabel}
        hint={hint}
      />
    </>
  );
}
