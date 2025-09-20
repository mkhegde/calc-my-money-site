"use client";

import { useForm } from "react-hook-form";
import Decimal from "decimal.js";
import { gbp, pct } from "@/lib/format";
import { Card } from "@/components/ui/card";

type Inputs = {
  amount: number;
  payFrequency: "annual" | "monthly" | "weekly";
  pensionPct: number;
};

const CONSTANTS = {
  personalAllowance: new Decimal(12570),
  basicRate: new Decimal(0.2),
  higherRate: new Decimal(0.4),
  additionalRate: new Decimal(0.45),
  basicThreshold: new Decimal(37700),     // taxable after allowance
  higherThreshold: new Decimal(125140),   // top of higher-rate band
  niPersonalThreshold: new Decimal(12570),
  niUpperEarningsLimit: new Decimal(50270),
  niMainRate: new Decimal(0.08),
  niAdditionalRate: new Decimal(0.02),
};

function toAnnual(amount: Decimal, freq: Inputs["payFrequency"]) {
  if (freq === "monthly") return amount.mul(12);
  if (freq === "weekly") return amount.mul(52);
  return amount;
}

function calcIncomeTax(gross: Decimal, pension: Decimal) {
  const { personalAllowance, basicRate, higherRate, additionalRate, basicThreshold, higherThreshold } = CONSTANTS;

  const taxable = Decimal.max(gross.minus(pension).minus(personalAllowance), 0);
  let remaining = taxable;
  let tax = new Decimal(0);

  // Basic band
  const basicBand = Decimal.min(remaining, basicThreshold);
  tax = tax.plus(basicBand.mul(basicRate));
  remaining = remaining.minus(basicBand);

  // Higher band
  const higherBand = Decimal.min(remaining, higherThreshold.minus(basicThreshold));
  tax = tax.plus(higherBand.mul(higherRate));
  remaining = remaining.minus(higherBand);

  // Additional band
  if (remaining.greaterThan(0)) tax = tax.plus(remaining.mul(additionalRate));

  return tax;
}

function calcNI(gross: Decimal) {
  const { niPersonalThreshold, niUpperEarningsLimit, niMainRate, niAdditionalRate } = CONSTANTS;

  const mainBand = Decimal.max(Decimal.min(gross, niUpperEarningsLimit).minus(niPersonalThreshold), 0);
  const addlBand = Decimal.max(gross.minus(niUpperEarningsLimit), 0);

  const mainNI = mainBand.mul(niMainRate);
  const addlNI = addlBand.mul(niAdditionalRate);

  return mainNI.plus(addlNI);
}

export default function SalaryCalculatorUK() {
  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: { amount: 50000, payFrequency: "annual", pensionPct: 5 },
  });

  const onSubmit = (data: Inputs) => {
    // no-op; we compute live from watch()
  };

  const amount = new Decimal(watch("amount") || 0);
  const freq = watch("payFrequency") || "annual";
  const pensionPct = new Decimal(watch("pensionPct") || 0);

  const grossAnnual = toAnnual(amount, freq);
  const pension = grossAnnual.mul(pensionPct.div(100));
  const tax = calcIncomeTax(grossAnnual, pension);
  const ni = calcNI(grossAnnual);
  const net = grossAnnual.minus(tax).minus(ni).minus(pension);

  const monthly = {
    gross: grossAnnual.div(12),
    net: net.div(12),
  };
  const weekly = {
    gross: grossAnnual.div(52),
    net: net.div(52),
  };

  const effectiveRate = grossAnnual.greaterThan(0)
    ? tax.plus(ni).plus(pension).div(grossAnnual).mul(100)
    : new Decimal(0);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-3">
          <label className="sm:col-span-1 space-y-1">
            <div className="text-sm text-neutral-300">Amount</div>
            <input
              type="number"
              step="100"
              className="w-full rounded-lg border border-gray-300/30 bg-white/90 p-2 text-black"
              {...register("amount", { valueAsNumber: true })}
            />
          </label>

          <label className="sm:col-span-1 space-y-1">
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

          <label className="sm:col-span-1 space-y-1">
            <div className="text-sm text-neutral-300">Pension %</div>
            <input
              type="number"
              step="0.5"
              className="w-full rounded-lg border border-gray-300/30 bg-white/90 p-2 text-black"
              {...register("pensionPct", { valueAsNumber: true })}
            />
          </label>
        </form>
      </Card>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-sm text-neutral-400">Annual Gross</div>
          <div className="text-xl font-semibold">{gbp.format(Number(grossAnnual.toFixed(2)))}</div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-400">Annual Net</div>
          <div className="text-xl font-semibold text-green-400">{gbp.format(Number(net.toFixed(2)))}</div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-400">Tax + NI + Pension</div>
          <div className="text-xl font-semibold text-red-300">
            {gbp.format(Number(tax.plus(ni).plus(pension).toFixed(2)))}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-400">Effective Rate</div>
          <div className="text-xl font-semibold">{pct(Number(effectiveRate.toFixed(1)))}</div>
        </Card>
      </div>

      {/* Periods */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="text-sm text-neutral-400 mb-1">Monthly</div>
          <div className="flex justify-between"><span>Gross</span><span>{gbp.format(Number(monthly.gross.toFixed(2)))}</span></div>
          <div className="flex justify-between"><span>Net</span><span className="text-green-400">{gbp.format(Number(monthly.net.toFixed(2)))}</span></div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-400 mb-1">Weekly</div>
          <div className="flex justify-between"><span>Gross</span><span>{gbp.format(Number(weekly.gross.toFixed(2)))}</span></div>
          <div className="flex justify-between"><span>Net</span><span className="text-green-400">{gbp.format(Number(weekly.net.toFixed(2)))}</span></div>
        </Card>
      </div>

      <div className="text-xs text-neutral-400">
        Estimates for 2024/25 (England, NI & Wales). This is a simplified model—replace with your full calculator when ready.
      </div>
    </div>
  );
}
