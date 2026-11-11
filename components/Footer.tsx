import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { business } from "@/lib/site";
import { whatsappHref } from "@/lib/site";
import { GoldLink, TextLink } from "./Links";
import { Wordmark } from "./Wordmark";

export function Footer({
  t,
  year,
  bookingHref,
  booksy,
}: {
  t: Dictionary;
  year: number;
  bookingHref: string;
  booksy: boolean;
}) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Wordmark />
          <p className="footer-blurb">{t.footer.blurb}</p>
          <p className="quiet">{t.footer.also}</p>
        </div>
        <nav className="footer-links" aria-label={t.footer.navigate}>
          <p className="footer-label">{t.footer.navigate}</p>
          <Link href="/">{t.nav.home}</Link>
          <Link href="/about">{t.nav.about}</Link>
          <Link href="/gallery">{t.nav.work}</Link>
          <Link href="/service-area">{t.nav.capeCod}</Link>
          <Link href="/contact">{t.nav.contact}</Link>
          <Link href="/privacy">{t.footer.privacy}</Link>
        </nav>
        <nav className="footer-links" aria-label={t.footer.services}>
          <p className="footer-label">{t.footer.services}</p>
          <Link href="/services">{t.servicesMenu.all}</Link>
          <Link href="/services/haircuts">{t.servicesMenu.haircuts}</Link>
          <Link href="/services/beard-care">{t.servicesMenu.beard}</Link>
          <Link href="/services/kids-and-freestyle">{t.servicesMenu.kids}</Link>
        </nav>
        <div className="footer-contact">
          <p className="footer-label">{t.footer.contact}</p>
          <p className="quiet">
            {t.footer.regionLabel}: {business.region}
          </p>
          <a href={whatsappHref(t.generalBookingMessage)} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp" aria-hidden="true" />
            {t.whatsapp} {business.whatsappDisplay}
          </a>
          <a href={business.smsHref}>
            <i className="bi bi-chat-dots" aria-hidden="true" />
            {t.sms} {business.smsDisplay}
          </a>
          <a href={business.instagram} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram" aria-hidden="true" />
            {t.instagram}
          </a>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook" aria-hidden="true" />
            {t.facebook}
          </a>
          <GoldLink href={bookingHref} hint={booksy ? t.opensBooksy : t.opensWhatsapp}>
            {booksy ? t.bookOnBooksy : t.bookAppointment}
          </GoldLink>
        </div>
      </div>
      <div className="shell footer-base">
        <p>
          © {year} Glauber Barbershop. {t.footer.rights}
        </p>
        <TextLink href="/privacy">{t.footer.privacy}</TextLink>
      </div>
    </footer>
  );
}
