import type { Metadata } from "next";
import "../styles/globals.css";

function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  return explicit || vercel || "http://localhost:3000";
}

export async function generateMetadata(): Promise<Metadata> {
  const base = getBaseUrl();
  return {
    title: "CalcMyMoney — UK Calculators",
    description: "UK salary, tax, mortgage, loan, budgeting, and investment calculators.",
    metadataBase: new URL(base),
    alternates: { canonical: `${base}/` },
    openGraph: {
      title: "CalcMyMoney — UK Calculators",
      description: "UK salary, tax, mortgage, loan, budgeting, and investment calculators.",
      url: base,
      siteName: "CalcMyMoney",
      type: "website"
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
