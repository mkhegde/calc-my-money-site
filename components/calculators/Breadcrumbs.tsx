"use client";
import Link from "next/link";

export default function Breadcrumbs(_props: any) {
  return (
    <nav className="text-sm text-slate-400">
      <Link href="/">Home</Link> / <span>Calculators</span> / <span>Salary Calculator</span>
    </nav>
  );
}
