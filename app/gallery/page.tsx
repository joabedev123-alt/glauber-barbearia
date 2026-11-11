import type { Metadata } from "next";
import { GalleryView } from "@/components/GalleryView";
import { PageHero } from "@/components/PageHero";
import { TextLink } from "@/components/Links";
import { getI18n } from "@/lib/i18n";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";
import { business, whatsappHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({
    title: t.meta.galleryTitle,
    description: t.meta.galleryDescription,
    path: "/gallery",
    locale,
  });
}

export default async function GalleryPage() {
  const { locale, t } = await getI18n();
  const items = media.gallery.map((item) => ({
    src: item.src,
    width: item.width,
    height: item.height,
    alt: item.alt[locale],
    category: item.category,
  }));
  const categories = new Set(items.map((item) => item.category).filter(Boolean));
  const showFilters = items.length >= 4 && categories.size >= 2;

  return (
    <>
      <PageHero
        crumbLabel={t.crumbs.label}
        crumbs={[
          { href: "/", name: t.nav.home },
          { name: t.nav.work },
        ]}
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        accent={t.gallery.accent}
        lede={t.gallery.lede}
      />
      <section className="section">
        <div className="shell">
          {items.length > 0 ? (
            <GalleryView
              items={items}
              showFilters={showFilters}
              labels={{
                filterAll: t.gallery.filterAll,
                filters: t.gallery.filters,
                view: t.gallery.view,
                close: t.gallery.close,
                previous: t.gallery.previous,
                next: t.gallery.next,
                dialog: t.gallery.dialog,
              }}
            />
          ) : (
            <p className="lede">{t.gallery.empty}</p>
          )}
          <div className="related">
            <TextLink href={whatsappHref(t.similarStyleMessage)}>{t.gallery.request}</TextLink>
            <TextLink href={business.instagram}>{t.instagram}</TextLink>
          </div>
          <p className="quiet">{t.gallery.requestNote}</p>
          <p className="quiet">{t.gallery.instagramNote}</p>
        </div>
      </section>
      {media.videos.length > 0 ? (
        <section className="section">
          <div className="shell">
            <h2 className="block-title">{t.gallery.videosTitle}</h2>
            <div className="video-list">
              {media.videos.map((video) => (
                <video
                  key={video.src}
                  controls
                  preload="metadata"
                  playsInline
                  poster={video.poster}
                  width={video.width}
                  height={video.height}
                  aria-label={video.alt[locale]}
                >
                  <source src={video.src} type={video.type ?? "video/mp4"} />
                </video>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
