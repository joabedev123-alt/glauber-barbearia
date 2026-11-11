import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { GalleryItem, MediaImage } from "@/lib/media";

export function PhotoStrip({
  images,
  locale,
}: {
  images: Array<GalleryItem | MediaImage>;
  locale: Locale;
}) {
  if (images.length === 0) return null;

  return (
    <div className="gallery">
      {images.map((image) => (
        <figure key={image.src}>
          <Link href="/gallery">
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt[locale]}
              loading="lazy"
              decoding="async"
            />
          </Link>
        </figure>
      ))}
    </div>
  );
}
