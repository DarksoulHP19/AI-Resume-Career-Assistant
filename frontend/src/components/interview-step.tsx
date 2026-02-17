import { useState } from "react";
import { generateInterview } from "@/lib/api";
import { useResume } from "@/context/resume-context";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function InterviewStep() {
  const { setInterview } = useResume();
  const [resume, setResume] = useState("");
  const [jd, setJD] = useState("");

  async function handle() {
    const res = await generateInterview(resume, jd);
    setInterview(res.interview_questions);
  }

  return (
    <div className="space-y-4">
      <Textarea placeholder="Resume" onChange={(e) => setResume(e.target.value)} />
      <Textarea placeholder="JD" onChange={(e) => setJD(e.target.value)} />
      <Button onClick={handle}>Generate Interview</Button>
    </div>
  );
}