import Link from "next/link";
import { media } from "@/lib/media";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label={media.logo?.alt.en ?? "Glauber Barber"}>
      {media.logo ? (
        <img
          src={media.logo.src}
          width={media.logo.width}
          height={media.logo.height}
          alt={media.logo.alt.en}
        />
      ) : (
        <>
          <span className="wordmark-name">GLAUBER</span>
          <span className="wordmark-sub">BARBER</span>
        </>
      )}
    </Link>
  );
}
