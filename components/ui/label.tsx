import * as React from "react";

export function Label({
  className = "",
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={`block text-sm text-neutral-300 ${className}`}
    >
      {children}
    </label>
  );
}
