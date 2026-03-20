from services.report_service import create_report, list_reports
from utils.response_helper import success_response


def submit_report(payload):
    return success_response(create_report(payload), "Report submitted successfully.")


def get_reports():
    return success_response(list_reports(), "Reports fetched successfully.")

