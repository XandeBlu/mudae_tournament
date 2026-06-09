import { ButtonHTMLAttributes, ReactNode } from "react";

export type TertiaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  sub?: boolean;
};

export default function TertiaryButton({
  children,
  sub,
  ...props
}: TertiaryButtonProps) {
  return (
    <button
      {...props}
      className={`
        h-14 px-7 rounded-lg cursor-pointer transition-colors
        bg-transparent font-semibold text-[15px]
        border ${
          sub
            ? "border-red-700 text-red-700 hover:border-red-400 hover:text-red-400"
            : "border-green-700 text-green-700 hover:border-green-400 hover:text-green-400"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
}
