import * as React from "react";

/** Minimal shadcn-style Tabs shim */

type TabsCtx = {
  value: string;
  setValue: (v: string) => void;
};
const Ctx = React.createContext<TabsCtx | null>(null);

type TabsProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  children?: React.ReactNode;
  className?: string;
};

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className = "",
}: TabsProps) {
  const [internal, setInternal] = React.useState<string>(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? (value as string) : internal;

  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <Ctx.Provider value={{ value: current, setValue }}>
      <div className={className}>{children}</div>
    </Ctx.Provider>
  );
}

export function TabsList({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const ctx = React.useContext(Ctx);
  if (!ctx) return null;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      data-state={active ? "active" : "inactive"}
      onClick={() => ctx.setValue(value)}
      className={
        `rounded-lg px-3 py-1.5 border ` +
        (active ? "bg-white text-black border-white" : "bg-transparent text-white border-white/20 hover:bg-white/10") +
        ` ${className}`
      }
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const ctx = React.useContext(Ctx);
  if (!ctx) return null;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
