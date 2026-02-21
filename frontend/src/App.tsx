import { useState } from "react";
import { ResumeProvider, useResume } from "@/context/resume-context";
import { ThemeProvider } from "@/components/theme-provider";
import AssistantStepper from "@/components/assistant-stepper";
import LayoutShell from "@/components/layout-shell";
import UploadStep from "@/components/upload-step";
import JDStep from "@/components/jd-step";
import InterviewStep from "@/components/interview-step";
import AnalysisStep from "@/components/analysis-step";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/markdown-renderer";

function AppContent() {
  const [step, setStep] = useState(0);
  const { match, reset } = useResume();

  const handleStartOver = () => {
    reset();
    setStep(0);
  };

  return (
    <LayoutShell>
      <div className="print:hidden">
        <AssistantStepper step={step} />
      </div>

      <div className="mt-10">
        {step === 0 && <UploadStep next={() => setStep(1)} />}
        {step === 1 && <AnalysisStep next={() => setStep(2)} />}
        {step === 2 && (
          <div className="space-y-6">
            {!match ? (
              <JDStep next={() => {}} /> 
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-8 border rounded-xl bg-card shadow-sm border-primary/20 ring-1 ring-primary/5">
                  <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                    Matching Results
                  </h3>
                  <MarkdownRenderer content={match} />
                </div>
                <div className="flex justify-between items-center px-2">
                  <button 
                    onClick={handleStartOver} 
                    className="text-sm text-muted-foreground underline hover:text-foreground transition-colors"
                  >
                    Start over
                  </button>
                  <Button 
                    onClick={() => setStep(3)} 
                    className="px-8 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Generate Interview Questions
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        {step === 3 && <InterviewStep />}
      </div>
    </LayoutShell>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </ThemeProvider>
  );
}
