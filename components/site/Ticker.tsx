"use client";

import { snapshot } from "@/data/market";

export default function Ticker() {
  const s = snapshot;

  const items: { label: string; value: string }[] = [
    { label: "BOE Base Rate", value: `${s.boeRate.toFixed(2)}%` },
    { label: "CPI YoY", value: `${s.cpiYoY.toFixed(1)}%` },
    { label: "GBP/USD", value: s.gbpusd.toFixed(2) },
    { label: "FTSE 100", value: s.ftse100.toFixed(0) },
    { label: "As of", value: s.asOf },
  ];

  return (
    <div className="rounded-2xl border border-gray-200/20 bg-white/5">
      <div className="flex items-center gap-4 overflow-x-auto px-4 py-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="shrink-0 rounded-lg border border-white/10 px-3 py-2"
          >
            <div className="text-[11px] uppercase tracking-wide text-neutral-400">
              {it.label}
            </div>
            <div className="text-sm font-semibold">{it.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
