import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// -----------------------------
// Types
// -----------------------------

export interface JDMatchRequest {
  resume_text: string;
  jd_text: string;
}

export interface JDMatchResponse {
  match_result: {
    match_score: number;
    missing_skills: string[];
    suggestions: string[];
  };
}

export interface InterviewRequest {
  resume_text: string;
  jd_text: string;
}

export interface InterviewResponse {
  interview_questions: {
    technical_questions: string[];
    behavioral_questions: string[];
    sample_answers: { question: string; answer: string }[];
  };
}

export interface AnalyzeResumeResponse {
  analysis: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    ats_optimization: string[];
  };
  resume_text: string;
}

// -----------------------------
// API Calls
// -----------------------------

export const analyzeResume = async (file: File): Promise<AnalyzeResumeResponse> => {
  const form = new FormData();
  form.append("file", file);

  const res = await api.post("/analyze-resume", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const matchJD = async (payload: JDMatchRequest): Promise<JDMatchResponse> => {
  const res = await api.post("/match-jd", payload, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};

export const generateInterview = async (payload: InterviewRequest): Promise<InterviewResponse> => {
  const res = await api.post("/generate-interview", payload, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};
