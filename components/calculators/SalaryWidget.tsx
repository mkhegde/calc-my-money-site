"use client";

import { useForm } from "react-hook-form";
import Decimal from "decimal.js";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

type Inputs = {
  amount: number;
  payFrequency: "annual" | "monthly" | "weekly";
  pensionPct: number;
  studentLoan: "none" | "plan1" | "plan2" | "postgrad";
};

const C = {
  // Income Tax (England/Wales/NI 2024/25, simplified)
  PA: new Decimal(12570), // personal allowance
  BASIC: new Decimal(0.2),
  HIGHER: new Decimal(0.4),
  ADDL: new Decimal(0.45),
  BASIC_BAND: new Decimal(37700),
  HIGHER_TOP: new Decimal(125140),
  // National Insurance (employee)
  NI_PT: new Decimal(12570),
  NI_UEL: new Decimal(50270),
  NI_MAIN: new Decimal(0.08),
  NI_ADDL: new Decimal(0.02),
  // Student loan thresholds (approx 24/25)
  SL_T: {
    plan1: new Decimal(22015),
    plan2: new Decimal(27295),
    postgrad: new Decimal(21000),
  },
  SL_R: {
    plan1: new Decimal(0.09),
    plan2: new Decimal(0.09),
    postgrad: new Decimal(0.06),
  },
};

function toAnnual(x: Decimal, f: Inputs["payFrequency"]) {
  if (f === "monthly") return x.mul(12);
  if (f === "weekly") return x.mul(52);
  return x;
}

function tax(gross: Decimal, pension: Decimal) {
  let taxable = Decimal.max(gross.minus(pension).minus(C.PA), 0);
  let t = new Decimal(0);

  const basic = Decimal.min(taxable, C.BASIC_BAND);
  t = t.plus(basic.mul(C.BASIC));
  taxable = taxable.minus(basic);

  const higher = Decimal.min(taxable, C.HIGHER_TOP.minus(C.BASIC_BAND));
  t = t.plus(higher.mul(C.HIGHER));
  taxable = taxable.minus(higher);

  if (taxable.greaterThan(0)) t = t.plus(taxable.mul(C.ADDL));
  return t;
}

function ni(gross: Decimal) {
  const main = Decimal.max(Decimal.min(gross, C.NI_UEL).minus(C.NI_PT), 0).mul(C.NI_MAIN);
  const addl = Decimal.max(gross.minus(C.NI_UEL), 0).mul(C.NI_ADDL);
  return main.plus(addl);
}

function studentLoan(gross: Decimal, plan: Inputs["studentLoan"]) {
  if (plan === "none") return new Decimal(0);
  const threshold = C.SL_T[plan];
  const rate = C.SL_R[plan];
  return Decimal.max(gross.minus(threshold), 0).mul(rate);
}

export default function SalaryWidget() {
  const { register, watch } = useForm<Inputs>({
    defaultValues: { amount: 50000, payFrequency: "annual", pensionPct: 5, studentLoan: "none" },
  });

  const amount = new Decimal(watch("amount") || 0);
  const freq = watch("payFrequency") || "annual";
  const pensionPct = new Decimal(watch("pensionPct") || 0);
  const slPlan = watch("studentLoan") || "none";

  const grossAnnual = toAnnual(amount, freq);
  const pension = grossAnnual.mul(pensionPct.div(100));
  const taxDue = tax(grossAnnual, pension);
  const niDue = ni(grossAnnual);
  const slDue = studentLoan(grossAnnual, slPlan);
  const net = grossAnnual.minus(taxDue).minus(niDue).minus(pension).minus(slDue);

  const effRate = grossAnnual.greaterThan(0)
    ? taxDue.plus(niDue).plus(pension).plus(slDue).div(grossAnnual).mul(100)
    : new Decimal(0);

  const monthly = { gross: grossAnnual.div(12), net: net.div(12) };
  const weekly  = { gross: grossAnnual.div(52), net: net.div(52) };

  return (
    <div className="space-y-6 rounded-2xl border border-gray-200/20 bg-white/5 p-4">
      {/* Inputs */}
      <form className="grid gap-4 sm:grid-cols-4">
        <label className="space-y-1">
          <div className="text-sm text-neutral-300">Amount</div>
          <input
            type="number"
            step="100"
            className="w-full rounded-lg border border-gray-300/30 bg-white/90 p-2 text-black"
            {...register("amount", { valueAsNumber: true })}
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm text-neutral-300">Pay Frequency</div>
          <select
            className="w-full rounded-lg border border-gray-300/30 bg-white/90 p-2 text-black"
            {...register("payFrequency")}
          >
            <option value="annual">Annual</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </label>

        <label className="space-y-1">
          <div className="text-sm text-neutral-300">Pension %</div>
          <input
            type="number"
            step="0.5"
            className="w-full rounded-lg border border-gray-300/30 bg-white/90 p-2 text-black"
            {...register("pensionPct", { valueAsNumber: true })}
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm text-neutral-300">Student Loan</div>
          <select
            className="w-full rounded-lg border border-gray-300/30 bg-white/90 p-2 text-black"
            {...register("studentLoan")}
          >
            <option value="none">None</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="postgrad">Postgrad</option>
          </select>
        </label>
      </form>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div><div className="text-sm text-neutral-400">Annual Gross</div><div className="text-xl font-semibold">{gbp.format(Number(grossAnnual.toFixed(2)))}</div></div>
        <div><div className="text-sm text-neutral-400">Annual Net</div><div className="text-xl font-semibold text-green-400">{gbp.format(Number(net.toFixed(2)))}</div></div>
        <div><div className="text-sm text-neutral-400">Tax + NI + Pension + SL</div><div className="text-xl font-semibold text-red-300">{gbp.format(Number(taxDue.plus(niDue).plus(pension).plus(slDue).toFixed(2)))}</div></div>
        <div><div className="text-sm text-neutral-400">Effective Rate</div><div className="text-xl font-semibold">{Number(effRate.toFixed(1))}%</div></div>
      </div>

      {/* Periods */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-3">
          <div className="text-sm text-neutral-400 mb-1">Monthly</div>
          <div className="flex justify-between"><span>Gross</span><span>{gbp.format(Number(monthly.gross.toFixed(2)))}</span></div>
          <div className="flex justify-between"><span>Net</span><span className="text-green-400">{gbp.format(Number(monthly.net.toFixed(2)))}</span></div>
        </div>
        <div className="rounded-xl border border-white/10 p-3">
          <div className="text-sm text-neutral-400 mb-1">Weekly</div>
          <div className="flex justify-between"><span>Gross</span><span>{gbp.format(Number(weekly.gross.toFixed(2)))}</span></div>
          <div className="flex justify-between"><span>Net</span><span className="text-green-400">{gbp.format(Number(weekly.net.toFixed(2)))}</span></div>
        </div>
      </div>

      <div className="text-xs text-neutral-400">
        Estimates for 2024/25 (England, Wales & NI). Student loan thresholds/rates approximate.
      </div>
    </div>
  );
}
