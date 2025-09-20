export type Calculator = {
  name: string;
  slug: string;
  category: string;
  description: string;
  status: "live" | "hidden";
};

export const calculators: Calculator[] = [
  {
    name: "Salary Calculator",
    slug: "salary-calculator",
    category: "Income & Employment",
    description: "Calculate UK take-home pay with tax, NI, pension, and student loan.",
    status: "live",
  },
];
