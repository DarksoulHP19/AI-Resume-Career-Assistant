import { createContext, useContext, useState, ReactNode } from "react";

type ResumeState = {
  resumeText: string;
  analysis: string;
  jdText: string;
  match: string;
  interview: string;
  setResumeText: (v: string) => void;
  setAnalysis: (v: string) => void;
  setJDText: (v: string) => void;
  setMatch: (v: string) => void;
  setInterview: (v: string) => void;
  reset: () => void;
};

const ResumeContext = createContext<ResumeState | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [jdText, setJDText] = useState("");
  const [match, setMatch] = useState("");
  const [interview, setInterview] = useState("");

  const reset = () => {
    setResumeText("");
    setAnalysis("");
    setJDText("");
    setMatch("");
    setInterview("");
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
