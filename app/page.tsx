import Link from "next/link";
import { calculators } from "@/data/calculators";

export default function HomePage() {
  return (
    <main className="container space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold">CalcMyMoney — UK Calculators</h1>
        <p className="text-slate-300">Fast, SEO-first pages. React where it matters.</p>
      </header>
      <section className="card">
        <h2 className="text-xl font-medium mb-4">All Calculators</h2>
        <div className="grid">
          {calculators.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}`} className="block p-4 rounded-xl bg-[#151924] hover:bg-[#1a2030] transition">
              <div className="text-sm bg-[#1c2532] rounded-full inline-block px-2 py-0.5 text-[#b5d2ff]">{c.category}</div>
              <div className="mt-2 text-lg">{c.name}</div>
              <p className="text-sm text-slate-400 mt-1">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
