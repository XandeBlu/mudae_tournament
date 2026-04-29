"use client";

import { ReactNode, Children } from "react";
import {
  TournamentProvider,
  useTournament,
} from "../../context/TournamentContext";

// ---------- Custom Step Indicator ----------
function StepIndicator({ total }: { total: number }) {
  const { currentStep } = useTournament();

  return (
    <div className="flex items-center justify-center mb-9">
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;

        const circleClasses = [
          "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all",
          isDone && "bg-[#00e5a0] border-[#00e5a0] text-[#0d1117]",
          isActive &&
            "bg-transparent border-[#00e5a0] text-[#00e5a0] shadow-[0_0_12px_rgba(0,229,160,0.4)]",
          !isDone &&
            !isActive &&
            "bg-transparent border-[#3a4060] text-[#3a4060]",
        ]
          .filter(Boolean)
          .join(" ");

        const lineClasses = [
          "h-0.5 w-16 mx-1 transition-all",
          isDone ? "bg-[#00e5a0]" : "bg-[#3a4060]",
        ].join(" ");

        return (
          <div key={i} className="flex items-center">
            <div className={circleClasses}>{isDone ? "✓" : i + 1}</div>
            {i < total - 1 && <div className={lineClasses} />}
          </div>
        );
      })}
    </div>
  );
}

// ---------- Inner layout (consumes context) ----------
function StepFormInner({ children }: { children: ReactNode[] }) {
  const { currentStep } = useTournament();

  return (
    <div className="bg-[#141727] rounded-2xl p-10 md:p-12 w-full max-w-[620px] shadow-[0_24px_64px_rgba(0,0,0,0.5)] border border-white/[0.06]">
      <StepIndicator total={children.length} />
      <div>{children[currentStep]}</div>
    </div>
  );
}

// ---------- Public component (provides context) ----------
interface StepFormProps {
  children: ReactNode;
}

export default function StepForm({ children }: StepFormProps) {
  const array = Children.toArray(children) as ReactNode[];

  return (
    <TournamentProvider totalSteps={array.length}>
      <StepFormInner>{array}</StepFormInner>
    </TournamentProvider>
  );
}
