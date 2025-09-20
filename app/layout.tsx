import type { Metadata } from "next";
import "./../styles/globals.css";

export const metadata: Metadata = {
  title: "CalcMyMoney — UK Calculators",
  description: "UK salary, tax, mortgage, loan, budgeting, and investment calculators with fast SEO-first pages.",
  metadataBase: new URL("https://example.com"),
  openGraph: { title: "CalcMyMoney — UK Calculators", description: "UK salary, tax, mortgage, loan, budgeting, and investment calculators.", url: "https://example.com", siteName: "CalcMyMoney", type: "website" },
  alternates: { canonical: "https://example.com/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
