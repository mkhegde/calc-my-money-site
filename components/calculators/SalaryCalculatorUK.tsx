// @ts-nocheck
"use client";

import NextLink from "next/link";

// Wrapper so existing <Link to="..."> usage still works
const Link = ({ to, href, ...props }: any) => <NextLink href={href ?? to ?? "#"} {...props} />;

export default function SalaryCalculatorUK() {
  return (
    <div style={{ padding: 12, borderRadius: 12, background: "white", color: "#111" }}>
      ✅ Temporary stub — build check
      <div style={{ marginTop: 8 }}>
        <Link to="/calculators/salary-calculator">Example internal link</Link>
      </div>
    </div>
  );
}
