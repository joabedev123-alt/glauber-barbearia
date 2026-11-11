import { getI18n } from "@/lib/i18n";
import { services } from "@/lib/services";
import { booksyReady, booksyUrl, business, siteUrl } from "@/lib/site";

export async function JsonLd() {
  const { t, locale } = await getI18n();
  const data = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: business.name,
    alternateName: business.alternateName,
    description: t.meta.homeDescription,
    url: siteUrl || undefined,
    telephone: "+1-774-560-8013",
    currenciesAccepted: "USD",
    areaServed: {
      "@type": "AdministrativeArea",
      name: business.region,
    },
    sameAs: [business.instagram, business.facebook],
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-774-560-8013",
        contactType: "reservations",
        name: "WhatsApp",
        availableLanguage: ["English", "Portuguese"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-508-560-7237",
        contactType: "customer service",
        name: "Text message",
        availableLanguage: ["English", "Portuguese"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.servicesPage.tableCaption,
      itemListElement: services
        .filter((service) => service.price != null)
        .map((service) => ({
          "@type": "Offer",
          name: t.services[service.id as keyof typeof t.services].name,
          price: String(service.price),
          priceCurrency: "USD",
        })),
    },
    ...(booksyReady ? { sameAs: [business.instagram, business.facebook, booksyUrl] } : {}),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
