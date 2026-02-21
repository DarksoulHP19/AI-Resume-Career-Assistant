import { useState } from "react";
import { analyzeResume } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileUp, FileText, CheckCircle2 } from "lucide-react";

export default function UploadStep({ next }: { next: () => void }) {
  const { setAnalysis, setResumeText } = useResume();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handle() {
    if (!file) return;
    setLoading(true);
    try {
      const res = await analyzeResume(file);
      setAnalysis(res.analysis);
      setResumeText(res.resume_text);
      next();
    } catch (e) {
      console.error(e);
      alert("Error analyzing resume. Please ensure it's a valid PDF and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-xl mx-auto border-2 border-dashed transition-colors hover:border-primary/50 group">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
          <FileUp className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Upload Resume</CardTitle>
        <CardDescription>
          Drag and drop or select your resume (PDF only) to start the analysis.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center gap-6 pb-10">
        <div className="relative w-full">
          <input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <label 
            htmlFor="resume-upload"
            className="flex flex-col items-center justify-center gap-4 p-8 border rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
          >
            {file ? (
              <div className="flex items-center gap-3 text-primary font-medium">
                <FileText className="w-6 h-6" />
                <span>{file.name}</span>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">No file selected</span>
            )}
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Click to browse
            </span>
          </label>
        </div>

        <Button 
          size="lg" 
          onClick={handle} 
          disabled={!file || loading}
          className="w-full h-14 text-lg font-bold shadow-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 border-2 border-primary/20 transition-all"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            "Start AI Review"
          )}
        </Button>
        <p className="text-xs text-muted-foreground/60 flex items-center gap-2">
          Secure, AI-powered analysis of your career documents.
        </p>
      </CardContent>
    </Card>
  );
}
