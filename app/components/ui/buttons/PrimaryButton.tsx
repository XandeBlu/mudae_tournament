import { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function PrimaryButton({
  children,
  className = "",
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      className={`
        h-13 px-6 rounded-lg border-none cursor-pointer transition-colors
        bg-[#00e5a0] text-[#0d1117] font-bold text-base
        hover:bg-[#00d190]
        disabled:bg-[#2a3050] disabled:text-[#4a5568] disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}