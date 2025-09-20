"use client";
import Link from "next/link";

export default function RelatedCalculators() {
  // Minimal placeholder – replace with real related links later
  const items = [
    { href: "/calculators/pension-calculator", label: "Pension Calculator" },
    { href: "/calculators/mortgage-affordability-calculator", label: "Mortgage Affordability" },
    { href: "/calculators/savings-goal-calculator", label: "Savings Goal Calculator" },
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/10"
        >
          {it.label}
        </Link>
      ))}
    </div>
  );
}
