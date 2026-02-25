import { useState, useEffect, useCallback } from "react";
import { generateInterview } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "./markdown-renderer";
import { Printer, RefreshCw } from "lucide-react";

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
      <Card className="border-primary/10 shadow-lg">
        <CardHeader className="border-b bg-muted/30 flex flex-row items-center justify-between print:border-none print:bg-transparent">
          <CardTitle className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full print:hidden"></span>
            Interview Q&A Guide
          </CardTitle>

          {!loading && interview && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerate}
              className="text-muted-foreground hover:text-primary print:hidden"
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
              <div className="p-6 bg-muted/20 border border-primary/5 rounded-xl shadow-inner min-h-100 print:p-0 print:border-none print:shadow-none print:bg-transparent">
                {error ? (
                  <div className="text-red-500 text-center py-10">{error}</div>
                ) : (
                  <MarkdownRenderer content={interview ?? ""} />
                )}
              </div>

              <div className="flex justify-end pt-8 gap-4 print:hidden">
                <Button
                  onClick={() => {
                    const originalTitle = document.title;

                    document.title = "InterviewQuestions";

                    window.print();

                    // Restore title after printing
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
                  className="text-sm text-muted-foreground underline hover:text-foreground"
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
