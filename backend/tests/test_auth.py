import sys
import unittest
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from database.db import db
from database.schemas.user_schema import UserCreate, UserLogin
from services.auth_service import login_user, signup_user


class AuthServiceTests(unittest.TestCase):
    def setUp(self):
        db.reset()

    def test_signup_creates_reader_account(self):
        session = signup_user(
            UserCreate(name="Test User", email="test@tez.app", password="secret12")
        )
        self.assertEqual(session["user"]["role"], "reader")

    def test_login_returns_token(self):
        session = login_user(UserLogin(email="admin@tez.app", password="demo123"))
        self.assertIn("tez-token::", session["token"])


if __name__ == "__main__":
    unittest.main()
