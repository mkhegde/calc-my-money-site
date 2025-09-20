import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to CalcMyMoney — plan smarter, stress less",
  description:
    "Why we built this, what’s coming next, and how to get the most out of the calculators.",
  alternates: { canonical: "/blog/welcome" },
  openGraph: {
    title: "Welcome to CalcMyMoney",
    type: "article",
    url: "/blog/welcome",
  },
};

export default function Page() {
  return (
    <main className="container space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Welcome to CalcMyMoney 👋
        </h1>
        <p className="text-slate-300">
          Money decisions feel heavy. Our goal is to make them <strong>clear, quick, and calm</strong>.
        </p>
      </header>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">Start here</h2>
        <ul className="list-disc pl-6 text-slate-300">
          <li>
            Try the{" "}
            <a className="text-blue-400 underline" href="/calculators/salary-calculator">
              Salary Calculator
            </a>{" "}
            — see take-home pay with tax, NI, pension and student loan.
          </li>
          <li>
            Browse categories on the homepage (mortgage, investments, budgeting…) — more tools are being added weekly.
          </li>
        </ul>
      </section>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">What’s coming</h2>
        <ul className="list-disc pl-6 text-slate-300">
          <li>Interlinked FAQs on each calculator</li>
          <li>Daily (EOD) price snapshots and a simple market ticker</li>
          <li>Key UK numbers: BOE base rate, CPI, income tax changes</li>
          <li>A growing resources library (guides and checklists)</li>
        </ul>
      </section>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">Our promise</h2>
        <p className="text-slate-300">
          No jargon. No fluff. Just numbers you can trust — with context that helps you decide. If something’s missing, tell us
          what you need and we’ll build it.
        </p>
      </section>
    </main>
  );
}
