from pydantic import BaseModel, Field

class ResumeJDRequest(BaseModel):
    resume_text: str = Field(..., description="The parsed text of the candidate's resume")
    jd_text: str = Field(..., description="The job description text")

class AnalyzeResponse(BaseModel):
    analysis: dict = Field(..., description="The structured analysis of the resume")
    resume_text: str = Field(..., description="The parsed text of the candidate's resume")
