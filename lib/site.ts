/**
 * Dados confirmados da Glauber Barbershop.
 * booksyUrl fica vazio até o link real ser informado. Não inventar URL.
 * siteUrl fica vazio até o domínio de produção existir (canonical e sitemap absoluto).
 */

export const business = {
  name: "Glauber Barbershop",
  alternateName: "Glauber_barber",
  region: "Cape Cod, Massachusetts",
  whatsappDisplay: "+1 (774) 560-8013",
  whatsappE164: "17745608013",
  smsDisplay: "+1 (508) 560-7237",
  smsHref: "sms:+15085607237",
  instagram: "https://www.instagram.com/glauberbarberr_usa/",
  facebook: "https://www.facebook.com/share/1EmnRm4VTF/?mibextid=wwXIfr",
} as const;

/** Cole aqui a URL https do Booksy quando ela existir. */
export const booksyUrl = "";

/** Defina NEXT_PUBLIC_SITE_URL no ambiente de produção, com https e sem barra final. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

export function isValidHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.length > 0;
  } catch {
    return false;
  }
}

export const booksyReady = isValidHttpsUrl(booksyUrl);

export function whatsappHref(message: string): string {
  return `https://wa.me/${business.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function generalBookingHref(message: string): string {
  return booksyReady ? booksyUrl : whatsappHref(message);
}
