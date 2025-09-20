import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        (props.className ?? "") +
        " w-full rounded-lg border border-gray-300/30 bg-white/90 p-2 text-black"
      }
    />
  );
}
