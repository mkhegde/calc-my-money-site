import type { Metadata } from "next";
import SalaryWidget from "../../../components/calculators/SalaryWidget";

// Metadata for the page (canonical uses metadataBase from layout.tsx)
export const metadata: Metadata = {
  title: "Salary Calculator — UK",
  description:
    "Calculate your UK take-home pay with Income Tax, National Insurance and pension contributions.",
  alternates: { canonical: "/calculators/salary-calculator" },
  openGraph: {
    title: "Salary Calculator — UK",
    type: "article",
    url: "/calculators/salary-calculator",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Salary Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "/calculators/salary-calculator",
  };

  return (
    <main className="container space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Salary Calculator</h1>

      <section className="card">
        <h2 className="text-xl mb-3">Interactive Widget</h2>
        <SalaryWidget />
      </section>

      {/* JSON-LD for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
