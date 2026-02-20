import { useState } from "react";
import { ResumeProvider } from "@/context/resume-context";
import AssistantStepper from "@/components/assistant-stepper";
import UploadStep from "@/components/upload-step";
import JDStep from "@/components/jd-step";
import InterviewStep from "@/components/interview-step";

export default function App() {
  const [step, setStep] = useState(0);

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <main className="mx-auto max-w-5xl px-6 py-10 space-y-10">
          <h1 className="text-4xl font-bold">AI Resume Assistant</h1>
          <AssistantStepper step={step} />

          {step === 0 && <UploadStep next={() => setStep(1)} />}
          {step === 1 && <JDStep next={() => setStep(2)} />}
          {step === 2 && <InterviewStep />}
        </main>
      </div>
      // fixing the issue of context not being available in the components by wrapping the entire app with ResumeProvider 
    </ResumeProvider>
  );
}