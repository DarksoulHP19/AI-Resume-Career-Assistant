import { useState } from "react";
import { analyzeResume } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileUp,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface UploadStepProps {
  next: () => void;
}

export default function UploadStep({ next }: UploadStepProps) {
  const { setAnalysis, setResumeText } = useResume();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleUpload() {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrorMessage("Only PDF files are allowed.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await analyzeResume(file);

      if (!res?.analysis || !res?.resume_text) {
        throw new Error("Invalid server response");
      }

      setAnalysis(res.analysis);
      setResumeText(res.resume_text);

      next();
    } catch (error: unknown) {
      console.error("Analyze Resume Error:", error);

      let message =
        "Server not reachable. Ensure backend is running on port 8000.";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const err = error as {
          response?: { data?: { detail?: string; message?: string } };
        };

        message =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          message;
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* LEFT SIDE */}
      <div className="lg:col-span-3 space-y-6">
        <Card className="border-2 border-dashed transition-all hover:border-primary/50 group relative overflow-hidden bg-linear-to-br from-card to-muted/20">

          <CardHeader className="text-center pt-10">
            <div className="mx-auto bg-primary/10 p-5 rounded-full w-20 h-20 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-inner ring-4 ring-primary/5">
              <FileUp className="w-10 h-10 text-primary" />
            </div>

            <CardTitle className="text-3xl font-black tracking-tight">
              Upload Your Resume
            </CardTitle>

            <CardDescription className="text-base max-w-sm mx-auto">
              Our AI will extract your skills, experience, and potential gaps.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-8 pb-12 px-10">
            {/* File Input */}
            <div className="relative w-full">
              <input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files?.[0] ?? null)
                }
              />

              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center gap-5 p-10 border-2 border-dashed rounded-2xl cursor-pointer bg-card/50 hover:bg-muted hover:border-primary/30 transition-all shadow-sm"
              >
                {file ? (
                  <div className="flex items-center gap-3 text-primary font-bold text-lg">
                    <FileText className="w-7 h-7" />
                    <span className="truncate max-w-50">
                      {file.name}
                    </span>
                    <CheckCircle2 className="w-6 h-6 text-green-500 animate-in zoom-in-50" />
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <span className="text-sm text-muted-foreground font-medium block">
                      No file selected
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary opacity-60 transition-opacity">
                      Click to Browse PDF
                    </span>
                  </div>
                )}
              </label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="w-full text-sm text-red-500 text-center">
                {errorMessage}
              </div>
            )}

            {/* Button */}
            <Button
              size="lg"
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full h-16 text-xl font-black shadow-xl bg-slate-950 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-slate-200 border-2 border-primary/20 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              {loading ? (
                <div className="flex items-center gap-4">
                  <div className="h-6 w-6 border-4 border-white/30 border-t-white animate-spin rounded-full" />
                  <span>Analyzing Resume...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 fill-current" />
                  <span>Start AI Resume Review</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 space-y-6 shadow-sm">
          <h3 className="font-bold text-lg flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Why Analyze Your Resume?
          </h3>

          <div className="space-y-4">
            {[ 
              "ATS Optimization: See if your resume passes automated filtering systems.",
              "Gap Detection: Identify missing skills recruiters look for.",
              "Actionable Tips: Get specific rewrite suggestions for maximum impact."
            ].map((text, index) => (
              <div key={index} className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-primary/10 italic text-xs text-muted-foreground">
            "Your resume is your first impression. Make it count."
          </div>
        </div>

        <div className="p-6 border rounded-2xl space-y-4 bg-muted/20">
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Pro Tips
          </h4>
          <ul className="text-xs space-y-2.5 text-muted-foreground font-medium">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Use standard fonts like Arial or Calibri.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Keep document length to 1–2 pages.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Focus on measurable achievements.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}