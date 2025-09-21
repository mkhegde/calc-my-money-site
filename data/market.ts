// data/market.ts
// Placeholder snapshot we’ll later update from real APIs (EOD)
export type MarketSnapshot = {
  asOf: string;     // ISO date, e.g. "2025-09-21"
  boeRate: number;  // %
  cpiYoY: number;   // %
  gbpusd: number;   // spot or EOD close
  ftse100: number;  // index level
};

export const snapshot: MarketSnapshot = {
  asOf: new Date().toISOString().slice(0, 10), // today for now
  boeRate: 5.25,
  cpiYoY: 2.2,
  gbpusd: 1.27,
  ftse100: 8240,
};
