import { useState } from "react";
import { matchJD } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function JDStep({ next }: { next: () => void }) {
  const { setMatch } = useResume();
  const [resume, setResume] = useState("");
  const [jd, setJD] = useState("");

  async function handle() {
    const res = await matchJD(resume, jd);
    setMatch(res.match_result);
    next();
  }

  return (
    <div className="space-y-4">
      <Textarea placeholder="Paste Resume" onChange={(e) => setResume(e.target.value)} />
      <Textarea placeholder="Paste JD" onChange={(e) => setJD(e.target.value)} />
      <Button onClick={handle}>Match</Button>
    </div>
  );
}