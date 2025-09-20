import { slugify } from "@/lib/slug";
export type Calculator = { name: string; slug: string; category: string; description: string; };
const items = [
  "Salary Calculator","PAYE Calculator","Pro Rata Salary Calculator","Hourly to Annual Salary Calculator","Minimum Wage Calculator","Freelancer Day Rate Calculator","Salary Increase Calculator","Commission Calculator",
  "Overtime & Bonus Calculator","Overtime Pay Calculator","Overtime Rate Calculator",
  "Holiday Pay Calculator","Severance Pay Calculator","Child Benefit Calculator",
  "Contractor (IR35) Calculator","Salary Sacrifice Calculator","Payroll Calculator",
  "Income Tax Calculator","National Insurance Calculator","Effective Tax Rate Calculator",
  "Capital Gains Tax Calculator","Dividend Tax Calculator",
  "VAT Calculator","Corporation Tax Calculator",
  "Budget Planner","Emergency Fund Calculator","Household Bills Splitter",
  "Savings Goal Calculator","ISA Calculator","Rule of 72 Calculator",
  "Cost of Living Explorer","Inflation Calculator","Council Tax Calculator","Commute Cost Calculator","Subscription Cost Calculator","Car Cost Calculator","Energy Bill Calculator",
  "Debt Repayment Calculator","Credit Card Repayment Calculator","Debt-to-Income Ratio Calculator",
  "Student Loan Calculator","Student Loan Repayment Calculator",
  "Personal Loan Calculator","Loan Repayment Calculator","Car Loan Calculator","Amortization Calculator","Loan Comparison Calculator",
  "Mortgage Calculator","Mortgage Affordability Calculator","Remortgage Calculator","Home Equity Loan Calculator","Mortgage Repayment Calculator","First-Time Buyer Calculator",
  "Rental Income Calculator","Property Investment Calculator","Buy-to-Let Mortgage Calculator","Rental Yield Calculator",
  "Stamp Duty Calculator","Rent vs Buy Calculator",
  "Investment Growth Calculator","Compound Interest Calculator","Simple Interest Calculator","Net Worth Calculator","Future Value Calculator",
  "Pension Calculator","Pension Contribution Calculator","Retirement Savings Calculator","Annuity Calculator","FIRE Calculator",
  "Business Loan Calculator","Break-Even Calculator",
  "Travel Budget Calculator","Dream Lifestyle Calculator",
  "Currency Converter","Quick Tools","Tip Calculator",
  "Wedding Budget Calculator","Maternity Pay Calculator","Childcare Cost Calculator","Statutory Sick Pay Calculator","Redundancy Pay Calculator","Inheritance Tax Calculator"
];
const cat = (name: string): string => {
  if (/salary|paye|pro rata|hourly|minimum wage|freelancer|commission|overtime|holiday|severance|child benefit|ir35|salary sacrifice|payroll/i.test(name)) return "Income & Employment";
  if (/income tax|national insurance|effective tax|capital gains|dividend|vat|corporation tax/i.test(name)) return "Tax";
  if (/budget|emergency fund|bills splitter|savings|isa|rule of 72|cost of living|inflation|council tax|commute|subscription|car cost|energy bill/i.test(name)) return "Personal Finance";
  if (/debt|credit card|dti|student loan|loan|amortization|comparison/i.test(name)) return "Debt & Loans";
  if (/mortgage|affordability|remortgage|home equity|first-time|rental|buy-to-let|yield|stamp duty|rent vs buy/i.test(name)) return "Property & Mortgages";
  if (/investment|compound|simple interest|net worth|future value|pension|retirement|annuity|FIRE/i.test(name)) return "Savings & Investments";
  if (/business loan|break-even/i.test(name)) return "Business";
  if (/travel budget|dream lifestyle/i.test(name)) return "Lifestyle & Planning";
  if (/currency|quick tools|tip/i.test(name)) return "Utilities & Tools";
  if (/wedding|maternity|childcare|sick pay|redundancy|inheritance/i.test(name)) return "Life & Events";
  return "Other";
}
export const calculators: Calculator[] = items.map((name) => ({ name, slug: slugify(name), category: cat(name), description: `${name} — interactive and accurate.` }));
