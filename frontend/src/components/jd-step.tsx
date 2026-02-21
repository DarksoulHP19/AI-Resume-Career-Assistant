import { useState } from "react";
import { matchJD } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JDStep({ next }: { next: () => void }) {
  const { resumeText, setMatch, setJDText } = useResume();
  const [jd, setJdInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handle() {
    if (!jd) return;
    setLoading(true);
    try {
      setJDText(jd);
      const res = await matchJD({ resume_text: resumeText, jd_text: jd });
      setMatch(res.match_result);
      next();
    } catch (e) {
      console.error(e);
      alert("Error matching JD. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Description Match</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Paste the job description you're applying for. We'll compare it with your analyzed resume.
        </p>
        <Textarea
          placeholder="Paste Job Description here..."
          className="min-h-[200px]"
          onChange={(e) => setJdInput(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handle} disabled={!jd || loading}>
            {loading ? "Matching..." : "Compare with Resume"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
