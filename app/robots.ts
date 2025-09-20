import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  return isProd
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml` }
    : { rules: [{ userAgent: "*", disallow: "/" }] }; // block previews
}
