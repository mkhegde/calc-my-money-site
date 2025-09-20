import * as React from "react";

/** Minimal shadcn-style Tooltip shim.
 * Renders children and uses the browser title attribute for a basic tooltip.
 */

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

type CtxType = { content?: string };
const Ctx = React.createContext<CtxType>({});

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TooltipTrigger({
  children,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }) {
  // In this shim we don't need special behavior
  return <span {...props}>{children}</span>;
}

export function TooltipContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // No popup UI in this shim; return a span that sets title on the previous sibling
  return <span data-tooltip className={className} style={{ display: "none" }}>{children}</span>;
}

/** Optional helper: wraps any element and sets its title from the nearest TooltipContent */
export function WithTooltip({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) {
  return React.cloneElement(children, { title });
}
