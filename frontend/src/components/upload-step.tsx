import { useState } from "react";
import { analyzeResume } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileUp, FileText, CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";

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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-3 space-y-6">
        <Card className="border-2 border-dashed transition-all hover:border-primary/50 group relative overflow-hidden bg-gradient-to-br from-card to-muted/20">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <CardHeader className="text-center pt-10">
            <div className="mx-auto bg-primary/10 p-5 rounded-full w-20 h-20 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-inner ring-4 ring-primary/5">
              <FileUp className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tight">Upload Your Resume</CardTitle>
            <CardDescription className="text-base max-w-sm mx-auto">
              Our AI will extract your skills, experience, and potential gaps.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center gap-8 pb-12 px-10">
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
                className="flex flex-col items-center justify-center gap-5 p-10 border-2 border-dashed rounded-2xl cursor-pointer bg-card/50 hover:bg-muted hover:border-primary/30 transition-all shadow-sm group/label"
              >
                {file ? (
                  <div className="flex items-center gap-3 text-primary font-bold text-lg">
                    <FileText className="w-7 h-7" />
                    <span>{file.name}</span>
                    <CheckCircle2 className="w-6 h-6 text-green-500 animate-in zoom-in-50" />
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <span className="text-sm text-muted-foreground font-medium block">No file selected</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary opacity-60 group-hover/label:opacity-100 transition-opacity">
                      Click to Browse PDF
                    </span>
                  </div>
                )}
              </label>
            </div>

            <Button 
              size="lg" 
              onClick={handle} 
              disabled={!file || loading}
              className="w-full h-16 text-xl font-black shadow-2xl bg-slate-950 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-slate-200 border-2 border-primary/20 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              {loading ? (
                <div className="flex items-center gap-4">
                  <div className="h-6 w-6 border-3 border-white/30 border-t-white animate-spin rounded-full"></div>
                  <span>Analyzing Experience...</span>
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

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 space-y-6 shadow-sm">
          <h3 className="font-bold text-lg flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Why Analyze Your Resume?
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">ATS Optimization:</span> See if your resume passes automated filtering systems.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Gap Detection:</span> Identify missing skills or experience that recruiters look for.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Actionable Tips:</span> Get specific rewrite suggestions for maximum impact.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-primary/10 italic text-xs text-muted-foreground">
            "Your resume is your first impression. Make it count with data-driven insights."
          </div>
        </div>
        
        <div className="p-6 border rounded-2xl space-y-4 bg-muted/20">
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Pro Tips</h4>
          <ul className="text-xs space-y-2.5 text-muted-foreground font-medium">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              Use standard fonts like Arial or Calibri.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              Keep your document length to 1-2 pages.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              Focus on results and numbers, not just duties.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
