import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className = "",
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300/50 text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
  } as const;

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-2.5 text-lg",
  } as const;

  return (
    <button
      {...props}
      className={`${sizes[size]} rounded-lg ${variants[variant]} ${className}`}
    />
  );
}
