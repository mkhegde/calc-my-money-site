import * as React from "react";

/** Minimal shadcn-style Select shim that renders a native <select> */

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  onValueChange?: (v: string) => void;
  value?: string;
  defaultValue?: string;
  children?: React.ReactNode;
};

export function Select({ onValueChange, children, className, onChange, ...rest }: SelectProps) {
  // Only render option-like children (SelectItem) even if Trigger/Content are present
  const options: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    // unwrap <SelectContent> and read its children
    if (child.type === SelectContent) {
      React.Children.forEach(child.props.children, (grand: any) => {
        if (React.isValidElement(grand) && grand.type === SelectItem) options.push(grand);
      });
      return;
    }
    if (child.type === SelectItem) options.push(child);
  });

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onValueChange?.(e.target.value);
    onChange?.(e as any); // keep RHF compatibility if used
  }

  return (
    <select
      {...rest}
      onChange={handleChange}
      className={(className ?? "") + " w-full rounded-lg border border-gray-300/30 bg-white/90 p-2 text-black"}
    >
      {options.length ? options : children}
    </select>
  );
}

export function SelectTrigger({ children }: { children?: React.ReactNode }) {
  // No-op in this shim
  return <>{children}</>;
}

export function SelectValue() {
  // No-op: native <select> shows the value itself
  return null;
}

export function SelectContent({ children }: { children?: React.ReactNode }) {
  // No-op wrapper so JSX compiles; Select extracts its children
  return <>{children}</>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}
