import { cookies } from "next/headers";
import { en } from "./dictionaries/en";
import { pt } from "./dictionaries/pt";

export type Dictionary = typeof en;
export type Locale = "en" | "pt";

export async function getI18n(): Promise<{ locale: Locale; t: Dictionary }> {
  const store = await cookies();
  const locale: Locale = store.get("locale")?.value === "pt" ? "pt" : "en";
  return { locale, t: locale === "pt" ? pt : en };
}
