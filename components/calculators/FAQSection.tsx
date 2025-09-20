"use client";

export default function FAQSection() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      <details className="rounded-lg border border-white/10 p-3">
        <summary className="cursor-pointer font-medium">How are these numbers calculated?</summary>
        <div className="mt-2 text-sm text-neutral-300">
          Estimates use 2024/25 UK rates and simple assumptions. Replace this stub with your detailed FAQ content later.
        </div>
      </details>
    </div>
  );
}
