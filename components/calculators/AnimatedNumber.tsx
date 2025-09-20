"use client";
import * as React from "react";

/** Minimal number “animation” that just formats the value.
 *  Replace with a fancier animation later if you like.
 */
export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = React.useState<number>(value);
  React.useEffect(() => {
    setDisplay(value);
  }, [value]);

  const formatted =
    typeof value === "number"
      ? new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(display)
      : String(display);

  return <span className={className}>{prefix}{formatted}{suffix}</span>;
}
