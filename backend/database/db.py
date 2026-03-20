from typing import Dict, List

from config import settings
from database.models.bookmark_model import BookmarkModel
from database.models.news_model import NewsModel
from database.models.report_model import ReportModel
from database.models.user_model import UserModel
from database.seed import seed_news, seed_users


class InMemoryDatabase:
    def __init__(self) -> None:
        self.reset()

    def reset(self) -> None:
        self.users: Dict[str, UserModel] = {user.id: user for user in seed_users()}
        self.news: Dict[str, NewsModel] = {item.id: item for item in seed_news()}
        self.reports: Dict[str, ReportModel] = {}
        self.bookmarks: List[BookmarkModel] = []
        self.network = settings.ledger_network
        self.last_block_synced = 4811288
        self.confirmations_required = 2
        self.blockchain_entries = {
            item.story_hash: {
                "id": f"tx-{index + 1}",
                "title": item.title,
                "txHash": item.tx_hash,
                "storyHash": item.story_hash,
                "timestamp": item.published_at,
                "network": self.network,
                "status": "confirmed",
            }
            for index, item in enumerate(self.news.values())
        }


db = InMemoryDatabase()

