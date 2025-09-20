import SalaryWidget from "../../../components/calculators/SalaryWidget";

export default function Page() {
  return (
    <main className="container space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Salary Calculator</h1>
      <section className="card">
        <h2 className="text-xl mb-3">Interactive Widget</h2>
        <SalaryWidget />
      </section>
    </main>
  );
}
