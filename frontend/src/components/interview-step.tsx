import { useState, useEffect } from "react";
import { generateInterview } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "./markdown-renderer";
import { Printer, RefreshCw } from "lucide-react";

export default function InterviewStep() {
  const { resumeText, jdText, interview, setInterview } = useResume();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeText && jdText && !interview) {
      handle();
    }
  }, []);

  async function handle() {
    setLoading(true);
    try {
      const res = await generateInterview({ resume_text: resumeText, jd_text: jdText });
      setInterview(res.interview_questions);
    } catch (e) {
      console.error(e);
      alert("Error generating interview questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-primary/10 shadow-lg">
        <CardHeader className="border-b bg-muted/30 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Interview Q&A Guide
          </CardTitle>
          {!loading && interview && (
            <Button variant="ghost" size="sm" onClick={handle} className="text-muted-foreground hover:text-primary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="h-16 w-16 border-4 border-primary/20 border-t-primary animate-spin rounded-full shadow-inner"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 bg-primary rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-foreground tracking-tight">AI is crafting your interview guide</p>
                <p className="text-muted-foreground animate-pulse text-sm">Reviewing JD and matching against your experience...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-6 bg-muted/20 border border-primary/5 rounded-xl shadow-inner min-h-[400px]">
                <MarkdownRenderer content={interview} />
              </div>
              <div className="flex justify-end pt-8 gap-4">
                <Button onClick={() => window.print()} variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
                  <Printer className="w-5 h-5 mr-2" />
                  Print Guide
                </Button>
                <Button onClick={() => window.location.reload()} variant="ghost" size="lg" className="text-muted-foreground underline hover:text-foreground">
                  Start New
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
