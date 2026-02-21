import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownRenderer } from "./markdown-renderer";

export default function AnalysisStep({ next }: { next: () => void }) {
  const { analysis } = useResume();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-primary/10 shadow-lg">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Resume Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <MarkdownRenderer content={analysis} />
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={next} size="lg" className="px-10 h-12 text-base font-semibold">
          Continue to JD Match
        </Button>
      </div>
    </div>
  );
}
