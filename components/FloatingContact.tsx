"use client";

import { useEffect, useId, useRef, useState } from "react";

export function FloatingContact({
  openLabel,
  closeLabel,
  groupLabel,
  booksyLabel,
  booksyHref,
  booksyDetail,
  whatsappLabel,
  smsLabel,
  whatsappHref,
  smsHref,
  whatsappNumber,
  smsNumber,
}: {
  openLabel: string;
  closeLabel: string;
  groupLabel: string;
  booksyLabel?: string;
  booksyHref?: string;
  booksyDetail?: string;
  whatsappLabel: string;
  smsLabel: string;
  whatsappHref: string;
  smsHref: string;
  whatsappNumber: string;
  smsNumber: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  return (
    <div
      className="float"
      ref={rootRef}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div id={panelId} className="float-panel" role="group" aria-label={groupLabel} hidden={!open}>
        {booksyHref ? (
          <a ref={firstLinkRef} href={booksyHref} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-calendar-check" aria-hidden="true" />
            <span>
              <strong>{booksyLabel}</strong>
              <small>{booksyDetail}</small>
            </span>
          </a>
        ) : null}
        <a
          ref={booksyHref ? undefined : firstLinkRef}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-whatsapp" aria-hidden="true" />
          <span>
            <strong>{whatsappLabel}</strong>
            <small>{whatsappNumber}</small>
          </span>
        </a>
        <a href={smsHref}>
          <i className="bi bi-chat-dots" aria-hidden="true" />
          <span>
            <strong>{smsLabel}</strong>
            <small>{smsNumber}</small>
          </span>
        </a>
      </div>
      <button
        ref={toggleRef}
        type="button"
        className="float-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <i className={`bi ${open ? "bi-x-lg" : "bi-chat-dots"}`} aria-hidden="true" />
      </button>
    </div>
  );
}
