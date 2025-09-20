import type { MetadataRoute } from "next";
import { calculators } from "@/data/calculators";

function getBase() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  if (!allowIndexing) return []; // hide sitemap when indexing is disabled

  const base = getBase();
  return [
    { url: base, priority: 1 },
    ...calculators.map((c) => ({
      url: `${base}/calculators/${c.slug}`,
      priority: 0.8,
    })),
  ];
}
