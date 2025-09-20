export const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
export const pct = (n: number) => `${Number(n).toFixed(1)}%`;
