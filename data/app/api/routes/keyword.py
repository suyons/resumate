from fastapi import APIRouter, HTTPException
from app.service.keyword import thread_scrape_keyword
import urllib.parse

router = APIRouter()

@router.get("/")
def null_company_error():
    raise HTTPException(status_code=400, detail="회사명을 입력해 주세요.")

@router.get("/{company}")
def get_keyword(company: str):
    company = urllib.parse.unquote(company)
    return thread_scrape_keyword(company)
