"use client";

import { useEffect, useRef, useState } from "react";

export type GalleryCard = {
  src: string;
  width: number;
  height: number;
  alt: string;
  category?: string;
};

export function GalleryView({
  items,
  showFilters,
  labels,
}: {
  items: GalleryCard[];
  showFilters: boolean;
  labels: {
    filterAll: string;
    filters: { haircut: string; fade: string; beard: string; freestyle: string; kids: string };
    view: string;
    close: string;
    previous: string;
    next: string;
    dialog: string;
  };
}) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = filter === "all" ? items : items.filter((item) => item.category === filter);
  const categories = [...new Set(items.map((item) => item.category).filter((category): category is string => Boolean(category)))];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active != null && !dialog.open) dialog.showModal();
    if (active == null && dialog.open) dialog.close();
  }, [active]);

  useEffect(() => {
    if (active == null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive((index) => (index == null ? index : (index + 1) % visible.length));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((index) => (index == null ? index : (index - 1 + visible.length) % visible.length));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, visible.length]);

  const current = active != null ? visible[active] : null;

  return (
    <>
      {showFilters ? (
        <div className="filters" role="group" aria-label={labels.filterAll}>
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            {labels.filterAll}
          </button>
          {categories.map((category) => (
            <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>
              {labels.filters[category as keyof typeof labels.filters] ?? category}
            </button>
          ))}
        </div>
      ) : null}
      <div className="gallery">
        {visible.map((item, index) => (
          <button key={item.src} type="button" className="shot" onClick={() => setActive(index)} aria-label={`${labels.view}. ${item.alt}`}>
            <img src={item.src} width={item.width} height={item.height} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={labels.dialog}
        onClose={() => setActive(null)}
      >
        <div className="dialog-bar">
          <button type="button" className="icon-button" aria-label={labels.close} onClick={() => setActive(null)}>
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
          {visible.length > 1 ? (
            <div>
              <button
                type="button"
                className="icon-button"
                aria-label={labels.previous}
                onClick={() => setActive((index) => (index == null ? index : (index - 1 + visible.length) % visible.length))}
              >
                <i className="bi bi-arrow-right" aria-hidden="true" style={{ transform: "rotate(180deg)" }} />
              </button>
              <button
                type="button"
                className="icon-button"
                aria-label={labels.next}
                onClick={() => setActive((index) => (index == null ? index : (index + 1) % visible.length))}
              >
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
        {current ? (
          <img src={current.src} width={current.width} height={current.height} alt={current.alt} />
        ) : null}
      </dialog>
    </>
  );
}
