import { useState } from "react";
import { matchJD } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface JDStepProps {
  next: () => void;
}

export default function JDStep({ next }: JDStepProps) {
  const { resumeText, setMatch, setJDText } = useResume();

  const [jd, setJdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMatch() {
    const trimmedJD = jd.trim();

    if (!trimmedJD) return;
    if (!resumeText) {
      setError("Resume data missing. Please re-upload your resume.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      setJDText(trimmedJD);

      const res = await matchJD({
        resume_text: resumeText,
        jd_text: trimmedJD,
      });

      if (!res?.match_result) {
        throw new Error("Invalid server response");
      }

      setMatch(res.match_result);
      next();
    } catch (err) {
      console.error("JD Match Error:", err);
      setError("Error matching JD. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle>Job Description Match</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Paste the job description you're applying for. We'll compare it with your analyzed resume.
        </p>

        <Textarea
          placeholder="Paste Job Description here..."
          className="min-h-50"
          value={jd}
          onChange={(e) => setJdInput(e.target.value)}
        />

        {error && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleMatch}
            disabled={!jd.trim() || loading}
            className="min-w-45"
          >
            {loading ? "Matching..." : "Compare with Resume"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}