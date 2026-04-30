import { ButtonHTMLAttributes, ReactNode } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function SecondaryButton({
  children,
  className = "",
  ...rest
}: SecondaryButtonProps) {
  return (
    <button
      {...rest}
      className={`
        h-[52px] px-7 rounded-lg cursor-pointer transition-colors
        bg-transparent border border-[#3a4060] text-[#8892aa] font-semibold text-[15px]
        hover:border-[#8892aa] hover:text-white
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}