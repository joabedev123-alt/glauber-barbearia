import Link from "next/link";
import type { ReactNode } from "react";

function leavesSite(href: string) {
  return href.startsWith("http") || href.startsWith("sms:");
}

export function GoldLink({
  href,
  children,
  hint,
  className = "",
}: {
  href: string;
  children: ReactNode;
  hint?: string;
  className?: string;
}) {
  const classNames = `btn ${className}`.trim();
  const content = (
    <>
      {children}
      {hint ? <span className="sr-only"> ({hint})</span> : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link className={classNames} href={href}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      className={classNames}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = leavesSite(href);
  const icon = external ? "bi-arrow-up-right" : "bi-arrow-right";
  const content = (
    <>
      {children}
      <i className={`bi ${icon}`} aria-hidden="true" />
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link className="text-link" href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className="text-link"
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
