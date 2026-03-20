from fastapi import APIRouter

from controllers.report_controller import get_reports, submit_report
from database.schemas.report_schema import ReportCreate

router = APIRouter()


@router.get("")
def list_reports_route():
    return get_reports()


@router.post("")
def submit_report_route(payload: ReportCreate):
    return submit_report(payload)

