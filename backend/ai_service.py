import os
import json
import logging
from dotenv import load_dotenv
from openai import AsyncOpenAI
from fastapi import HTTPException

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MODEL = "gpt-4o-mini"
logger = logging.getLogger(__name__)

# ------------------------------
# Resume Analysis
# ------------------------------
async def analyze_resume(resume_text: str):
    prompt = f"""
You are an expert resume reviewer. Read the resume and return a STRICT JSON object in the following format:
{{
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "suggestions": ["...", "..."],
  "ats_optimization": ["...", "..."]
}}

Resume:
{resume_text}
"""
    try:
        response = await client.chat.completions.create(
            model=MODEL,
            response_format={ "type": "json_object" },
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
            temperature=0.3
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        logger.error(f"Error in analyze_resume: {e}")
        raise HTTPException(status_code=500, detail="Failed to analyze resume. Please try again.")

# ------------------------------
# JD Matching
# ------------------------------
async def match_resume_with_jd(resume_text: str, jd_text: str):
    prompt = f"""
Compare the resume with the job description and return a STRICT JSON object in the following format:
{{
  "match_score": 85,
  "missing_skills": ["...", "..."],
  "suggestions": ["...", "..."]
}}

Resume:
{resume_text}

Job Description:
{jd_text}
"""
    try:
        response = await client.chat.completions.create(
            model=MODEL,
            response_format={ "type": "json_object" },
            messages=[{"role": "user", "content": prompt}],
            max_tokens=800,
            temperature=0.2
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        logger.error(f"Error in match_resume_with_jd: {e}")
        raise HTTPException(status_code=500, detail="Failed to match job description. Please try again.")

# ------------------------------
# Interview Q&A Generator
# ------------------------------
async def generate_interview_questions(resume_text: str, jd_text: str):
    prompt = f"""
Based on the resume and job description, return a STRICT JSON object in the following format:
{{
  "technical_questions": ["...", "..."],
  "behavioral_questions": ["...", "..."],
  "sample_answers": [
    {{ "question": "...", "answer": "..." }},
    {{ "question": "...", "answer": "..." }}
  ]
}}
Make sure to provide exactly 5 technical questions, 5 behavioral questions, and 2 sample answers.

Resume:
{resume_text}

Job Description:
{jd_text}
"""
    try:
        response = await client.chat.completions.create(
            model=MODEL,
            response_format={ "type": "json_object" },
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
            temperature=0.5
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        logger.error(f"Error in generate_interview_questions: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate interview questions. Please try again.")
