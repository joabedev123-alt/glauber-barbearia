"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { GoldLink } from "./Links";
import { Wordmark } from "./Wordmark";

export function Header({
  locale,
  t,
  bookingHref,
  booksy,
}: {
  locale: Locale;
  t: Dictionary;
  bookingHref: string;
  booksy: boolean;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const openedAt = useRef(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const firstServiceLink = useRef<HTMLAnchorElement>(null);
  const servicesMenuId = useId();
  const mobileNavId = useId();
  const mobileServicesId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setMobileServices(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", mobileOpen);
    return () => document.body.classList.remove("nav-open");
  }, [mobileOpen]);

  const serviceLinks = [
    { href: "/services", label: t.servicesMenu.all },
    { href: "/services/haircuts", label: t.servicesMenu.haircuts },
    { href: "/services/beard-care", label: t.servicesMenu.beard },
    { href: "/services/kids-and-freestyle", label: t.servicesMenu.kids },
  ];

  const inServices = pathname.startsWith("/services");

  function current(href: string) {
    return pathname === href ? "page" : undefined;
  }

  return (
    <header className="site-header">
      <div className="header-bar shell">
        <Wordmark />
        <nav className="desktop-nav" aria-label={t.nav.primary}>
          <Link href="/" aria-current={current("/")}>
            {t.nav.home}
          </Link>
          <Link href="/about" aria-current={current("/about")}>
            {t.nav.about}
          </Link>
          <div
            className="services-item"
            ref={servicesRef}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) {
                setServicesOpen(true);
                openedAt.current = Date.now();
              }
            }}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(event) => {
              if (!servicesRef.current?.contains(event.relatedTarget as Node)) {
                setServicesOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setServicesOpen(false);
                servicesButtonRef.current?.focus();
              }
            }}
          >
            <button
              ref={servicesButtonRef}
              type="button"
              className={`menu-button${inServices ? " is-active" : ""}`}
              aria-expanded={servicesOpen}
              aria-controls={servicesMenuId}
              aria-haspopup="true"
              onFocus={() => setServicesOpen(true)}
              onClick={() => {
                if (Date.now() - openedAt.current < 450) {
                  setServicesOpen(true);
                  return;
                }
                setServicesOpen((open) => !open);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setServicesOpen(true);
                  requestAnimationFrame(() => firstServiceLink.current?.focus());
                }
              }}
            >
              {t.nav.services}
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>
            <div id={servicesMenuId} className="submenu" role="group" aria-label={t.servicesMenu.label} hidden={!servicesOpen}>
              {serviceLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={index === 0 ? firstServiceLink : undefined}
                  aria-current={current(item.href)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/gallery" aria-current={current("/gallery")}>
            {t.nav.work}
          </Link>
          <Link href="/service-area" aria-current={current("/service-area")}>
            {t.nav.capeCod}
          </Link>
          <Link href="/contact" aria-current={current("/contact")}>
            {t.nav.contact}
          </Link>
        </nav>
        <div className="header-actions">
          <LanguageSwitch locale={locale} pathname={pathname} label={t.languageLabel} className="lang-desktop" />
          <GoldLink href={bookingHref} hint={booksy ? t.opensBooksy : t.opensWhatsapp} className="header-book">
            <span className="book-full">{booksy ? t.bookOnBooksy : t.bookAppointment}</span>
            <span className="book-short">{booksy ? "Booksy" : t.bookShort}</span>
          </GoldLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={mobileOpen}
            aria-controls={mobileNavId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
            <span className="sr-only">{mobileOpen ? t.nav.closeMenu : t.nav.openMenu}</span>
          </button>
        </div>
      </div>
      <div id={mobileNavId} className="mobile-panel" hidden={!mobileOpen}>
        <div className="shell mobile-inner">
          <LanguageSwitch locale={locale} pathname={pathname} label={t.languageLabel} />
          <Link href="/" aria-current={current("/")}>
            {t.nav.home}
          </Link>
          <Link href="/about" aria-current={current("/about")}>
            {t.nav.about}
          </Link>
          <div className="mobile-sub">
            <button
              type="button"
              aria-expanded={mobileServices}
              aria-controls={mobileServicesId}
              onClick={() => setMobileServices((open) => !open)}
            >
              {t.nav.services}
              <i className="bi bi-chevron-down" aria-hidden="true" />
            </button>
            <div id={mobileServicesId} className="mobile-services" hidden={!mobileServices}>
              {serviceLinks.map((item) => (
                <Link key={item.href} href={item.href} aria-current={current(item.href)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/gallery" aria-current={current("/gallery")}>
            {t.nav.work}
          </Link>
          <Link href="/service-area" aria-current={current("/service-area")}>
            {t.nav.capeCod}
          </Link>
          <Link href="/contact" aria-current={current("/contact")}>
            {t.nav.contact}
          </Link>
          <GoldLink href={bookingHref} hint={booksy ? t.opensBooksy : t.opensWhatsapp} className="mobile-book">
            {booksy ? t.bookOnBooksy : t.bookAppointment}
          </GoldLink>
        </div>
      </div>
    </header>
  );
}

function LanguageSwitch({
  locale,
  pathname,
  label,
  className = "",
}: {
  locale: Locale;
  pathname: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`lang ${className}`.trim()} role="group" aria-label={label}>
      {locale === "en" ? (
        <span aria-current="true" aria-label="English">
          <UsFlag />
          <span className="sr-only">English</span>
        </span>
      ) : (
        <a href={`/locale?lang=en&next=${encodeURIComponent(pathname)}`} hrefLang="en" lang="en">
          <UsFlag />
          <span className="sr-only">English</span>
        </a>
      )}
      {locale === "pt" ? (
        <span aria-current="true" aria-label="Português">
          <BrFlag />
          <span className="sr-only">Português</span>
        </span>
      ) : (
        <a href={`/locale?lang=pt&next=${encodeURIComponent(pathname)}`} hrefLang="pt-BR" lang="pt-BR">
          <BrFlag />
          <span className="sr-only">Português</span>
        </a>
      )}
    </div>
  );
}

function UsFlag() {
  const stripe = 10 / 13;
  return (
    <svg className="flag" viewBox="0 0 19 10" aria-hidden="true">
      <rect width="19" height="10" fill="#B22234" />
      {Array.from({ length: 6 }, (_, index) => (
        <rect key={index} y={stripe * (index * 2 + 1)} width="19" height={stripe} fill="#fff" />
      ))}
      <rect width="7.6" height={stripe * 7} fill="#3C3B6E" />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: row % 2 === 0 ? 5 : 4 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={0.85 + col * 1.35 + (row % 2 === 0 ? 0 : 0.67)}
            cy={0.5 + row * 0.85}
            r="0.22"
            fill="#fff"
          />
        )),
      )}
    </svg>
  );
}

function BrFlag() {
  return (
    <svg className="flag" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#009B3A" />
      <polygon points="10,1.15 18.7,7 10,12.85 1.3,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="2.55" fill="#002776" />
    </svg>
  );
}
