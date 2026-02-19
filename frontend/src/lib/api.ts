import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

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
  match_result: string;
}

export interface InterviewRequest {
  resume_text: string;
  jd_text: string;
}

export interface InterviewResponse {
  interview_questions: string;
}

export interface AnalyzeResumeResponse {
  analysis: string;
}

// -----------------------------
// API Calls (multipart/form-data)
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
  const form = new FormData();
  form.append("resume_text", payload.resume_text);
  form.append("jd_text", payload.jd_text);

  const res = await api.post("/match-jd", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const generateInterview = async (payload: InterviewRequest): Promise<InterviewResponse> => {
  const form = new FormData();
  form.append("resume_text", payload.resume_text);
  form.append("jd_text", payload.jd_text);

  const res = await api.post("/generate-interview", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
