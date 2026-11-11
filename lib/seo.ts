import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { siteUrl } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  locale,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const canonical = siteUrl ? `${siteUrl}${path === "/" ? "" : path}` || siteUrl : undefined;
  const branded = absoluteTitle ? title : `${title} | Glauber Barbershop`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: branded,
      description,
      url: canonical,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      type: "website",
      siteName: "Glauber Barbershop",
    },
  };
}
