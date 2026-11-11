export type ServiceCategory = "hair" | "beard" | "combo" | "kids" | "freestyle";

export type ServiceDef = {
  id: string;
  price: number | null;
  category: ServiceCategory;
  href: string;
  featured?: boolean;
};

/** Ordem da tabela pública. Preços em dólares, sem centavos. */
export const services: ServiceDef[] = [
  { id: "haircut-beard", price: 50, category: "combo", href: "/services/haircuts", featured: true },
  { id: "mens-haircut", price: 40, category: "hair", href: "/services/haircuts", featured: true },
  { id: "beard-trim", price: 25, category: "beard", href: "/services/beard-care" },
  { id: "beard-hairline", price: 30, category: "beard", href: "/services/beard-care" },
  { id: "fade", price: 45, category: "hair", href: "/services/haircuts", featured: true },
  { id: "beard-therapy", price: 50, category: "beard", href: "/services/beard-care", featured: true },
  { id: "haircut-beard-therapy", price: 80, category: "combo", href: "/services/beard-care" },
  { id: "kids", price: null, category: "kids", href: "/services/kids-and-freestyle" },
  { id: "freestyle", price: null, category: "freestyle", href: "/services/kids-and-freestyle" },
];

export const featuredServices = ["mens-haircut", "fade", "haircut-beard", "beard-therapy"]
  .map((id) => services.find((service) => service.id === id))
  .filter((service): service is ServiceDef => Boolean(service));

export const hairServices = services.filter((service) =>
  ["mens-haircut", "fade", "haircut-beard"].includes(service.id),
);

export const beardServices = services.filter((service) =>
  ["beard-trim", "beard-hairline", "beard-therapy", "haircut-beard", "haircut-beard-therapy"].includes(service.id),
);

export function formatPrice(price: number | null, contactLabel: string): string {
  return price == null ? contactLabel : `$${price}`;
}
