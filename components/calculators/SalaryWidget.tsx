"use client";
import NextLink from "next/link";
const Link = ({ to, href, ...props }: any) => <NextLink href={href ?? to ?? "#"} {...props} />;

export default function SalaryWidget() {
  return (
    <div style={{ padding: 12, borderRadius: 12, background: "white", color: "#111" }}>
      ✅ New SalaryWidget — build test
      <div style={{ marginTop: 8 }}>
        <Link to="/calculators/salary-calculator">Example internal link</Link>
      </div>
    </div>
  );
}
