import { useState } from "react";
import { analyzeResume } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UploadStep({ next }: { next: () => void }) {
  const { setAnalysis } = useResume();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handle() {
    if (!file) return;
    setLoading(true);
    const res = await analyzeResume(file);
    setAnalysis(res.analysis);
    setLoading(false);
    next();
  }

  return (
    <Card className="border-dashed border-2">
      <CardContent className="flex flex-col items-center justify-center gap-6 py-14">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">Upload your resume</p>
          <p className="text-sm text-muted-foreground">PDF only · Max recommended 2 pages</p>
        </div>

        <input
          type="file"
          accept="application/pdf"
          className="text-sm"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <Button size="lg" onClick={handle} disabled={!file || loading}>
          {loading ? "Analyzing resume..." : "Analyze Resume"}
        </Button>
      </CardContent>
    </Card>
  );
}