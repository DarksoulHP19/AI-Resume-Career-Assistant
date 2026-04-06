from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber

from ai_service import (
    analyze_resume,
    match_resume_with_jd,
    generate_interview_questions
)
from models import ResumeJDRequest

app = FastAPI(title="AI Resume & Career Assistant")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------
# Health Check
# ------------------------------
@app.get("/")
def root():
    return {"message": "AI Resume Assistant Backend Running 🚀"}


# ------------------------------
# Resume Upload + Analysis
# ------------------------------
@app.post("/analyze-resume")
async def analyze_resume_endpoint(file: UploadFile = File(...)):
    text = ""
    try:
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid PDF file or could not extract text")

    text = text[:4000]  # limit tokens to reduce cost
    result = await analyze_resume(text)
    return {"analysis": result, "resume_text": text}


# ------------------------------
# JD Matching
# ------------------------------
@app.post("/match-jd")
async def match_jd_endpoint(request: ResumeJDRequest):
    result = await match_resume_with_jd(
        request.resume_text[:4000],
        request.jd_text[:4000]
    )
    return {"match_result": result}


# ------------------------------
# Interview Generator
# ------------------------------
@app.post("/generate-interview")
async def generate_interview_endpoint(request: ResumeJDRequest):
    result = await generate_interview_questions(
        request.resume_text[:4000],
        request.jd_text[:4000]
    )
    return {"interview_questions": result}
