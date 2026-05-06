import { Button } from "antd";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type TertiaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function TertiaryButton({ children }: TertiaryButtonProps) {
  return (
    <button
      className={`
        h-[52px] px-7 rounded-lg cursor-pointer transition-colors
        bg-transparent border border-green-700 text-green-700 font-semibold text-[15px]
        hover:border-green-400 hover:text-green-400
        disabled:opacity-40 disabled:cursor-not-allowed       
      `}
    >
      {children}
    </button>
  );
}
