import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AnalyzeResumeResponse, JDMatchResponse, InterviewResponse } from "../lib/api";

type ResumeState = {
  resumeText: string;
  analysis: AnalyzeResumeResponse['analysis'] | null;
  jdText: string;
  match: JDMatchResponse['match_result'] | null;
  interview: InterviewResponse['interview_questions'] | null;
  setResumeText: (v: string) => void;
  setAnalysis: (v: AnalyzeResumeResponse['analysis'] | null) => void;
  setJDText: (v: string) => void;
  setMatch: (v: JDMatchResponse['match_result'] | null) => void;
  setInterview: (v: InterviewResponse['interview_questions'] | null) => void;
  reset: () => void;
};

const ResumeContext = createContext<ResumeState | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<AnalyzeResumeResponse['analysis'] | null>(null);
  const [jdText, setJDText] = useState("");
  const [match, setMatch] = useState<JDMatchResponse['match_result'] | null>(null);
  const [interview, setInterview] = useState<InterviewResponse['interview_questions'] | null>(null);

  const reset = () => {
    setResumeText("");
    setAnalysis(null);
    setJDText("");
    setMatch(null);
    setInterview(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeText,
        analysis,
        jdText,
        match,
        interview,
        setResumeText,
        setAnalysis,
        setJDText,
        setMatch,
        setInterview,
        reset,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
