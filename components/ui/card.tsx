export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-gray-200/20 bg-white/5 p-4 ${className}`}>{children}</div>;
}
