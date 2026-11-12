import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getI18n } from "@/lib/i18n";
import { booksyDisplay, booksyReady, booksyUrl, business, generalBookingHref, siteUrl, whatsappHref } from "@/lib/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#10120F",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: t.meta.homeTitle,
      template: "%s | Glauber Barbershop",
    },
    description: t.meta.homeDescription,
    applicationName: business.name,
    robots: { index: true, follow: true },
    openGraph: {
      title: t.meta.homeTitle,
      description: t.meta.homeDescription,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      type: "website",
      siteName: business.name,
      url: siteUrl || undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, t } = await getI18n();
  const bookingHref = generalBookingHref(t.generalBookingMessage);
  const year = new Date().getFullYear();

  return (
    <html lang={locale === "pt" ? "pt-BR" : "en"} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip" href="#content">
          {t.skip}
        </a>
        <Header locale={locale} t={t} bookingHref={bookingHref} booksy={booksyReady} />
        <main id="content">{children}</main>
        <Footer t={t} year={year} bookingHref={bookingHref} booksy={booksyReady} />
        <FloatingContact
          openLabel={t.float.open}
          closeLabel={t.float.close}
          groupLabel={t.float.group}
          booksyLabel="Booksy"
          booksyHref={booksyReady ? booksyUrl : undefined}
          booksyDetail={booksyReady ? booksyDisplay : undefined}
          whatsappLabel={t.whatsapp}
          smsLabel={t.sms}
          whatsappHref={whatsappHref(t.generalBookingMessage)}
          smsHref={business.smsHref}
          whatsappNumber={business.whatsappDisplay}
          smsNumber={business.smsDisplay}
        />
        <JsonLd />
      </body>
    </html>
  );
}
