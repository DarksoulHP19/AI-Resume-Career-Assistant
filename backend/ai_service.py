import os
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MODEL = "gpt-4o-mini"


# ------------------------------
# Resume Analysis
# ------------------------------
async def analyze_resume(resume_text: str):
    prompt = f"""
You are an expert resume reviewer.

Analyze the resume below and provide:
1. Strengths
2. Weaknesses
3. Specific improvement suggestions
4. ATS optimization tips

Resume:
{resume_text}
"""

    response = await client.responses.create(
        model=MODEL,
        input=prompt,
        max_output_tokens=500,
        temperature=0.3
    )

    return response.output_text


# ------------------------------
# JD Matching
# ------------------------------
async def match_resume_with_jd(resume_text: str, jd_text: str):
    prompt = f"""
Compare the resume with the job description.

Provide:
1. Match score (0-100)
2. Missing skills
3. Suggestions to improve match

Resume:
{resume_text}

Job Description:
{jd_text}
"""

    response = await client.responses.create(
        model=MODEL,
        input=prompt,
        max_output_tokens=400,
        temperature=0.2
    )

    return response.output_text


# ------------------------------
# Interview Q&A Generator
# ------------------------------
async def generate_interview_questions(resume_text: str, jd_text: str):
    prompt = f"""
Based on the resume and job description,
generate:

1. 5 technical questions
2. 5 behavioral questions
3. Sample answers for 2 important questions

Resume:
{resume_text}

Job Description:
{jd_text}
"""

    response = await client.responses.create(
        model=MODEL,
        input=prompt,
        max_output_tokens=600,
        temperature=0.5
    )

    return response.output_text
