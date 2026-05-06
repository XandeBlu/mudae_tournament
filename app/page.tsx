"use client";

import StepForm from "./components/forms/StepForm";
import Step1 from "./components/forms/Step1";
import Step2 from "./components/forms/Step2";
import Step3 from "./components/forms/Step3";
import Step4 from "./components/forms/Step4";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6 relative">
      <StepForm>
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
      </StepForm>
    </main>
  );
}
