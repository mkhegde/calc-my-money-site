import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators } from "@/data/calculators";
import JsonLd from "@/components/JsonLd";
import SalaryCalculatorUK from "../../../components/calculators/SalaryCalculatorUK";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const calc = calculators.find((c) => c.slug === params.slug);
  if (!calc) return {};
  const url = `https://example.com/calculators/${calc.slug}`;
  return {
    title: `${calc.name} — UK`,
    description: `Calculate with the ${calc.name} for the UK.`,
    alternates: { canonical: url },
    openGraph: { title: `${calc.name} — UK`, url, type: "article" }
  };
}

export default function CalculatorPage({ params }: Props) {
  const calc = calculators.find((c) => c.slug === params.slug);
  if (!calc) return notFound();

  const jsonLd = { "@context":"https://schema.org","@type":"SoftwareApplication","name":calc.name,"applicationCategory":"FinanceApplication","operatingSystem":"Web","url":`https://example.com/calculators/${calc.slug}` };

  return (
    <main className="container space-y-6">
      <nav className="text-sm text-slate-400"><a href="/">Home</a> / <span>Calculators</span> / <span>{calc.name}</span></nav>
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">{calc.name}</h1>
        <p className="text-slate-300">{calc.description}</p>
      </header>
     <section className="card">
  <h2 className="text-xl mb-3">Interactive Widget</h2>
  <SalaryCalculatorUK />
</section>
      <section className="card">
        <h3 className="text-lg mb-2">About this calculator</h3>
        <p className="text-slate-300">Add formulae, assumptions, FAQs here.</p>
      </section>
      <JsonLd data={jsonLd} />
    </main>
  );
}
