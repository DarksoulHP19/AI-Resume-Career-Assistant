import { useState, useEffect, useCallback } from "react";
import { generateInterview } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, RefreshCw, Terminal, Users, CheckCircle2 } from "lucide-react";

export default function InterviewStep() {
  const { resumeText, jdText, interview, setInterview } = useResume();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!resumeText || !jdText) return;

    setError(null);
    setLoading(true);

    try {
      const res = await generateInterview({
        resume_text: resumeText,
        jd_text: jdText,
      });

      if (!res?.interview_questions) {
        throw new Error("Invalid response from server");
      }

      setInterview(res.interview_questions);
    } catch (err) {
      console.error("Interview generation failed:", err);
      setError("Failed to generate interview questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [resumeText, jdText, setInterview]);

  useEffect(() => {
    if (resumeText && jdText && !interview) {
      handleGenerate();
    }
  }, [resumeText, jdText, interview, handleGenerate]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="glass-card shadow-lg border-primary/20">
        <CardHeader className="border-b border-primary/10 bg-muted/30 flex flex-row items-center justify-between print:border-none print:bg-transparent">
          <CardTitle className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full print:hidden"></span>
            Interview Q&A Guide
          </CardTitle>

          {!loading && interview && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerate}
              className="text-primary hover:bg-primary/10 border-primary/20 print:hidden shadow-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-8 print:p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="h-16 w-16 border-4 border-primary/20 border-t-primary animate-spin rounded-full shadow-inner"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 bg-primary rounded-full animate-ping"></div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-foreground tracking-tight">
                  AI is crafting your interview guide
                </p>
                <p className="text-muted-foreground animate-pulse text-sm">
                  Reviewing JD and matching against your experience...
                </p>
              </div>
            </div>
          ) : (
            <>
              {error ? (
                <div className="text-red-500 text-center py-10 glass-card rounded-xl">{error}</div>
              ) : interview ? (
                <div className="space-y-10 min-h-100 print:p-0 print:border-none print:shadow-none print:bg-transparent">
                  
                  <div className="grid md:grid-cols-2 gap-8 print:block">
                    {/* Technical Questions */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xl text-primary flex items-center gap-2">
                        <Terminal className="w-5 h-5" /> Technical Questions
                      </h4>
                      <div className="space-y-3">
                        {interview.technical_questions.map((q, idx) => (
                          <div key={`tech-${idx}`} className="p-4 bg-primary/5 rounded-xl border border-primary/10 print:break-inside-avoid print:mb-4">
                             <div className="text-sm font-semibold flex gap-2">
                               <span className="text-primary font-black shrink-0">{idx + 1}.</span>
                               <span>{q}</span>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Behavioral Questions */}
                    <div className="space-y-4 print:mt-8">
                      <h4 className="font-bold text-xl text-secondary flex items-center gap-2">
                        <Users className="w-5 h-5" /> Behavioral Questions
                      </h4>
                      <div className="space-y-3">
                        {interview.behavioral_questions.map((q, idx) => (
                          <div key={`beh-${idx}`} className="p-4 bg-secondary/5 rounded-xl border border-secondary/10 print:break-inside-avoid print:mb-4">
                             <div className="text-sm font-semibold flex gap-2">
                               <span className="text-secondary font-black shrink-0">{idx + 1}.</span>
                               <span>{q}</span>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="border-border" />

                  {/* Sample Answers */}
                  <div className="space-y-6">
                    <h4 className="font-bold text-2xl flex items-center gap-2 text-foreground/80">
                       <CheckCircle2 className="w-6 h-6 text-green-500" /> Sample Best Answers
                    </h4>
                    <div className="grid lg:grid-cols-2 gap-8 print:block">
                      {interview.sample_answers.map((sa, idx) => (
                        <div key={`ans-${idx}`} className="glass-card p-6 rounded-2xl border-primary/20 relative shadow-sm print:break-inside-avoid print:mb-6 print:bg-white print:border-gray-200">
                           <div className="absolute top-0 right-0 p-3 opacity-20">
                              <span className="text-6xl font-black italic">A</span>
                           </div>
                           <h5 className="font-bold text-lg mb-3 flex gap-2 pr-10 print:text-black">
                             <span className="text-primary">Q:</span> {sa.question}
                           </h5>
                           <div className="bg-background/40 p-4 rounded-xl border border-border text-sm leading-relaxed text-muted-foreground print:text-black print:bg-transparent print:border-gray-200">
                              {sa.answer}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex justify-end pt-12 gap-4 print:hidden">
                <Button
                  onClick={() => {
                    const originalTitle = document.title;
                    document.title = "InterviewQuestions";
                    window.print();
                    setTimeout(() => {
                      document.title = originalTitle;
                    }, 1000);
                  }}
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:bg-primary/5"
                >
                  <Printer className="w-5 h-5 mr-2" />
                  Print Guide
                </Button>
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm font-bold text-muted-foreground underline underline-offset-4 hover:text-foreground pl-4"
                >
                  Start New
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
