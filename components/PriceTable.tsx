import type { Dictionary } from "@/lib/i18n";
import { formatPrice, services, type ServiceDef } from "@/lib/services";
import { whatsappHref } from "@/lib/site";
import { TextLink } from "./Links";

export function PriceTable({
  rows,
  t,
  caption,
}: {
  rows: ServiceDef[];
  t: Dictionary;
  caption: string;
}) {
  return (
    <table className="prices">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">{t.servicesPage.colService}</th>
          <th scope="col">{t.servicesPage.colPrice}</th>
          <th scope="col">
            <span className="sr-only">{t.servicesPage.colBook}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((service) => {
          const copy = t.services[service.id as keyof Dictionary["services"]];
          return (
            <tr key={service.id} id={service.id}>
              <th scope="row">{copy.name}</th>
              <td className="price">{formatPrice(service.price, t.contactForPricing)}</td>
              <td>
                <TextLink href={whatsappHref(copy.book)}>{t.bookThisService}</TextLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function serviceRows(ids: string[]) {
  return ids
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is ServiceDef => Boolean(service));
}
