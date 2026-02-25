import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MarkdownRenderer } from "./markdown-renderer";
import { Lightbulb, CheckCircle2, AlertCircle, Info, ChevronRight } from "lucide-react";

export default function AnalysisStep({ next }: { next: () => void }) {
  const { analysis } = useResume();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-4 space-y-6">
        <Card className="border-primary/10 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/10 via-primary to-primary/10"></div>
          <CardHeader className="border-b bg-muted/20 pb-8 pt-10 px-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-3xl font-black tracking-tight flex items-center gap-3">
                  <Lightbulb className="w-8 h-8 text-yellow-500 animate-pulse" />
                  AI Deep Analysis
                </CardTitle>
                <CardDescription className="text-base font-medium"> Comprehensive review of your professional profile.</CardDescription>
              </div>
              <div className="bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20 shadow-sm flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Analysis Complete
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 leading-relaxed">
            <MarkdownRenderer content={analysis} />
          </CardContent>
          <div className="p-8 border-t bg-muted/10 flex justify-end">
            <Button onClick={next} size="lg" className="px-12 h-14 text-lg font-black shadow-xl hover:-translate-y-1 transition-all active:translate-y-0 group">
              Continue to JD Match
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-card border rounded-3xl p-8 space-y-8 shadow-sm ring-1 ring-primary/5">
          <div className="space-y-4">
            <h3 className="font-black text-sm uppercase tracking-widest text-primary flex items-center gap-2">
              <Info className="w-4 h-4" />
              How to Read This
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              The analysis focuses on <span className="text-foreground font-bold">Actionability</span>. Look for specific phrases you can change and keywords to add.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-black text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Focus on Strengths
              </div>
              <p className="text-xs text-muted-foreground font-medium italic">
                These are your competitive advantages. Make sure they are high up on your resume.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                Address Weaknesses
              </div>
              <p className="text-xs text-muted-foreground font-medium italic">
                Gaps or vague descriptions can be red flags. Use the suggested improvements to fix them.
              </p>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-sm mb-2">Pro-Tip:</h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Recruiters spend <span className="text-primary font-black underline decoration-2">6-7 seconds</span> on an initial scan. Ensure your most important findings are in the top half.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
