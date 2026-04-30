"use client";

import { useTournament } from "@/app/context/TournamentContext";

type StepIndicatorProps = {
  total: number;
};

export default function StepIndicator({ total }: StepIndicatorProps) {
  const { currentStep } = useTournament();

  return (
    <div className="flex items-center justify-center mb-9">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <StepCircle index={i} currentStep={currentStep} />
          {i < total - 1 && <StepLine isDone={i < currentStep} />}
        </div>
      ))}
    </div>
  );
}

type StepCircleProps = {
  index: number;
  currentStep: number;
};

function StepCircle({ index, currentStep }: StepCircleProps) {
  const isDone = index < currentStep;
  const isActive = index === currentStep;

  const classes = [
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

  return <div className={classes}>{isDone ? "✓" : index + 1}</div>;
}

type StepLineProps = {
  isDone: boolean;
};

function StepLine({ isDone }: StepLineProps) {
  return (
    <div
      className={`h-0.5 w-16 mx-1 transition-all ${
        isDone ? "bg-[#00e5a0]" : "bg-[#3a4060]"
      }`}
    />
  );
}