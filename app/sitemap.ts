import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const paths = [
  "/",
  "/about",
  "/services",
  "/services/haircuts",
  "/services/beard-care",
  "/services/kids-and-freestyle",
  "/gallery",
  "/service-area",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}` || siteUrl,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
