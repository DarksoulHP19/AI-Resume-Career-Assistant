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
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-8 border rounded-3xl glass-card relative overflow-hidden ring-1 ring-primary/20 shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary via-secondary to-primary/50"></div>
                  
                  <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
                    <div className="flex-1">
                      <h3 className="text-3xl font-black mb-2 flex items-center gap-3">
                        Compatibility Score
                      </h3>
                      <p className="text-muted-foreground font-medium">How well your resume fits the target role.</p>
                    </div>
                    
                    <div className="relative shrink-0 flex items-center justify-center w-32 h-32 rounded-full border-4 border-muted/30 shadow-inner group">
                       <svg className="absolute w-[140%] h-[140%] rotate-90" viewBox="0 0 100 100">
                         <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted/20" strokeWidth="6" />
                         <circle 
                           cx="50" cy="50" r="45" fill="none" 
                           className={`stroke-primary transition-all duration-1000 ease-out`} 
                           strokeWidth="6" 
                           strokeDasharray="283" 
                           strokeDashoffset={283 - (283 * match.match_score) / 100}
                           strokeLinecap="round" 
                         />
                       </svg>
                       <div className="absolute flex flex-col items-center justify-center z-10 group-hover:scale-110 transition-transform">
                          <span className="text-4xl font-black tabular-nums tracking-tighter">{match.match_score}</span>
                          <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest">%</span>
                       </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {/* Missing Skills */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                        Missing Skills
                      </h4>
                      {match.missing_skills.length === 0 ? (
                        <div className="p-4 bg-green-500/10 rounded-xl text-green-600 font-medium">
                          No missing skills! Excellent match.
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {match.missing_skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm font-semibold tracking-wide">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-4">
                       <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                        Action Items
                      </h4>
                      <ul className="space-y-3">
                        {match.suggestions.map((sug, idx) => (
                          <li key={idx} className="text-sm font-medium text-foreground/80 flex gap-3 p-3 bg-muted/20 rounded-xl">
                            <span className="mt-0.5 text-primary">⚡</span> {sug}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center px-4">
                  <button 
                    onClick={handleStartOver} 
                    className="text-sm font-bold text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Start Over from Scratch
                  </button>
                  <Button 
                    onClick={() => setStep(3)} 
                    className="px-8 h-14 text-lg font-black shadow-primary/20 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                  >
                    Generate Interview Prep
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
