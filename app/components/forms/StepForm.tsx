"use client";

import { ReactNode, Children } from "react";
import {
  TournamentProvider,
  useTournament,
} from "@/app/context/TournamentContext";
import StepIndicator from "./StepIndicator";

type StepFormProps = {
  children: ReactNode;
};

export default function StepForm({ children }: StepFormProps) {
  const steps = Children.toArray(children);

  return <StepFormLayout steps={steps} />;
}

type StepFormLayoutProps = {
  steps: ReactNode[];
};

function StepFormLayout({ steps }: StepFormLayoutProps) {
  const { currentStep } = useTournament();

  return (
    <div className="bg-[#141727] rounded-2xl p-10 md:p-12 w-full max-w-155 shadow-[0_24px_64px_rgba(0,0,0,0.5)] border border-white/6">
      <StepIndicator total={steps.length} />
      <div>{steps[currentStep]}</div>
    </div>
  );
}
