// utils.ts

// Map your legacy page keys to Next.js routes.
// Update these later to point to real pages.
export function createPageUrl(key: string): string {
  const map: Record<string, string> = {
    SalaryCalculatorTakeHomePay: "/calculators/salary-calculator",
    SalaryCalculatorPaycheck: "/calculators/salary-calculator",
    GrossToNetCalculator: "/calculators/salary-calculator",
    ProRataSalaryCalculator: "/calculators/salary-calculator",
  };
  return map[key] ?? "/calculators/salary-calculator";
}

// Minimal classnames helper (often used as `cn(...)`)
export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}
