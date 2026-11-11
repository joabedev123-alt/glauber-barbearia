import Link from "next/link";

export function Breadcrumbs({
  label,
  items,
}: {
  label: string;
  items: { href?: string; name: string }[];
}) {
  return (
    <nav className="crumbs" aria-label={label}>
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`}>
              {item.href && !last ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
