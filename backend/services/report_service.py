from dataclasses import asdict
from datetime import datetime
from uuid import uuid4

from database.db import db
from database.models.report_model import ReportModel


def create_report(payload):
    report = ReportModel(
        id=str(uuid4()),
        news_id=payload.newsId,
        reason=payload.reason,
        notes=payload.notes,
        status="pending",
        created_at=datetime.utcnow().isoformat() + "Z",
    )
    db.reports[report.id] = report
    return asdict(report)


def list_reports():
    return [asdict(report) for report in db.reports.values()]

